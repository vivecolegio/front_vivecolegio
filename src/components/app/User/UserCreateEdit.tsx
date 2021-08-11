import { DevTool } from '@hookform/devtools';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
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
      if (props?.data?.birthdate !== undefined && props?.data?.birthdate != null) {
        setBirtdate(new Date(props?.data?.birthdate));
      }
      if (props?.data?.role !== undefined && props?.data?.role != null) {
        setRole({
          key: props?.data?.role?.id,
          label: props?.data?.role?.name,
          value: props?.data?.role?.id,
        });
      }
      if (props?.data?.gender !== undefined && props?.data?.gender != null) {
        setGender({
          key: props?.data?.gender?.id,
          label: props?.data?.gender?.name,
          value: props?.data?.gender?.id,
        });
      }
      if (props?.data?.documentType !== undefined && props?.data?.documentType != null) {
        setDocumentType({
          key: props?.data?.documentType?.id,
          label: props?.data?.documentType?.name,
          value: props?.data?.documentType?.id,
        });
      }
    } else {
      methods.reset();
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

  const [birtdate, setBirtdate] = useState(null);

  const [role, setRole] = useState(null);

  const [gender, setGender] = useState(null);

  const [documentType, setDocumentType] = useState(null);

  return (
    <>
      <DevTool control={methods.control} placement="top-left" />
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
                {...methods.register('birthdate', { required: true })}
                selected={birtdate}
                onChange={(date) => {
                  methods.setValue('birthdate', date as Date);
                  setBirtdate(date as Date);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.role" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('roleId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={rolesList}
                value={role}
                onChange={(selectedOption) => {
                  methods.setValue('roleId', selectedOption?.key);
                  setRole(selectedOption);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.gender" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('genderId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={gendersList}
                value={gender}
                onChange={(selectedOption) => {
                  methods.setValue('genderId', selectedOption?.key);
                  setGender(selectedOption);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.documentType" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('documentTypeId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={documentTypesList}
                value={documentType}
                onChange={(selectedOption) => {
                  methods.setValue('documentTypeId', selectedOption?.key);
                  setDocumentType(selectedOption);
                }}
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
