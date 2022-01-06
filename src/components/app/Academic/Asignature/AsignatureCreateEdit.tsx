import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../../constants/defaultValues';
import IntlMessages from '../../../../helpers/IntlMessages';
import * as asignatureActions from '../../../../stores/actions/Academic/AsignatureActions';
import { Colxx } from '../../../common/CustomBootstrap';
import AddNewModal from '../../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../../common/Data/CreateEditAuditInformation';

const AsignatureCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [areasList, setAreasList] = useState(null);
  const [schoolList, setSchoolList] = useState(null);
  const [area, setArea] = useState(null);
  const [school, setSchool] = useState(null);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, reset, setValue, getValues } = methods;

  useEffect(() => {
    cleanForm();
    getDropdowns();
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
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setArea(null);
    setSchool(null);
    if (props?.loginReducer?.schoolId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('schoolId', {
        required: true,
        value: props?.loginReducer?.schoolId,
      });
    }
  };

  const getDropdowns = async () => {
    props.getDropdownsAcademicAsignature().then((data: any) => {
      setSchoolList(
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setAreasList(
        data.dataAreas.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: nameRef, ...nameRest } = register('name', {
    required: true,
    value: props?.data?.id ? props?.data?.name : '',
  });
  const { ref: abbreviationRef, ...abbreviationRest } = register('abbreviation', {
    required: true,
    value: props?.data?.id ? props?.data?.abbreviation : '',
  });
  const { ref: codeRef, ...codeRest } = register('code', {
    required: true,
    value: props?.data?.id ? props?.data?.code : '',
  });
  const { ref: weightRef, ...weightRest } = register('weight', {
    required: true,
    value: props?.data?.id ? props?.data?.weight : '',
  });

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
          <AddNewModal
            modalOpen={props.modalOpen}
            toggleModal={() => {
              cleanForm();
              props.toggleModal();
            }}
            onSubmit={props.onSubmit}
            data={props.data}
            methods={methods}
            control={control}
            handleSubmit={handleSubmit}
          >
            <ModalBody>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.name" />
                </Label>
                <Input {...nameRest} innerRef={nameRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.abbreviation" />
                </Label>
                <Input {...abbreviationRest} innerRef={abbreviationRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.code" />
                </Label>
                <Input {...codeRest} innerRef={codeRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.weight" />
                </Label>
                <Input {...weightRest} innerRef={weightRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.area" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('academicAreaId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={areasList}
                  value={area}
                  onChange={(selectedOption) => {
                    setValue('academicAreaId', selectedOption?.key);
                    setArea(selectedOption);
                  }}
                />
              </div>

              {!props?.loginReducer?.schoolId ? (
                <div className="form-group">
                  <Label>
                    <IntlMessages id="menu.school" />
                  </Label>
                  <Select
                    placeholder={<IntlMessages id="forms.select" />}
                    {...register('schoolId', { required: true })}
                    className="react-select"
                    classNamePrefix="react-select"
                    options={schoolList}
                    value={school}
                    onChange={(selectedOption) => {
                      setValue('schoolId', selectedOption?.key);
                      setSchool(selectedOption);
                    }}
                  />
                </div>
              ) : (
                ''
              )}
            </ModalBody>
            {props?.data?.id ? (
              <ModalFooter className="p-3">
                <CreateEditAuditInformation loading={loading} auditInfo={auditInfo} />
              </ModalFooter>
            ) : (
              <></>
            )}
          </AddNewModal>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = { ...asignatureActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AsignatureCreateEdit);
