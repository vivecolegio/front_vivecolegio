import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Input, Label } from 'reactstrap';
import Select from 'react-select';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as standardActions from '../../../stores/actions/StandardActions';
import * as asignatureActions from '../../../stores/actions/AsignatureActions';
import * as cycleActions from '../../../stores/actions/CycleActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const StandardCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [asignaturesList, setAsignaturesList] = useState(null);
  const [cyclesList, setCyclesList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getAsignatures();
    getCycles();
    if (props?.data?.id) {
      console.log(props?.data);
    }
    setLoading(false);
  }, [props?.data]);

  const getAsignatures = async () => {
    props.getListAllAsignature().then((listData: any) => {     
      setAsignaturesList(listData.map((c:any)=>{return{ label:c.node.name, value:c.node.id, key: c.node.id }}));
    });    
  };
  const getCycles = async () => {
    props.getListAllCycle().then((listData: any) => {     
      setCyclesList(listData.map((c:any)=>{return{ label:c.node.name, value:c.node.id, key: c.node.id }}));
    });    
  };

  const data = {
    standard:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),
    type:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),
    subtype:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),   
    generalAcademicAsignatureId:
      props?.data?.id || props?.data?.generalAcademicAsignatureId === methods.getValues('generalAcademicAsignatureId')
        ? props?.data?.generalAcademicAsignatureId
        : methods.getValues('generalAcademicAsignatureId'),
    generalAcademicCycleId:
      props?.data?.id || props?.data?.generalAcademicCycleId === methods.getValues('generalAcademicCycleId')
        ? props?.data?.generalAcademicCycleId
        : methods.getValues('generalAcademicCycleId'),
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
            <IntlMessages id="forms.standard" />
          </Label>
          <Input
            {...methods.register('standard', { required: true })}
            name="standard"
            defaultValue={data.standard}
          />
          </div>
          <div className="form-group">
          <Label>
            <IntlMessages id="forms.type" />
          </Label>
          <Input
            {...methods.register('type', { required: true })}
            name="type"
            defaultValue={data.type}
          />
          </div>
          <div className="form-group">
          <Label>
            <IntlMessages id="forms.subtype" />
          </Label>
          <Input
            {...methods.register('subtype', { required: true })}
            name="subtype"
            defaultValue={data.subtype}
          />
          </div>
          <div className="form-group">
          <Label>
            <IntlMessages id="menu.asignature" />
          </Label>          
          <Select
              // components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"   
              options={asignaturesList}
              name="generalAcademicAsignatureId"
              selected={data.generalAcademicAsignatureId}
              // {...methods.register("generalAcademicAreaId")}   
              // value={areasList.find(c => {return c.value === value})}
              // onChange={val => {return onchange(val.value)}}              
            />
          </div>
          <div className="form-group">
          <Label>
            <IntlMessages id="menu.cycleAcademic" />
          </Label>          
          <Select
              // components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"   
              options={cyclesList}
              name="generalAcademicCycleId"
              selected={data.generalAcademicCycleId}
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

const mapDispatchToProps = { ...standardActions, ...asignatureActions, ...cycleActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StandardCreateEdit);
