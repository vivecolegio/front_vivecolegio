import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
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
  const [gradesList, setGradesList] = useState(null);
  const [asignaturesList, setAsignaturesList] = useState(null);
  const [standardsList, setStandardsList] = useState(null);
  const [generalBasicLearningRightList, setGeneralBasicLearningRightList] = useState(null);
  const [grade, setGrade] = useState(null);
  const [asignature, setAsignature] = useState(null);
  const [generalBasicLearningRight, setGeneralBasicLearningRight] = useState(null);
  const [standard, setStandard] = useState(null);

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
      if (props?.data?.academicGrade !== undefined && props?.data?.academicGrade != null) {
        setGrade({
          key: props?.data?.academicGrade?.id,
          label: props?.data?.academicGrade?.name,
          value: props?.data?.academicGrade?.id,
        });
      }
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
          label: props?.data?.academicStandard?.name,
          value: props?.data?.academicStandard?.id,
        });
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setAsignature(null);
    setGrade(null);
    setStandard(null);
    setGeneralBasicLearningRight(null);
  };

  const getDropdowns = async () => {
    props.getDropdownsLearning(props?.loginReducer?.schoolId).then((data: any) => {
      setAsignaturesList(
        data.dataAsignatures.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id, idGeneral: c.node.generalAcademicAsignatureId };
        }),
      );
      setGradesList(
        data.dataGrades.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id, idGeneral: c.node.generalAcademicGradeId };
        }),
      );
      setStandardsList(
        data.dataStandards.edges.map((c: any) => {
          return { label: c.node.standard, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const getDBAS = async (generalAcademicAsignatureId: any,generalAcademicGradeId: any) => {
    props.getGeneralBasicLearningRightList(generalAcademicAsignatureId, generalAcademicGradeId).then((data: any) => {
      console.log(data)
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
                <Input {...statementRest} innerRef={statementRef} className="form-control" />
              </div>             
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.asignature" />
                </Label>
                <Select
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
                 isDisabled={!asignature}
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('academicGradeId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={gradesList}
                  value={grade}
                  onChange={(selectedOption) => {
                    setValue('academicGradeId', selectedOption?.key);
                    setGrade(selectedOption);
                    getDBAS(asignature?.idGeneral, selectedOption?.idGeneral);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.dba" />
                </Label>
                <Select
                  isDisabled={!grade || !asignature}
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
                  <IntlMessages id="menu.standard" />
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
