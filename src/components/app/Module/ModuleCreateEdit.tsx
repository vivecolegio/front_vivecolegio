import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Input, Label } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as moduleActions from '../../../stores/actions/ModuleActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const ModuleCreateEdit = (props: any) => {
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
    url:
      props?.data?.id || props?.data?.url === methods.getValues('url')
        ? props?.data?.url
        : methods.getValues('url'),
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
              <IntlMessages id="forms.url" />
            </Label>
            <Input
              {...methods.register('url', { required: true })}
              name="url"
              defaultValue={data.url}
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

const mapDispatchToProps = { ...moduleActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleCreateEdit);
