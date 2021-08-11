import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as asignatureActions from '../../../stores/actions/AsignatureActions';
import * as cycleActions from '../../../stores/actions/CycleActions';
import * as standardActions from '../../../stores/actions/StandardActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const StandardCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [asignaturesList, setAsignaturesList] = useState(null);
  const [cyclesList, setCyclesList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getAsignatures();
    getCycles();
    if (props?.data?.id) {    
      if (props?.data?.generalAcademicAsignature !== undefined && props?.data?.generalAcademicAsignature != null) {
        setAsignature({
          key: props?.data?.generalAcademicAsignature?.id,
          label: props?.data?.generalAcademicAsignature?.name,
          value: props?.data?.generalAcademicAsignature?.id,
        });
      }
      if (props?.data?.generalAcademicCycle !== undefined && props?.data?.generalAcademicCycle != null) {
        setCycle({
          key: props?.data?.generalAcademicCycle?.id,
          label: props?.data?.generalAcademicCycle?.name,
          value: props?.data?.generalAcademicCycle?.id,
        });
      }
    } else {
      methods.reset();
    }
    setLoading(false);
  }, [props?.data]);

  const getAsignatures = async () => {
    props.getListAllAsignature().then((listData: any) => {
      setAsignaturesList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };
  const getCycles = async () => {
    props.getListAllCycle().then((listData: any) => {
      setCyclesList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const data = {
    standard:
      props?.data?.id || props?.data?.standard === methods.getValues('standard')
        ? props?.data?.standard
        : methods.getValues('standard'),
    type:
      props?.data?.id || props?.data?.type === methods.getValues('type')
        ? props?.data?.type
        : methods.getValues('type'),
    subtype:
      props?.data?.id || props?.data?.subtype === methods.getValues('subtype')
        ? props?.data?.subtype
        : methods.getValues('subtype'),
    generalAcademicAsignature:
      props?.data?.id ||
      props?.data?.generalAcademicAsignature === methods.getValues('generalAcademicAsignature')
        ? {
            value: props?.data?.generalAcademicAsignature?.id,
            label: props?.data?.generalAcademicAsignature?.name,
          }
        : methods.getValues('generalAcademicAsignature'),
    generalAcademicCycle:
      props?.data?.id ||
      props?.data?.generalAcademicCycle === methods.getValues('generalAcademicCycle')
        ? {
            value: props?.data?.generalAcademicCycle?.id,
            label: props?.data?.generalAcademicCycle?.name,
          }
        : methods.getValues('generalAcademicCycle'),
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [cycle, setCycle] = useState(null);

  const [asignature, setAsignature] = useState(null);

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
                <IntlMessages id="forms.standard" />
              </Label>
              <Input
                {...methods.register('standard', { required: true })}
                name="standard"
                defaultValue={data.standard}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.type" />
              </Label>
              <Input
                {...methods.register('type', { required: true })}
                name="type"
                defaultValue={data.type}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.subtype" />
              </Label>
              <Input
                {...methods.register('subtype', { required: true })}
                name="subtype"
                defaultValue={data.subtype}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.asignature" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('generalAcademicAsignatureId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={asignaturesList}
                value={asignature}
                onChange={(selectedOption) => {
                  methods.setValue('generalAcademicAsignatureId', selectedOption?.key);
                  setAsignature(selectedOption);
                }}
              />             
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.cycleAcademic" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('generalAcademicCycleId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={cyclesList}
                value={cycle}
                onChange={(selectedOption) => {
                  methods.setValue('generalAcademicCycleId', selectedOption?.key);
                  setCycle(selectedOption);
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

const mapDispatchToProps = { ...standardActions, ...asignatureActions, ...cycleActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StandardCreateEdit);
