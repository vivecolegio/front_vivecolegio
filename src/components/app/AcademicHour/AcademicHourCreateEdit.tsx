import { DevTool } from '@hookform/devtools';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {Loader} from '../../common/Loader';
import { connect } from 'react-redux';
import Select from 'react-select';
import TimePicker from 'react-time-picker';
import { Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as AcademicHourActions from '../../../stores/actions/AcademicHourActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const AcademicHourCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [campusList, setCampusList] = useState(null);
  const [academicDayList, setAcademicDayList] = useState(null);
  const [campus, setCampus] = useState(null);
  const [academicDay, setAcademicDay] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

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
      if (props?.data?.academicDay !== undefined && props?.data?.academicDay != null) {
        setAcademicDay({
          key: props?.data?.academicDay?.id,
          label: `${props?.data?.academicDay?.workingDay} - ${props?.data?.academicDay?.typeDay}`,
          value: props?.data?.academicDay?.id,
        });
      }
      if (props?.data?.startTime !== undefined && props?.data?.startTime != null) {
        setStartTime(props?.data?.startTime);
      }
      if (props?.data?.endTime !== undefined && props?.data?.endTime != null) {
        setEndTime(props?.data?.endTime);
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setCampus(null);
    setAcademicDay(null);
    setStartTime(null);
    setEndTime(null);
    if (props?.loginReducer?.campusId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('campusId', {
        required: true,
        value: props?.loginReducer?.campusId,
      });
    }
  };

  const getDropdowns = async () => {
    props.getDropdownsAcademicHour(props?.loginReducer?.schoolId, props?.loginReducer?.campusId).then((data: any) => {
      setCampusList(
        data.dataCampus.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setAcademicDayList(
        data.dataAcademicDay.edges.map((c: any) => {
          return {
            label: `${c.node.workingDay} - ${c.node.typeDay}`,
            value: c.node.id,
            key: c.node.id,
          };
        }),
      );
    });
  };

  register('startTime', {
    required: true,
    value: props?.data?.id ? props?.data?.startTime : '',
  });
  register('endTime', {
    required: true,
    value: props?.data?.id ? props?.data?.endTime : '',
  });
  register('academicDayId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicDayId : '',
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
                  <IntlMessages id="forms.startTime" />
                </Label>
                <TimePicker
                  value={startTime}
                  {...register('startTime', { required: true })}
                  clockIcon={null}
                  disableClock={true}
                  format="HH:mm"
                  onChange={(date) => {
                    setValue('startTime', date as Date);
                    setStartTime(date as Date);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.endTime" />
                </Label>
                <TimePicker
                  value={endTime}
                  {...register('endTime', { required: true })}
                  clockIcon={null}
                  disableClock={true}
                  format="HH:mm"
                  onChange={(date) => {
                    setValue('endTime', date as Date);
                    setEndTime(date as Date);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.academicDay" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('academicDayId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={academicDayList}
                  value={academicDay}
                  onChange={(selectedOption) => {
                    setValue('academicDayId', selectedOption?.key);
                    setAcademicDay(selectedOption);
                  }}
                />
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

const mapDispatchToProps = { ...AcademicHourActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicHourCreateEdit);
