import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as LearningActions from '../../../stores/actions/LearningActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import { Loader } from '../../common/Loader';

const LearningCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [standardsList, setStandardsList] = useState(null);
  const [academicPeriodList, setAcademicPeriodList] = useState(null);
  const [generalBasicLearningRightList, setGeneralBasicLearningRightList] = useState(null); 
  const [generalBasicLearningRight, setGeneralBasicLearningRight] = useState(null);
  const [standard, setStandard] = useState(null);
  const [academicPeriod, setAcademicPeriod] = useState(null);
  const [schoolsList, setSchoolsList] = useState(null);
  const [school, setSchool] = useState(null);

  let [params] = useSearchParams();
  const  asignatureId  = params.get('asignatureId');
  const  asignatureGeneralId  = params.get('asignatureGeneralId');
  const  gradeId  = params.get('gradeId');
  const  gradeGeneralId  = params.get('gradeGeneralId');

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, reset, setValue, getValues } = methods;

  useEffect(() => {
    cleanForm();
    getDropdowns();
    getDBAS();
    if (props?.data?.id) {     
      if (props?.data?.generalBasicLearningRight !== undefined && props?.data?.generalBasicLearningRight != null) {
        setGeneralBasicLearningRight({
          key: props?.data?.generalBasicLearningRight?.id,
          label: props?.data?.generalBasicLearningRight?.dba,
          value: props?.data?.generalBasicLearningRight?.id,
        });
      }
      if (props?.data?.academicStandard !== undefined && props?.data?.academicStandard != null) {
        setStandard({
          key: props?.data?.academicStandard?.id,
          label: props?.data?.academicStandard?.standard,
          value: props?.data?.academicStandard?.id,
        });
      }
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
        });
      }
      if (props?.data?.academicPeriods !== undefined && props?.data?.academicPeriods != null) {
        setAcademicPeriod(props?.data?.academicPeriods.map((c: any) => {
          return { label: c.name, value: c.id, key: c.id };
        }));
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setStandard(null);
    setSchool(null);
    setAcademicPeriod(null);
    setGeneralBasicLearningRight(null);
    if (props?.loginReducer?.schoolId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('schoolId', {
        required: true,
        value: props?.loginReducer?.schoolId,
      });
    }
    if (asignatureId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('academicAsignatureId', {
        required: true,
        value: asignatureId,
      });
    }
    if (gradeId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('academicGradeId', {
        required: true,
        value: gradeId,
      });
    }
  };

  const getDropdowns = async () => {
    props.getDropdownsLearning(props?.loginReducer?.schoolId, asignatureId, gradeId).then((data: any) => {
      setStandardsList(
        data.dataStandards.edges.map((c: any) => {
          return { label: c.node.standard, value: c.node.id, key: c.node.id };
        }),
      );
      setSchoolsList(
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setAcademicPeriodList(
        data.dataAcademicPeriods.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const getDBAS = async () => {
    props.getGeneralBasicLearningRightList(asignatureGeneralId, gradeGeneralId).then((data: any) => {
      setGeneralBasicLearningRightList(
        data.data.edges.map((c: any) => {
          return { label: c.node.dba, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: statementRef, ...statementRest } = register('statement', {
    required: true,
    value: props?.data?.id ? props?.data?.statement : '',
  });
  register('academicAsignatureId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicAsignatureId : '',
  });
  register('academicGradeId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicGradeId : '',
  });
  register('academicStandardId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicStandardId : '',
  });
  register('generalBasicLearningRightId', {
    required: true,
    value: props?.data?.id ? props?.data?.generalBasicLearningRightId : '',
  });
  register('schoolId', {
    required: true,
    value: props?.data?.id ? props?.data?.schoolId : '',
  });
  register('academicPeriodsId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicPeriodsId  : '',
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
                  <IntlMessages id="menu.statement" />
                </Label>
                <Input type='textarea' rows="2" {...statementRest} innerRef={statementRef} className="form-control" />
              </div>             
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.dba" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('generalBasicLearningRightId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={generalBasicLearningRightList}
                  value={generalBasicLearningRight}
                  onChange={(selectedOption) => {
                    setValue('generalBasicLearningRightId', selectedOption?.key);
                    setGeneralBasicLearningRight(selectedOption);
                  }}
                />
              </div>  
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.standard" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('academicStandardId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={standardsList}
                  value={standard}
                  onChange={(selectedOption) => {
                    setValue('academicStandardId', selectedOption?.key);
                    setStandard(selectedOption);
                  }}
                />
              </div>  
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.periodAcademic" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  isMulti
                  {...register("academicPeriodsId", { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={academicPeriodList}
                  value={academicPeriod}
                  onChange={(selectedOption: any) => {
                    setValue(
                      "academicPeriodsId",
                      selectedOption.map((c: any) => {
                        return c.key;
                      }),
                    );
                    setAcademicPeriod(selectedOption);
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

const mapDispatchToProps = { ...LearningActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningCreateEdit);
