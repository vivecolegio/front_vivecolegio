import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
// import CustomSelectInput from 'components/common/CustomSelectInput';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as AcademicDayActions from '../../../stores/actions/AcademicDayActions';
import * as CampusActions from '../../../stores/actions/CampusActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const AcademicDayCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [campusList, setCampusList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {  
    getCampusList();
    if (props?.data?.id) {      
      if (props?.data?.campus !== undefined && props?.data?.campus != null) {
        setCampus({
          key: props?.data?.campus?.id,
          label: props?.data?.campus?.name,
          value: props?.data?.campus?.id,
        });
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

  const data = {
    typeDay:
      props?.data?.id || props?.data?.typeDay === methods.getValues('typeDay')
        ? props?.data?.typeDay
        : methods.getValues('typeDay'),
    workingDay:
      props?.data?.id || props?.data?.workingDay === methods.getValues('workingDay')
        ? props?.data?.workingDay
        : methods.getValues('workingDay'),
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [campus, setCampus] = useState(null);

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
                <IntlMessages id="forms.workingDay" />
              </Label>
              <Input
                {...methods.register('workingDay', { required: true })}
                name="workingDay"
                defaultValue={data.workingDay}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.type" />
              </Label>
              <Input
                {...methods.register('typeDay', { required: true })}
                name="typeDay"
                defaultValue={data.typeDay}
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

const mapDispatchToProps = { ...AcademicDayActions, ...CampusActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicDayCreateEdit);
