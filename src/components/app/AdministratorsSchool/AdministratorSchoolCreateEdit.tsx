import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Input, Label } from 'reactstrap';
import Select from 'react-select';
// import CustomSelectInput from 'components/common/CustomSelectInput';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as AdministratorActions from '../../../stores/actions/AdministratorSchoolActions';
import * as UserActions from '../../../stores/actions/UserActions';
import * as SchoolActions from '../../../stores/actions/SchoolActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const AdministratorCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState(null);
  const [schoolsList, setSchoolsList] = useState(null);

  const methods = useFormContext();


  useEffect(() => {
    getUsersList();
    getSchoolsList();
    if (props?.data?.id) {
      console.log(props?.data);
    }
    console.log(usersList, 'users')
    setLoading(false);
  }, [props?.data]);
  
  const getUsersList = async () => {
    props.getListAllUser().then((listData: any) => {     
      setUsersList(listData.map((c:any)=>{return{ label:c.node.name, value:c.node.id, key: c.node.id }}));
    });    
  };
  const getSchoolsList = async () => {
    props.getListAllSchool().then((listData: any) => {     
      setSchoolsList(listData.map((c:any)=>{return{ label:c.node.name, value:c.node.id, key: c.node.id }}));
    });    
  };

  const data = {
    userId:
      props?.data?.id || props?.data?.userId === methods.getValues('userId')
        ? props?.data?.userId
        : methods.getValues('userId'),
    schoolId:
      props?.data?.id || props?.data?.schoolId === methods.getValues('schoolId')
        ? props?.data?.schoolId
        : methods.getValues('schoolId'),    
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByAdministrator: props?.data?.id ? props?.data?.createdByAdministrator : null,
    updatedByAdministrator: props?.data?.id ? props?.data?.updatedByAdministrator : null,
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
              <IntlMessages id="forms.user" />
            </Label>            
            <Select
              // components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"   
              options={usersList}
              name="userId"
              selected={data.userId}
              {...methods.register('userId', { required: true })}    
            />
          </div>         
          <div className="form-group">
            <Label>
              <IntlMessages id="menu.school" />
            </Label>            
            <Select
              // components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"   
              options={schoolsList}
              name="schoolId"
              selected={data.schoolId}
              {...methods.register('schoolId', { required: true })}    
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

const mapDispatchToProps = { ...AdministratorActions, ...UserActions, ...SchoolActions};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdministratorCreateEdit);
