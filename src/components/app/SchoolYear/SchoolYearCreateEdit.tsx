import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as schoolYearActions from '../../../stores/actions/SchoolYearActions';
import * as schoolActions from '../../../stores/actions/SchoolActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const SchoolYearCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [schoolList, setSchoolList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getSchool();
    if (props?.data?.id) {  
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
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

  const data = {
    name:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),   
    folioNumber:
      props?.data?.id || props?.data?.folioNumber === methods.getValues('folioNumber')
        ? props?.data?.folioNumber
        : methods.getValues('folioNumber'),
    schoolYear:
      props?.data?.id || props?.data?.schoolYear === methods.getValues('schoolYear')
        ? props?.data?.schoolYear
        : methods.getValues('schoolYear'),
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [school, setSchool] = useState(null);
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
                <IntlMessages id="menu.schoolYear" />
              </Label>
              <Input
                 onChange={(e) => {
                  return handleChangeNumber(e, 'schoolYear');
                }}
                name="schoolYear"
                defaultValue={data.schoolYear}
              />
            </div>          
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.folioNumber" />
              </Label>
              <Input
                onChange={(e) => {
                  return handleChangeNumber(e, 'folioNumber');
                }}
                name="folioNumber"
                defaultValue={data.folioNumber}
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

const mapDispatchToProps = { ...schoolYearActions, ...schoolActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolYearCreateEdit);
