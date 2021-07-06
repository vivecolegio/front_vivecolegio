import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Input, Label } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as schoolActions from '../../../stores/actions/SchoolActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const SchoolCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);

  const methods = useFormContext();

  useEffect(() => {
    if (props?.data?.id) {
      console.log(props?.data);
    }
    setLoading(false);
  }, [props?.data]);

  const data = {
    name:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),
    daneCode:
      props?.data?.id || props?.data?.daneCode === methods.getValues('daneCode')
        ? props?.data?.daneCode
        : methods.getValues('daneCode'),
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
              <IntlMessages id="forms.daneCode" />
            </Label>
            <Input
              {...methods.register('daneCode', { required: true })}
              name="daneCode"
              defaultValue={data.daneCode}
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

const mapDispatchToProps = { ...schoolActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolCreateEdit);
