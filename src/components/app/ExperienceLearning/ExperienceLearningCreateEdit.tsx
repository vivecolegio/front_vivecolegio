import { DevTool } from '@hookform/devtools';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as experienceLearningActions from '../../../stores/actions/ExperienceLearningActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import { Loader } from '../../common/Loader';

const ExperienceLearningCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [learningList, setLearningList] = useState(null);
  const [learnings, setLearnings] = useState(null);
  const [evidenceLearningList, setEvidenceLearningList] = useState(null);
  const [evidenceLearnings, setEvidenceLearnings] = useState(null);
  const [campusList, setCampusList] = useState(null);
  const [campus, setCampus] = useState(null);
  const [date, setDate] = useState(null);
  const [experienceType, setExperienceType] = useState(null);
  const [experienceTypes, setExperienceTypes] = useState([
    { label: 'Coevaluación', key: 'COEVALUATION' },
    { label: 'Autoevaluación', key: 'SELFAPPRAISAL' },
    { label: 'Valoración tradicional', key: 'TRADITIONALVALUATION' },
    { label: 'Rúbrica de valoración', key: 'VALUATIONRUBRIC' },
    { label: 'Prueba en Línea', key: 'ONLINETEST' },
  ]);

  let [params] = useSearchParams();
  const  academicAsignatureCourseId = params.get('academicAsignatureCourseId');
  const  asignatureId  = params.get('asignatureId');
  const  gradeId  = params.get('gradeId');

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, reset, setValue, getValues } = methods;

  useEffect(() => {
    cleanForm();
    getDropdowns();
    if (props?.data?.id) {
      if (props?.data?.campus !== undefined && props?.data?.campus != null) {
        setCampus({
          key: props?.data?.campus?.id,
          label: props?.data?.campus?.name,
          value: props?.data?.campus?.id,
        });
      }
      if (props?.data?.learnigs !== undefined && props?.data?.learnigs != null) {
        setLearnings(
          props?.data?.learnigs.map((c: any) => {
            return { label: c.statement, value: c.id, key: c.id };
          }),
        );
      }
      if (props?.data?.experienceType !== undefined && props?.data?.experienceType != null) {
        setExperienceType(experienceTypes.find((c:any)=>{return (c.key === props?.data?.experienceType)}));
      }
      if (props?.data?.fecha !== undefined && props?.data?.fecha != null) {
         setDate(new Date(props?.data?.fecha));
      }
      if (props?.data?.fecha !== undefined && props?.data?.fecha != null) {
         setDate(new Date(props?.data?.fecha));
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setCampus(null);
    setLearnings(null);
    if (props?.loginReducer?.campusId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('campusId', {
        required: true,
        value: props?.loginReducer?.campusId,
      });
    }
    if (academicAsignatureCourseId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('academicAsignatureCourseId', {
        required: true,
        value: academicAsignatureCourseId,
      });
    }
  };

  const getDropdowns = async () => {
    props.getDropdownsExperienceLearning(props?.loginReducer?.schoolId,asignatureId, gradeId).then((data: any) => {
      setCampusList(
        data.dataCampus.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setLearningList(
        data.dataLearnings.edges.map((c: any) => {
          return { label: c.node.statement, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: titleRef, ...titleRest } = register('title', {
    required: true,
    value: props?.data?.id ? props?.data?.title : '',
  });
  const { ref: descriptionRef, ...descriptionRest } = register('description', {
    required: true,
    value: props?.data?.id ? props?.data?.description : '',
  });
  register('academicAsignatureCourseId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicAsignatureCourseId : '',
  });
  register('fecha', {
    required: true,
    value: props?.data?.id ? props?.data?.fecha : '',
  });
  register('experienceType', {
    required: true,
    value: props?.data?.id ? props?.data?.experienceType : '',
  });
  register('evidenciceLearningsId', {
    required: true,
    value: props?.data?.id ? props?.data?.evidenciceLearningsId : '',
  });
  register('learningsId', {
    required: true,
    value: props?.data?.id ? props?.data?.learningsId : '',
  });
  register('campusId', {
    required: true,
    value: props?.data?.id ? props?.data?.campusId : '',
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
      <DevTool control={methods.control} placement="top-left" />
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
                  <IntlMessages id="forms.title" />
                </Label>
                <Input {...titleRest} innerRef={titleRef} className="form-control" />
              </div>                      
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.date" />
                </Label>
                <ReactDatePicker
                  {...register('fecha', { required: true })}
                  selected={date}
                  onChange={(d: any) => {
                    setValue('fecha', d as Date);
                    setDate(d as Date);
                  }}
                />
              </div>  
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.experienceType" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('experienceType', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={experienceTypes}
                  value={experienceType}
                  onChange={(selectedOption) => {
                    setValue('experienceType', selectedOption?.key);
                    setExperienceType(selectedOption);
                  }}
                />
              </div>     
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.learnings" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  isMulti
                  {...register('learningsId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={learningList}
                  value={learnings}
                  onChange={(selectedOption: any) => {
                    setValue(
                      'learningsId',
                      selectedOption.map((c: any) => {
                        return c.key;
                      }),
                    );
                    setLearnings(selectedOption);
                  }}
                />
              </div>    
               <div className="form-group">
                <Label>
                  <IntlMessages id="forms.description" />
                </Label>
                <Input type="textarea" rows="6" {...descriptionRest} innerRef={descriptionRef} className="form-control" />
              </div>
              {!props?.loginReducer?.campusId ? (
                <div className="form-group">
                  <Label>
                    <IntlMessages id="menu.campus" />
                  </Label>
                  <Select
                    placeholder={<IntlMessages id="forms.select" />}
                    {...register('campusId', { required: true })}
                    className="react-select"
                    classNamePrefix="react-select"
                    options={campusList}
                    value={campus}
                    onChange={(selectedOption) => {
                      setValue('campusId', selectedOption?.key);
                      setCampus(selectedOption);
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

const mapDispatchToProps = { ...experienceLearningActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceLearningCreateEdit);
