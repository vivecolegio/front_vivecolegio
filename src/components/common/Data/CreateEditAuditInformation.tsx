import React from 'react';
import Loader from 'react-loader-spinner';
import { Input, Label } from 'reactstrap';
import moment from 'moment';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../CustomBootstrap';

const CreateEditAuditInformation = (props: any) => {
  const { auditInfo, loading } = props;

  return (
    <>
      <div className="position-absolute" style={{ bottom: 0, left: 0, right: 0 }}>
        <Separator className="pt-2 mb-3" />
        <div style={{ paddingRight: '1rem', paddingLeft: '1rem' }}>
          <div>
            <IntlMessages id="forms.auditInformation" />
            <div className="float-right row mr-0">
              <Label>
                <IntlMessages id="forms.version" />: {auditInfo.version}
              </Label>
            </div>
          </div>
          <div>
            {loading ? (
              <Colxx sm={12} className="d-flex justify-content-center">
                <Loader type={loaderIcon} color={loaderColor} height={30} width={30} />
              </Colxx>
            ) : (
              <>
                <Label />
                <div className="d-flex">
                  {/* Created At */}
                  <Label className="form-group has-float-label">
                    <Input defaultValue={moment(auditInfo.createdAt).format('YYYY-MM-DD h:mm a')} readOnly={true} />
                    <span>
                      <IntlMessages id="forms.createdAt" />
                    </span>
                  </Label>
                  <div className="p-2" />
                  {/* Created By */}
                  <Label className="form-group has-float-label">
                    <Input defaultValue={auditInfo.createdBy} readOnly={true} />
                    <span>
                      <IntlMessages id="forms.createdBy" />
                    </span>
                  </Label>
                </div>
                <div className="d-flex">
                  {/* Updated At */}
                  <Label className="form-group has-float-label">
                    <Input defaultValue={moment(auditInfo.updatedAt).format('YYYY-MM-DD h:mm a')} readOnly={true} />
                    <span>
                      <IntlMessages id="forms.updatedAt" />
                    </span>
                  </Label>
                  <div className="p-2" />
                  {/* Updated By */}
                  <Label className="form-group has-float-label">
                    <Input defaultValue={auditInfo.updatedBy} readOnly={true} />
                    <span>
                      <IntlMessages id="forms.updatedBy" />
                    </span>
                  </Label>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEditAuditInformation;
