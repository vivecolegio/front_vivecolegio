import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as academicPeriodActions from '../../../stores/actions/AcademicPeriodActions';
import * as schoolActions from '../../../stores/actions/SchoolActions';
import * as schoolYearActions from '../../../stores/actions/SchoolYearActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const AcademicPeriodCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [schoolList, setSchoolList] = useState(null);
  const [schoolYearsList, setSchoolYearsList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getSchool();
    getSchoolYear();
    if (props?.data?.id) {  
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
        });
      }
      if (props?.data?.schoolYear !== undefined && props?.data?.schoolYear != null) {
        setSchoolYear({
          key: props?.data?.schoolYear?.id,
          label: props?.data?.schoolYear?.schoolYear,
          value: props?.data?.schoolYear?.id,
        });
      }
      if (props?.data?.startDate !== undefined && props?.data?.startDate != null) {
        setStartDate(new Date(props?.data?.startDate));
      }
      if (props?.data?.endDate !== undefined && props?.data?.endDate != null) {
        setEndDate(new Date(props?.data?.endDate));
      }
    } else {
      methods.reset();
    }
    setLoading(false);
  }, [props?.data]);


  const getSchool = async () => {
    props.getListAllSchool().then((listData: any) => {
      setSchoolList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const getSchoolYear = async () => {
    props.getListAllSchoolYear().then((listData: any) => {
      setSchoolYearsList(
        listData.map((c: any) => {
          return { label: c.node.schoolYear, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const data = {
    weight:
      props?.data?.id || props?.data?.weight === methods.getValues('weight')
        ? props?.data?.weight
        : methods.getValues('weight'),   
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [school, setSchool] = useState(null);
  const [schoolYear, setSchoolYear] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChangeNumber = (event: any, name: any) => {
    methods.setValue(name, parseFloat(event.target.value));
  };

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
                <IntlMessages id="forms.weight" />
              </Label>
              <Input
                onChange={(e) => {
                  return handleChangeNumber(e, 'weight');
                }}
                name="weight"
                defaultValue={data.weight}
              />
            </div>    
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.startDate" />
              </Label>
              <DatePicker
                {...methods.register('startDate', { required: true })}
                selected={startDate}
                onChange={(date: any) => {
                  methods.setValue('startDate', date as Date);
                  setStartDate(date as Date);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.endDate" />
              </Label>
              <DatePicker
                {...methods.register('endDate', { required: true })}
                selected={endDate}
                onChange={(date:any) => {
                  methods.setValue('endDate', date as Date);
                  setEndDate(date as Date);
                }}
              />
            </div>   
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.schoolYear" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}
                {...methods.register('schoolYearId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={schoolYearsList}
                value={schoolYear}
                onChange={(selectedOption) => {
                  methods.setValue('schoolYearId', selectedOption?.key);
                  setSchoolYear(selectedOption);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.school" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}
                {...methods.register('schoolId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={schoolList}
                value={school}
                onChange={(selectedOption) => {
                  methods.setValue('schoolId', selectedOption?.key);
                  setSchool(selectedOption);
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

const mapDispatchToProps = { ...academicPeriodActions, ...schoolActions, ...schoolYearActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicPeriodCreateEdit);
