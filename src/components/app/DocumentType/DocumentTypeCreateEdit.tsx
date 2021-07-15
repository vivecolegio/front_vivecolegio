import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as documentTypeActions from '../../../stores/actions/DocumentTypeActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const DocumentTypeCreateEdit = (props: any) => {
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
    code:
      props?.data?.id || props?.data?.code === methods.getValues('code')
        ? props?.data?.code
        : methods.getValues('code'),
    description:
      props?.data?.id || props?.data?.description === methods.getValues('description')
        ? props?.data?.description
        : methods.getValues('description'),
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
                <IntlMessages id="forms.code" />
              </Label>
              <Input
                {...methods.register('code', { required: true })}
                name="code"
                defaultValue={data.code}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.description" />
              </Label>
              <Input
                {...methods.register('description', { required: true })}
                name="description"
                defaultValue={data.description}
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

const mapDispatchToProps = { ...documentTypeActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTypeCreateEdit);
