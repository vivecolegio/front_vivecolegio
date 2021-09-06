import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../../constants/defaultValues';
import IntlMessages from '../../../../helpers/IntlMessages';
import * as asignatureActions from '../../../../stores/actions/Academic/AsignatureActions';
import * as cycleActions from '../../../../stores/actions/GeneralAcademic/CycleActions';
import * as standardActions from '../../../../stores/actions/Academic/StandardActions';
import * as generalStandardActions from '../../../../stores/actions/GeneralAcademic/StandardActions';
import { Colxx } from '../../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../../common/Data/CreateEditAuditInformation';
import * as schoolActions from '../../../../stores/actions/SchoolActions';

const StandardCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [asignaturesList, setAsignaturesList] = useState(null);
  const [cyclesList, setCyclesList] = useState(null);
  const [standardList, setStandardsList] = useState(null);
  const [schoolList, setSchoolList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getAsignatures();
    getCycles();
    getStandards();
    getSchool();
    if (props?.data?.id) {    
      if (props?.data?.academicAsignature !== undefined && props?.data?.academicAsignature != null) {
        setAsignature({
          key: props?.data?.academicAsignature?.id,
          label: props?.data?.academicAsignature?.name,
          value: props?.data?.academicAsignature?.id,
        });
      }
      if (props?.data?.generalAcademicCycle !== undefined && props?.data?.generalAcademicCycle != null) {
        setCycle({
          key: props?.data?.generalAcademicCycle?.id,
          label: props?.data?.generalAcademicCycle?.name,
          value: props?.data?.generalAcademicCycle?.id,
        });
      }
      if (props?.data?.generalAcademicStandard !== undefined && props?.data?.generalAcademicStandard != null) {
        setStandard({
          key: props?.data?.generalAcademicStandard?.id,
          label: props?.data?.generalAcademicStandard?.standard,
          value: props?.data?.generalAcademicStandard?.id,
        });
      }
    } else {
      methods.reset();
    }
    setLoading(false);
  }, [props?.data]);

  const getAsignatures = async () => {
    props.getListAllAcademicAsignature().then((listData: any) => {
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
  const getStandards = async () => {
    props.getListAllGeneralStandard().then((listData: any) => {
      setStandardsList(
        listData.map((c: any) => {
          return { label: c.node.standard, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };
  const getSchool = async () => {
    props.getListAllSchool().then((listData: any) => {
      setSchoolList(
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
  const [standard, setStandard] = useState(null);
  const [school, setSchool] = useState(null);

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
                <IntlMessages id="menu.asignature" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('academicAsignatureId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={asignaturesList}
                value={asignature}
                onChange={(selectedOption) => {
                  methods.setValue('academicAsignatureId', selectedOption?.key);
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
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.standard" /> { ' - ' }
                <IntlMessages id="menu.general" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('generalAcademicStandardId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={standardList}
                value={standard}
                onChange={(selectedOption) => {
                  methods.setValue('generalAcademicStandardId', selectedOption?.key);
                  setStandard(selectedOption);
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
                options={schoolList}
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

const mapDispatchToProps = { ...standardActions, ...asignatureActions, ...cycleActions, ...generalStandardActions,  ...schoolActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StandardCreateEdit);
