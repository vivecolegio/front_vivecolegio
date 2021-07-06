import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Input, Label } from 'reactstrap';
import Select from 'react-select';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as asignatureActions from '../../../stores/actions/AsignatureActions';
import * as areaActions from '../../../stores/actions/AreaActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const AsignatureCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [areasList, setAreasList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getAreas();
    if (props?.data?.id) {
      console.log(props?.data);
    }
    setLoading(false);
  }, [props?.data]);

  const getAreas = async () => {
    props.getListAllArea().then((listData: any) => {     
      setAreasList(listData.map((c:any)=>{return{ label:c.node.name, value:c.node.id, key: c.node.id }}));
    });    
  };

  const data = {
    name:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),
    generalAcademicAreaId:
      props?.data?.id || props?.data?.generalAcademicAreaId === methods.getValues('generalAcademicAreaId')
        ? props?.data?.generalAcademicAreaId
        : methods.getValues('generalAcademicAreaId'),
  };

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
            <Loader type={loaderIcon} color={loaderColor} height={30} width={30} />
          </Colxx>
        </>
      ) : (
        <>
          <div className="form-group">
          <Label>
            <IntlMessages id="forms.name" />
          </Label>
          <Input
            {...methods.register('name', { required: true })}
            name="name"
            defaultValue={data.name}
          />
          </div>
          <div className="form-group">
          <Label>
            <IntlMessages id="forms.name" />
          </Label>
          {/* <select {...methods.register("generalAcademicAreaId")}>
           {areasList.map((c:any)=>{
             return (<>
              <option value={c.id}>{c.label}</option>
             </>)
           })}
           
          </select> */}
          <Select
              // components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"   
              options={areasList}
              name="generalAcademicAreaId"
              value={data.generalAcademicAreaId}
              // {...methods.register("generalAcademicAreaId")}   
              // value={areasList.find(c => {return c.value === value})}
              // onChange={val => {return onchange(val.value)}}
              
            />
          </div>

          {props?.data?.id ? (
            <CreateEditAuditInformation loading={loading} auditInfo={auditInfo} />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

const mapDispatchToProps = { ...asignatureActions, ...areaActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AsignatureCreateEdit);
