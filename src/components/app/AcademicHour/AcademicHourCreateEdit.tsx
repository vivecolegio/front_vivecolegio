import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
// import CustomSelectInput from 'components/common/CustomSelectInput';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as AcademicHourActions from '../../../stores/actions/AcademicHourActions';
import * as CampusActions from '../../../stores/actions/CampusActions';
import * as academicDayActions from '../../../stores/actions/AcademicDayActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const AcademicHourCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [campusList, setCampusList] = useState(null);
  const [academicDayList, setAcademicDayList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {  
    getCampusList();
    getAcademicDayList();
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
          label: `${props?.data?.workingDay  } - ${  props?.data?.typeDay}`,
          value: props?.data?.academicDay?.id,
        });
      }   
      if (props?.data?.startTime !== undefined && props?.data?.startTime != null) {
        setStartTime(props?.data?.startTime);
      }
      if (props?.data?.endTime !== undefined && props?.data?.endTime != null) {
        setEndTime(props?.data?.endTime);
      }  
    } else {
      methods.reset();
    }
    setLoading(false);
  }, [props?.data]);

  const getCampusList = async () => {
    props.getListAllCampus().then((listData: any) => {
      setCampusList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const getAcademicDayList = async () => {
    props.getListAllAcademicDay().then((listData: any) => {
      setAcademicDayList(
        listData.map((c: any) => {
          return { label: `${c.node.workingDay  } - ${  c.node.typeDay}`, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };


  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [campus, setCampus] = useState(null);
  const [academicDay, setAcademicDay] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  return (
    <>
      {loading ? (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader type={loaderIcon} color={loaderColor} height={30} width={30} />
          </Colxx>
        </>
      ) : (
        <>
          <ModalBody>
          <div className="form-group">
              <Label>
                <IntlMessages id="forms.startTime" />
              </Label>
              <TimePicker
                value={startTime} 
                {...methods.register('startTime', { required: true })}
                clockIcon={null}              
                disableClock={true}
                format="HH:mm"              
                onChange={(date) => {
                  methods.setValue('startTime', date as Date);
                  setStartTime(date as Date);
                } }/>
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.endTime" />
              </Label>
              <TimePicker
                value={endTime} 
                {...methods.register('endTime', { required: true })}
                clockIcon={null}              
                disableClock={true}
                format="HH:mm"              
                onChange={(date) => {
                  methods.setValue('endTime', date as Date);
                  setEndTime(date as Date);
                } }/>
            </div>             
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.academicDay" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('academicDayId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={academicDayList}
                value={academicDay}
                onChange={(selectedOption) => {
                  methods.setValue('academicDayId', selectedOption?.key);
                  setAcademicDay(selectedOption);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.campus" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('campusId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={campusList}
                value={campus}
                onChange={(selectedOption) => {
                  methods.setValue('campusId', selectedOption?.key);
                  setCampus(selectedOption);
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
        </>
      )}
    </>
  );
};

const mapDispatchToProps = { ...AcademicHourActions, ...academicDayActions, ...CampusActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicHourCreateEdit);
