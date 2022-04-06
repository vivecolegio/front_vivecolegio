import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import * as gradeActions from '../../../../stores/actions/Academic/GradeActions';
import { Colxx } from '../../../common/CustomBootstrap';
import AddNewModal from '../../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../../common/Data/CreateEditAuditInformation';
import { Loader } from '../../../common/Loader';

const GradeCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [cyclesList, setCyclesList] = useState(null);
  const [educationLevelsList, setEducationLevelsList] = useState(null);
  const [specialitiesList, setSpecialitiesList] = useState(null);
  const [generalAcademicGradesList, setGeneralAcademicGradesList] = useState(null);
  const [schoolsList, setSchoolsList] = useState(null);
  const [cycle, setCycle] = useState(null);
  const [school, setSchool] = useState(null);
  const [educationLevel, setEducationLevel] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const [generalAcademicGrade, setGeneralAcademicGrade] = useState(null);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, reset, setValue, getValues } = methods;

  useEffect(() => {
    cleanForm();
    getDropdowns();
    if (props?.data?.id) {
      if (
        props?.data?.generalAcademicCycle !== undefined &&
        props?.data?.generalAcademicCycle != null
      ) {
        setCycle({
          key: props?.data?.generalAcademicCycle?.id,
          label: props?.data?.generalAcademicCycle?.name,
          value: props?.data?.generalAcademicCycle?.id,
        });
      }
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
        });
      }
      if (props?.data?.educationLevel !== undefined && props?.data?.educationLevel != null) {
        setEducationLevel({
          key: props?.data?.educationLevel?.id,
          label: props?.data?.educationLevel?.name,
          value: props?.data?.educationLevel?.id,
        });
      }
      if (props?.data?.specialty !== undefined && props?.data?.specialty != null) {
        setSpeciality({
          key: props?.data?.specialty?.id,
          label: props?.data?.specialty?.name,
          value: props?.data?.specialty?.id,
        });
      }
      if (props?.data?.generalAcademicGrade !== undefined && props?.data?.generalAcademicGrade != null) {
        setGeneralAcademicGrade({
          key: props?.data?.generalAcademicGrade?.id,
          label: props?.data?.generalAcademicGrade?.name,
          value: props?.data?.generalAcademicGrade?.id,
        });
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setCycle(null);
    setSchool(null);
    setSpeciality(null);
    setGeneralAcademicGrade(null);
    setEducationLevel(null);
    if (props?.loginReducer?.schoolId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('schoolId', {
        required: true,
        value: props?.loginReducer?.schoolId,
      });
    }
  };

  const getDropdowns = async () => {
    props.getDropdownsAcademicGrade(props?.loginReducer?.schoolId).then((data: any) => {
      setCyclesList(
        data.dataCycles.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setSchoolsList(
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setSpecialitiesList(
        data.dataSpecialities.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setEducationLevelsList(
        data.dataEducationLevels.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setGeneralAcademicGradesList(
        data.dataGeneralGrades.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: nameRef, ...nameRest } = register('name', {
    required: true,
    value: props?.data?.id ? props?.data?.name : '',
  });
  register('generalAcademicCycleId', {
    required: true,
    value: props?.data?.id ? props?.data?.generalAcademicCycleId : '',
  });
  register('schoolId', {
    required: true,
    value: props?.data?.id ? props?.data?.schoolId : '',
  });
  register('specialtyId', {
    required: true,
    value: props?.data?.id ? props?.data?.specialtyId : '',
  });
  register('educationLevelId', {
    required: true,
    value: props?.data?.id ? props?.data?.educationLevelId : '',
  });
  register('generalAcademicGradeId', {
    required: true,
    value: props?.data?.id ? props?.data?.generalAcademicGradeId : '',
  });

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  return (
    <>
      {loading ? (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader/>
          </Colxx>
        </>
      ) : (
        <>
          <AddNewModal
            modalOpen={props.modalOpen}
            toggleModal={() => {
              cleanForm();
              props.toggleModal();
            }}
            onSubmit={props.onSubmit}
            data={props.data}
            methods={methods}
            control={control}
            handleSubmit={handleSubmit}
          >
            <ModalBody>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.name" />
                </Label>
                <Input {...nameRest} innerRef={nameRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.cycleAcademic" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('generalAcademicCycleId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={cyclesList}
                  value={cycle}
                  onChange={(selectedOption) => {
                    setValue('generalAcademicCycleId', selectedOption?.key);
                    setCycle(selectedOption);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.educationLevel" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('educationLevelId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={educationLevelsList}
                  value={educationLevel}
                  onChange={(selectedOption) => {
                    setValue('educationLevelId', selectedOption?.key);
                    setEducationLevel(selectedOption);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.speciality" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('specialtyId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={specialitiesList}
                  value={speciality}
                  onChange={(selectedOption) => {
                    setValue('specialtyId', selectedOption?.key);
                    setSpeciality(selectedOption);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.grade" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('generalAcademicGradeId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={generalAcademicGradesList}
                  value={generalAcademicGrade}
                  onChange={(selectedOption) => {
                    setValue('generalAcademicGradeId', selectedOption?.key);
                    setGeneralAcademicGrade(selectedOption);
                  }}
                />
              </div>
              {!props?.loginReducer?.schoolId ? (
                <div className="form-group">
                  <Label>
                    <IntlMessages id="menu.school" />
                  </Label>
                  <Select
                    placeholder={<IntlMessages id="forms.select" />}
                    {...register('schoolId', { required: true })}
                    className="react-select"
                    classNamePrefix="react-select"
                    options={schoolsList}
                    value={school}
                    onChange={(selectedOption) => {
                      setValue('schoolId', selectedOption?.key);
                      setSchool(selectedOption);
                    }}
                  />
                </div>
              ) : (
                ''
              )}
            </ModalBody>
            {props?.data?.id ? (
              <ModalFooter className="p-3">
                <CreateEditAuditInformation loading={loading} auditInfo={auditInfo} />
              </ModalFooter>
            ) : (
              <></>
            )}
          </AddNewModal>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = { ...gradeActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeCreateEdit);
