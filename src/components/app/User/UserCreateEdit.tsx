import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label } from 'reactstrap';
// import CustomSelectInput from 'components/common/CustomSelectInput';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as DocumentTypeActions from '../../../stores/actions/DocumentTypeActions';
import * as GenderActions from '../../../stores/actions/GenderActions';
import * as RoleActions from '../../../stores/actions/RoleActions';
import * as UserActions from '../../../stores/actions/UserActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const UserCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [rolesList, setRolesList] = useState(null);
  const [documentTypesList, setDocumentTypesList] = useState(null);
  const [gendersList, setGendersList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getRolesList();
    getDocumentTypesList();
    getGendersList();
    if (props?.data?.id) {
      console.log(props?.data);
    }
    setLoading(false);
  }, [props?.data]);

  const getRolesList = async () => {
    props.getListAllRole().then((listData: any) => {
      setRolesList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };
  const getDocumentTypesList = async () => {
    props.getListAllDocumentType().then((listData: any) => {
      setDocumentTypesList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };
  const getGendersList = async () => {
    props.getListAllGender().then((listData: any) => {
      setGendersList(
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
    role:
      props?.data?.id || props?.data?.role === methods.getValues('role')
        ? { value: props?.data?.role?.id, label: props?.data?.role?.name }
        : methods.getValues('role'),
    gender:
      props?.data?.id || props?.data?.gender === methods.getValues('gender')
        ? { value: props?.data?.gender?.id, label: props?.data?.gender?.name }
        : methods.getValues('gender'),
    documentType:
      props?.data?.id || props?.data?.documentType === methods.getValues('documentType')
        ? { value: props?.data?.documentType?.id, label: props?.data?.documentType?.name }
        : methods.getValues('documentType'),
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

  const handleChange = (selected: any, name: any) => {       
    methods.setValue(name, selected.value);
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
              <DatePicker selected={data.birthdate} {...methods.register('birthdate')} />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.role" />
              </Label>
              <Select
                className="react-select"
                classNamePrefix="react-select"
                options={rolesList}
                name="roleId"
                value={data.role}
                onChange={(e) => {
                  return handleChange(e, 'roleId');
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.gender" />
              </Label>            
              <Select                
                className="react-select"
                classNamePrefix="react-select"
                options={gendersList}
                name="genderId"
                value={data.gender}
                onChange={(e) => {
                  return handleChange(e, 'genderId');
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.documentType" />
              </Label>
              <Select                
                className="react-select"
                classNamePrefix="react-select"
                options={documentTypesList}
                name="documentTypeId"
                value={data.documentType}
                onChange={(e) => {
                  return handleChange(e, 'documentTypeId');
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.documentNumber" />
              </Label>
              <Input
                {...methods.register('documentNumber')}
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

const mapDispatchToProps = {
  ...UserActions,
  ...RoleActions,
  ...GenderActions,
  ...DocumentTypeActions,
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreateEdit);
