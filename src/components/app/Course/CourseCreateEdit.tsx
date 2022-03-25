import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {Loader} from '../../common/Loader';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as AcademicIndicatorActions from '../../../stores/actions/CourseActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const CourseCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [campusList, setCampusList] = useState(null);
  const [grade, setGrade] = useState(null);
  const [campus, setCampus] = useState(null);

  let params = useParams();

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
      if (props?.data?.academicGrade !== undefined && props?.data?.academicGrade != null) {
        setGrade({
          key: props?.data?.academicGrade?.id,
          label: props?.data?.academicGrade?.name,
          value: props?.data?.academicGrade?.id,
        });
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setGrade(null);
    if (props?.loginReducer?.schoolId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('campusId', {
        required: true,
        value: props?.loginReducer?.campusId,
      });
    }
    const { academicGradeId } = params;
    if(academicGradeId){
      register('academicGradeId', {
        required: true,
        value: academicGradeId,
      });
    }
  };

  const getDropdowns = async () => {
    props.getDropdownsCourse(props?.loginReducer?.schoolId).then((data: any) => {
      setCampusList(
        data.dataCampus.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );       
    });
  };

  const { ref: nameRef, ...nameRest } = register('name', {
    required: true,
    value: props?.data?.id ? props?.data?.name : '',
  });
  const { ref: orderRef, ...orderRest } = register('order', {
    required: true,
    value: props?.data?.id ? props?.data?.order : '',
  });
  register('academicGradeId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicGradeId : '',
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
                  <IntlMessages id="forms.sorting" />
                </Label>
                <Input {...orderRest} innerRef={orderRef} className="form-control" />
              </div>                                 
              {!props?.loginReducer?.campusId ? (
                <div className="form-group">
                  <Label>
                    <IntlMessages id="menu.school" />
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

const mapDispatchToProps = { ...AcademicIndicatorActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCreateEdit);
