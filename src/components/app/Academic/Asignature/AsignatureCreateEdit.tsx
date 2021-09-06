import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../../constants/defaultValues';
import IntlMessages from '../../../../helpers/IntlMessages';
import * as areaActions from '../../../../stores/actions/Academic/AreaActions';
import * as asignatureActions from '../../../../stores/actions/Academic/AsignatureActions';
import * as schoolActions from '../../../../stores/actions/SchoolActions';
import { Colxx } from '../../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../../common/Data/CreateEditAuditInformation';

const AsignatureCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [areasList, setAreasList] = useState(null);
  const [schoolList, setSchoolList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getAreas();
    getSchool();
    if (props?.data?.id) {
      if (props?.data?.academicArea !== undefined && props?.data?.academicArea != null) {
        setArea({
          key: props?.data?.academicArea?.id,
          label: props?.data?.academicArea?.name,
          value: props?.data?.academicArea?.id,
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

  const getAreas = async () => {
    props.getListAllArea().then((listData: any) => {
      setAreasList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
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
    name:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),
    abbreviation:
      props?.data?.id || props?.data?.abbreviation === methods.getValues('abbreviation')
        ? props?.data?.abbreviation
        : methods.getValues('abbreviation'),
    code:
      props?.data?.id || props?.data?.code === methods.getValues('code')
        ? props?.data?.code
        : methods.getValues('code'),
    weight:
      props?.data?.id || props?.data?.weight === methods.getValues('weight')
        ? props?.data?.weight
        : methods.getValues('weight'),
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [area, setArea] = useState(null);
  const [school, setSchool] = useState(null);

  const handleChangeNumber = (event: any, name: any) => {
    methods.setValue(name, parseFloat(event.target.value));
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
                <IntlMessages id="forms.abbreviation" />
              </Label>
              <Input
                {...methods.register('abbreviation', { required: true })}
                name="abbreviation"
                defaultValue={data.abbreviation}
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
                <IntlMessages id="forms.weight" />
              </Label>
              <Input
                onChange={(e) => {
                  return handleChangeNumber(e, 'weight');
                }}
                name="weight"
                defaultValue={data.weight}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.area" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}
                {...methods.register('academicAreaId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={areasList}
                value={area}
                onChange={(selectedOption) => {
                  methods.setValue('academicAreaId', selectedOption?.key);
                  setArea(selectedOption);
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

const mapDispatchToProps = { ...asignatureActions, ...areaActions, ...schoolActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AsignatureCreateEdit);
