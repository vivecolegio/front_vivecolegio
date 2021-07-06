import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Input, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
// import CustomSelectInput from 'components/common/CustomSelectInput';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as UserActions from '../../../stores/actions/UserActions';
import * as RoleActions from '../../../stores/actions/RoleActions';
import * as GenderActions from '../../../stores/actions/GenderActions';
import * as DocumentTypeActions from '../../../stores/actions/DocumentTypeActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const UserCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [rolesList, setRolesList] = useState(null);
  const [documentTypesList, setDocumentTypesList] = useState(null);
  const [gendersList, setGendersList] = useState(null);

  const methods = useFormContext();

  // const selectData = [
  //   { label: 'Cake', value: 'cake', key: 0 },
  //   { label: 'Cupcake', value: 'cupcake', key: 1 },
  //   { label: 'Dessert', value: 'dessert', key: 2 },
  // ]

  useEffect(() => {
    getRolesList();
    getDocumentTypesList();
    getGendersList();
    if (props?.data?.id) {
      console.log(props?.data);
    }
    console.log(rolesList, 'ROLES')
    setLoading(false);
  }, [props?.data]);
  
  const getRolesList = async () => {
    props.getListAllRole().then((listData: any) => {     
      setRolesList(listData.map((c:any)=>{return{ label:c.node.name, value:c.node.id, key: c.node.id }}));
    });    
  };
  const getDocumentTypesList = async () => {
    props.getListAllDocumentType().then((listData: any) => {     
      setDocumentTypesList(listData.map((c:any)=>{return{ label:c.node.name, value:c.node.id, key: c.node.id }}));
    });    
  };
  const getGendersList = async () => {
    props.getListAllGender().then((listData: any) => {     
      setGendersList(listData.map((c:any)=>{return{ label:c.node.name, value:c.node.id, key: c.node.id }}));
    });    
  };

  const data = {
    name:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),
    lastName:
      props?.data?.id || props?.data?.lastName === methods.getValues('lastName')
        ? props?.data?.lastName
        : methods.getValues('lastName'),
    phone:
      props?.data?.id || props?.data?.phone === methods.getValues('phone')
        ? props?.data?.phone
        : methods.getValues('phone'),
    email:
      props?.data?.id || props?.data?.email === methods.getValues('email')
        ? props?.data?.email
        : methods.getValues('email'),
    birthdate:
      props?.data?.id || props?.data?.birthdate === methods.getValues('birthdate')
        ? props?.data?.birthdate
        : methods.getValues('birthdate'),
    roleId:
      props?.data?.id || props?.data?.roleId === methods.getValues('roleId')
        ? props?.data?.roleId
        : methods.getValues('roleId'),
    genderId:
      props?.data?.id || props?.data?.genderId === methods.getValues('genderId')
        ? props?.data?.genderId
        : methods.getValues('genderId'),
    documentTypeId:
      props?.data?.id || props?.data?.documentTypeId === methods.getValues('documentTypeId')
        ? props?.data?.documentTypeId
        : methods.getValues('documentTypeId'),
    documentNumber:
      props?.data?.id || props?.data?.documentNumber === methods.getValues('documentNumber')
        ? props?.data?.documentNumber
        : methods.getValues('documentNumber'),
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const handelChangeSelect = async () =>{
    methods.register('genderId', { required: true })
    console.log(props)
  }

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
        <div>
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
              <IntlMessages id="forms.lastname" />
            </Label>
            <Input
              {...methods.register('lastName', { required: true })}
              name="lastName"
              defaultValue={data.lastName}
            />
          </div>
          <div className="form-group">
            <Label>
              <IntlMessages id="forms.phone" />
            </Label>
            <Input
              {...methods.register('phone', { required: true })}
              name="phone"
              defaultValue={data.phone}
            />
          </div>
          <div className="form-group">
            <Label>
              <IntlMessages id="forms.email" />
            </Label>
            <Input
              {...methods.register('email', { required: true })}
              name="email"
              defaultValue={data.email}
            />
          </div>
          <div className="form-group">
            <Label>
              <IntlMessages id="forms.birthdate" />
            </Label>            
            <DatePicker
                selected={data.birthdate}
                {...methods.register('birthdate', { required: true })}    
              />
          </div>
          <div className="form-group">
            <Label>
              <IntlMessages id="forms.role" />
            </Label>            
            <Select
              // components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"   
              options={rolesList}
              name="roleId"
              value={data.roleId}
              {...methods.register('roleId', { required: true })}    
            />
          </div>
          <div className="form-group">
            <Label>
              <IntlMessages id="forms.gender" />
            </Label>  
            {/* <select {...methods.register('genderId', { required: true })}>              
            {gendersList.map((val:any) => {return (
              <option value={val.value} key={val.value}>{val.label}</option>
            )})}

            </select>           */}
            <Select
              // components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"   
              options={gendersList}
              name="genderId"
              value={data.genderId}
              onChange={handelChangeSelect}    
              {...methods.register('genderId', { required: true })}    
            />
          </div>
          <div className="form-group">
            <Label>
              <IntlMessages id="forms.documentType" />
            </Label>            
            <Select
              // components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"   
              options={gendersList}
              name="documentTypeId"
              value={data.documentTypeId}
              {...methods.register('documentTypeId', { required: true })}    
            />
          </div>
          <div className="form-group">
            <Label>
              <IntlMessages id="forms.documentNumber" />
            </Label>
            <Input
              {...methods.register('documentNumber', { required: true })}
              name="documentNumber"
              defaultValue={data.documentNumber}
            />
          </div>
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

const mapDispatchToProps = { ...UserActions, ...RoleActions, ...GenderActions, ...DocumentTypeActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreateEdit);
