import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as areaActions from '../../../stores/actions/AreaActions';
import * as asignatureActions from '../../../stores/actions/AsignatureActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const AsignatureCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [areasList, setAreasList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getAreas();
    if (props?.data?.id) {    
      if (props?.data?.generalAcademicArea !== undefined && props?.data?.generalAcademicArea != null) {
        setArea({
          key: props?.data?.generalAcademicArea?.id,
          label: props?.data?.generalAcademicArea?.name,
          value: props?.data?.generalAcademicArea?.id,
        });
      }     
    } else {
      methods.reset();
    }
    setLoading(false);
  }, [props?.data]);

  const getAreas = async () => {
    props.getListAllArea().then((listData: any) => {
      setAreasList(
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
    generalAcademicArea:
      props?.data?.id ||
      props?.data?.generalAcademicArea === methods.getValues('generalAcademicArea')
        ? {
            value: props?.data?.generalAcademicArea?.id,
            label: props?.data?.generalAcademicArea?.name,
          }
        : methods.getValues('generalAcademicArea'),
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [area, setArea] = useState(null);

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
                <IntlMessages id="menu.area" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('generalAcademicAreaId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={areasList}
                value={area}
                onChange={(selectedOption) => {
                  methods.setValue('generalAcademicAreaId', selectedOption?.key);
                  setArea(selectedOption);
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

const mapDispatchToProps = { ...asignatureActions, ...areaActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AsignatureCreateEdit);
