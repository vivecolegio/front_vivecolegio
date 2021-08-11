import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Label, ModalBody, ModalFooter } from 'reactstrap';
// import CustomSelectInput from 'components/common/CustomSelectInput';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as AdministratorActions from '../../../stores/actions/AdministratorSchoolActions';
import * as SchoolActions from '../../../stores/actions/SchoolActions';
import * as UserActions from '../../../stores/actions/UserActions';
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
      if (props?.data?.user !== undefined && props?.data?.user != null) {
        setUser({
          key: props?.data?.user?.id,
          label: props?.data?.user?.name,
          value: props?.data?.user?.id,
        });
      }
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
        });
      }   
    } else {
      methods.reset();
    }
    setLoading(false);
  }, [props?.data]);

  const getUsersList = async () => {
    props.getListAllUser().then((listData: any) => {
      setUsersList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };
  const getSchoolsList = async () => {
    props.getListAllSchool().then((listData: any) => {
      setSchoolsList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByAdministrator: props?.data?.id ? props?.data?.createdByAdministrator : null,
    updatedByAdministrator: props?.data?.id ? props?.data?.updatedByAdministrator : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [school, setSchool] = useState(null);
  const [user, setUser] = useState(null);

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
                <IntlMessages id="forms.user" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('userId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"              
                options={usersList}
                value={user}
                onChange={(selectedOption) => {
                  methods.setValue('userId', selectedOption?.key);
                  setUser(selectedOption);
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
                options={schoolsList}
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

const mapDispatchToProps = { ...AdministratorActions, ...UserActions, ...SchoolActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdministratorCreateEdit);
