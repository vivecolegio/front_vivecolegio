import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as componentEvaluativeActions from '../../../stores/actions/ComponentEvaluativeActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import { Loader } from '../../common/Loader';

const ComponentEvaluativeCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [schoolList, setSchoolList] = useState(null);
  const [school, setSchool] = useState(null);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(null);
  const [defaultSelected, setDefaultSelected] = useState(null);
  const [academicAreas, setAcademicAreas] = useState(null);
  const [academicAreasList, setAcademicAreasList] = useState([]);
  const [academicAsignatures, setAcademicAsignatures] = useState(null);
  const [academicAsignaturesList, setAcademicAsignaturesList] = useState([]);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, reset, setValue, getValues } = methods;

  useEffect(() => {
    cleanForm();
    getDropdowns();
    if (props?.data?.id) {
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
        });
      }
      if (
        props?.data?.type !== undefined &&
        props?.data?.type != null
      ) {
        console.log(props?.data?.type)
        setType({
          key: props?.data?.type,
          label: props?.data?.type,
          value: props?.data?.type,
        });
      }
      if (
        props?.data?.default !== undefined &&
        props?.data?.default != null
      ) {
        setDefaultSelected(props?.data?.default);
      }
      if (props?.data?.academicAreas !== undefined && props?.data?.academicAreas != null) {
        setAcademicAreas(props?.data?.academicAreas.map((c: any) => {
          return { label: c.name, value: c.id, key: c.id };
        }));
      }
      if (props?.data?.academicAsignatures !== undefined && props?.data?.academicAsignatures != null) {
        setAcademicAsignatures(props?.data?.academicAsignatures.map((c: any) => {
          return { label: c.name, value: c.id, key: c.id };
        }));
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setSchool(null);
    setType(null);
    setAcademicAreas(null);
    setDefaultSelected(null);
    setAcademicAsignatures(null);
    if (props?.loginReducer?.schoolId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('schoolId', {
        required: true,
        value: props?.loginReducer?.schoolId,
      });
    }
  };
  const getDropdowns = async () => {
    props.getEvaluativeComponentTypes().then((data: any) => {
      setTypes(data.map((c: any) => {
        return { label: c.name, value: c.name, key: c.name };
      }))
    });
    props.getDropdownsComponentEvaluative(props?.loginReducer?.schoolId).then((data: any) => {
      setSchoolList(
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setAcademicAreasList(
        data.dataAreas.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setAcademicAsignaturesList(
        data.dataAsignatures.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: nameRef, ...nameRest } = register('name', {
    required: true,
    value: props?.data?.id ? props?.data?.name : '',
  });
  const { ref: weightRef, ...weightRest } = register('weight', {
    required: true,
    value: props?.data?.id ? props?.data?.weight : '',
  });
  register('schoolId', {
    required: true,
    value: props?.data?.id ? props?.data?.schoolId : '',
  });
  register('type', {
    required: true,
    value: props?.data?.id ? props?.data?.type : '',
  });
  register('academicAreasId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicAreasId : '',
  });
  register('academicAsignaturesId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicAsignaturesId : '',
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
            <Loader />
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
                <Label className='mr-2'>
                  Default
                </Label>
                <Input
                  className="itemCheck mb-0"
                  type="checkbox"
                  id={`check_hidden`}
                  defaultChecked={defaultSelected}
                  onChange={(e) => {
                    setValue('default', e.target.checked);
                    setDefaultSelected(!defaultSelected);
                  }}
                  label=""
                />
              </div>
              {defaultSelected === true ?
                <>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.type" />
                    </Label>
                    <Select
                      isClearable
                      placeholder={<IntlMessages id="forms.select" />}
                      {...register('type', { required: true })}
                      className="react-select"
                      classNamePrefix="react-select"
                      options={types}
                      value={type}
                      onChange={(selectedOption: any) => {
                        setValue('type', selectedOption?.key);
                        setType(selectedOption);
                      }}
                    />
                  </div>
                  {type ?
                    <>
                      {
                        type?.key === 'AREA' ?
                          <>
                            <div className="form-group">
                              <Label>
                                <IntlMessages id="menu.areas" />
                              </Label>
                              <Select
                                isClearable
                                placeholder={<IntlMessages id="forms.select" />}
                                isMulti
                                {...register('academicAreasId', { required: true })}
                                className="react-select"
                                classNamePrefix="react-select"
                                options={academicAreasList}
                                value={academicAreas}
                                onChange={(selectedOption: any) => {
                                  setValue(
                                    'academicAreasId',
                                    selectedOption.map((c: any) => {
                                      return c.key;
                                    }),
                                  );
                                  setAcademicAreas(selectedOption);
                                }}
                              />
                            </div>
                          </>
                          :
                          <>
                            <div className="form-group">
                              <Label>
                                <IntlMessages id="menu.asignatures" />
                              </Label>
                              <Select
                                isClearable
                                placeholder={<IntlMessages id="forms.select" />}
                                isMulti
                                {...register('academicAsignaturesId ', { required: true })}
                                className="react-select"
                                classNamePrefix="react-select"
                                options={academicAsignaturesList}
                                value={academicAsignatures}
                                onChange={(selectedOption: any) => {
                                  setValue(
                                    'academicAsignaturesId ',
                                    selectedOption.map((c: any) => {
                                      return c.key;
                                    }),
                                  );
                                  setAcademicAsignatures(selectedOption);
                                }}
                              />
                            </div>
                          </>
                      } </> : ''}
                </>
                : ''}
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.weight" />
                </Label>
                <Input {...weightRest} innerRef={weightRef} className="form-control" />
              </div>
              {!props?.loginReducer?.schoolId ? (
                <div className="form-group">
                  <Label>
                    <IntlMessages id="menu.school" />
                  </Label>
                  <Select
                    isClearable
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

const mapDispatchToProps = { ...componentEvaluativeActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentEvaluativeCreateEdit);
