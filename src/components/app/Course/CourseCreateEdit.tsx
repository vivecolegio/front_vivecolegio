import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader } from '../../common/Loader';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as academicIndicatorActions from '../../../stores/actions/CourseActions';
import * as teacherActions from '../../../stores/actions/TeacherActions';
import * as academicDayActions from '../../../stores/actions/AcademicDayActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import { useSearchParams } from 'react-router-dom';

const CourseCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [campusList, setCampusList] = useState(null);
  const [grade, setGrade] = useState(null);
  const [campus, setCampus] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [academicDay, setAcademicDay] = useState(null);
  const [academicDays, setAcademicDays] = useState(null);

  let [params] = useSearchParams();
  const academicGradeId = params.get('academicGradeId');

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
      if (props?.data?.teacher !== undefined && props?.data?.teacher != null) {
        setTeacher({
          key: props?.data?.teacher?.id,
          label: `${props?.data?.teacher?.user.name} ${props?.data?.teacher?.user.lastName}`,
          value: props?.data?.teacher?.id,
        });
      }
      if (props?.data?.academicDay !== undefined && props?.data?.academicDay != null) {
        setAcademicDay({
          key: props?.data?.academicDay?.id,
          label: props?.data?.academicDay?.name,
          value: props?.data?.academicDay?.id,
        });
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setGrade(null);
    setTeacher(null);
    setAcademicDay(null);
    setCampus(null);
    if (props?.loginReducer?.campusId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('campusId', {
        required: true,
        value: props?.loginReducer?.campusId,
      });
    }
    if (academicGradeId) {
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

  const getTeacherAndDays = async (campusId: string) => {
    setAcademicDay(null);
    setValue('teacherId', null);
    setTeacher(null);
    setValue('academicDayId', null);
    if (campusId) {
      props.getListAllTeacher(campusId, props?.loginReducer?.schoolId).then((data: any) => {
        setTeachers(
          data.map((c: any) => {
            return { label: `${c?.node?.user.name} ${c?.node?.user.lastName}`, value: c.node.id, key: c.node.id };
          }),
        );
      });
      props.getListAllAcademicDay(campusId).then((data: any) => {
        setAcademicDays(
          data.map((c: any) => {
            return { label: c.node.name, value: c.node.id, key: c.node.id };
          }),
        );
      });
    }
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
                    <IntlMessages id="menu.campus" />
                  </Label>
                  <Select
                    isClearable
                    placeholder={<IntlMessages id="forms.select" />}
                    {...register('campusId', { required: true })}
                    className="react-select"
                    classNamePrefix="react-select"
                    options={campusList}
                    value={campus}
                    onChange={(selectedOption) => {
                      setValue('campusId', selectedOption?.key);
                      setCampus(selectedOption);
                      getTeacherAndDays(selectedOption?.key);
                    }}
                  />
                </div>
              ) : (
                ''
              )}
              <div className="form-group">
                <Label>
                  Titular
                </Label>
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('teacherId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={teachers}
                  value={teacher}
                  onChange={(selectedOption) => {
                    setValue('teacherId', selectedOption?.key);
                    setTeacher(selectedOption);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.academicDay" />
                </Label>
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('academicDayId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={academicDays}
                  value={academicDay}
                  onChange={(selectedOption) => {
                    setValue('academicDayId', selectedOption?.key);
                    setAcademicDay(selectedOption);
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

const mapDispatchToProps = { ...academicIndicatorActions, ...teacherActions, ...academicDayActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCreateEdit);
