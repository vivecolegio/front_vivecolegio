import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as GeneralBasicLearningRightActions from '../../../stores/actions/BasicLearningDutiesActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import { Loader } from '../../common/Loader';

const GeneralBasicLearningRightCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [gradesList, setGradesList] = useState(null);
  const [asignaturesList, setAsignaturesList] = useState(null);
  const [schoolsList, setSchoolsList] = useState(null);
  const [school, setSchool] = useState(null);
  const [grade, setGrade] = useState(null);
  const [asignature, setAsignature] = useState(null);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, reset, setValue, getValues } = methods;

  useEffect(() => {
    cleanForm();
    getDropdowns();
    if (props?.data?.id) {     
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
        });
      }
      if (
        props?.data?.generalAcademicAsignature !== undefined &&
        props?.data?.generalAcademicAsignature != null
      ) {
        setAsignature({
          key: props?.data?.generalAcademicAsignature?.id,
          label: props?.data?.generalAcademicAsignature?.name,
          value: props?.data?.generalAcademicAsignature?.id,
        });
      }
      if (props?.data?.generalAcademicGrade !== undefined && props?.data?.generalAcademicGrade != null) {
        setGrade({
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
    setSchool(null);
    setAsignature(null);
    setGrade(null);
    // if (props?.loginReducer?.schoolId && !props?.data?.id) {
    //   // set value when register is new and sesion contains value
    //   register('schoolId', {
    //     required: true,
    //     value: props?.loginReducer?.schoolId,
    //   });
    // }
  };

  const getDropdowns = async () => {
    props.getDropdownsGeneralBasicLearningRight(props?.loginReducer?.schoolId).then((data: any) => {
      setSchoolsList(
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setAsignaturesList(
        data.dataAsignatures.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setGradesList(
        data.dataGrades.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: dbaRef, ...dbaRest } = register('dba', {
    required: true,
    value: props?.data?.id ? props?.data?.dba : '',
  });
  const { ref: categoryRef, ...categoryRest } = register('category', {
    required: true,
    value: props?.data?.id ? props?.data?.category : '',
  });
  register('generalAcademicAsignatureId', {
    required: true,
    value: props?.data?.id ? props?.data?.generalAcademicAsignatureId : '',
  });
  register('generalAcademicGradeId', {
    required: true,
    value: props?.data?.id ? props?.data?.generalAcademicGradeId : '',
  });
  // register('schoolId', {
  //   required: true,
  //   value: props?.data?.id ? props?.data?.schoolId : '',
  // });

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
                  <IntlMessages id="menu.dba" />
                </Label>
                <Input {...dbaRest} innerRef={dbaRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.category" />
                </Label>
                <Input {...categoryRest} innerRef={categoryRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.asignature" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('generalAcademicAsignatureId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={asignaturesList}
                  value={asignature}
                  onChange={(selectedOption) => {
                    setValue('generalAcademicAsignatureId', selectedOption?.key);
                    setAsignature(selectedOption);
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
                  options={gradesList}
                  value={grade}
                  onChange={(selectedOption) => {
                    setValue('generalAcademicGradeId', selectedOption?.key);
                    setGrade(selectedOption);
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

const mapDispatchToProps = { ...GeneralBasicLearningRightActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralBasicLearningRightCreateEdit);
