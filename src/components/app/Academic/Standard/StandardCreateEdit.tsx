import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import * as standardActions from '../../../../stores/actions/Academic/StandardActions';
import * as standardGeneralActions from '../../../../stores/actions/GeneralAcademic/StandardActions';
import { Colxx } from '../../../common/CustomBootstrap';
import AddNewModal from '../../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../../common/Data/CreateEditAuditInformation';
import { Loader } from '../../../common/Loader';

const StandardCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [asignaturesList, setAsignaturesList] = useState(null);
  const [gradesList, setGradesList] = useState(null);
  const [standardList, setStandardsList] = useState(null);
  const [schoolList, setSchoolList] = useState(null);
  const [cycle, setCycle] = useState(null);
  const [asignature, setAsignature] = useState(null);
  const [standard, setStandard] = useState(null);
  const [school, setSchool] = useState(null);

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
        props?.data?.academicAsignature !== undefined &&
        props?.data?.academicAsignature != null
      ) {
        setAsignature({
          key: props?.data?.academicAsignature?.id,
          label: props?.data?.academicAsignature?.name,
          value: props?.data?.academicAsignature?.id,
        });
      }
      if (
        props?.data?.academicGrade !== undefined &&
        props?.data?.academicGrade != null
      ) {
        setCycle({
          key: props?.data?.academicGrade?.id,
          label: props?.data?.academicGrade?.name,
          value: props?.data?.academicGrade?.id,
        });
      }
      if (
        props?.data?.generalAcademicStandard !== undefined &&
        props?.data?.generalAcademicStandard != null
      ) {
        setStandard({
          key: props?.data?.generalAcademicStandard?.id,
          label: props?.data?.generalAcademicStandard?.standard,
          value: props?.data?.generalAcademicStandard?.id,
        });
      }
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
        });
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setCycle(null);
    setStandard(null);
    setAsignature(null);
    setSchool(null);
    if (props?.loginReducer?.schoolId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('schoolId', {
        required: true,
        value: props?.loginReducer?.schoolId,
      });
    }
  };

  const getDropdowns = async () => {
    props.getDropdownsAcademicStandard(props?.loginReducer?.schoolId).then((data: any) => {
      setSchoolList(
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setAsignaturesList(
        data.dataAsignatures.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id, idGeneralAcademicAsignature: c.node.generalAcademicAsignatureId };
        }),
      );
      setGradesList(
        data.dataGrades.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id, idGeneralAcademicCycle: c.node.generalAcademicCycleId };
        }),
      );
    });
  };

  const getStandards = async (generalAcademicCycleId: any, generalAcademicAsignatureId: any) => {
    props.getListAllGeneralStandard(generalAcademicCycleId, generalAcademicAsignatureId).then((data: any) => {
      //console.log(data);
      setStandardsList(
        data.map((c: any) => {
          return { label: c.node.standard, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: standardRef, ...standardRest } = register('standard', {
    required: true,
    value: props?.data?.id ? props?.data?.standard : '',
  });
  register('schoolId', {
    required: true,
    value: props?.data?.id ? props?.data?.schoolId : '',
  });
  register('academicGradeId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicGradeId : '',
  });
  register('academicAsignatureId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicAsignatureId : '',
  });
  register('generalAcademicStandardId', {
    required: true,
    value: props?.data?.id ? props?.data?.generalAcademicStandardId : '',
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
            <Loader />
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
                  <IntlMessages id="forms.standard" />
                </Label>
                <Input type='textarea' rows="6" {...standardRest} innerRef={standardRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.asignature" />
                </Label>
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('academicAsignatureId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={asignaturesList}
                  value={asignature}
                  onChange={(selectedOption) => {
                    setValue('academicAsignatureId', selectedOption?.key);
                    setAsignature(selectedOption);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.grade" />
                </Label>
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('academicGradeId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={gradesList}
                  value={cycle}
                  onChange={(selectedOption) => {
                    setValue('academicGradeId', selectedOption?.key);
                    setCycle(selectedOption);
                    getStandards(selectedOption?.idGeneralAcademicCycle, asignature?.idGeneralAcademicAsignature);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.standard" /> {' - '}
                  <IntlMessages id="menu.general" />
                </Label>
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('generalAcademicStandardId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={standardList}
                  value={standard}
                  onChange={(selectedOption) => {
                    setValue('generalAcademicStandardId', selectedOption?.key);
                    setStandard(selectedOption);
                  }}
                />
              </div>
              {!props?.loginReducer?.schoolId ? (
                <div className="form-group">
                  <Label>
                    <IntlMessages id="menu.school" />
                  </Label>
                  <Select
                    isClearable
                    placeholder={<IntlMessages id="forms.select" />}
                    {...register('schoolId', { required: true })}
                    className="react-select"
                    classNamePrefix="react-select"
                    options={schoolList}
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

const mapDispatchToProps = { ...standardActions, ...standardGeneralActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(StandardCreateEdit);
