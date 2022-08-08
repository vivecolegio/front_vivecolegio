import { DevTool } from '@hookform/devtools';
import React, { useEffect, useState } from 'react';
import { CirclePicker, TwitterPicker } from 'react-color';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Button, Input, InputGroup, ModalBody, ModalFooter } from 'reactstrap';

import { loaderColor, loaderIcon } from '../../../../constants/defaultValues';
import IntlMessages from '../../../../helpers/IntlMessages';
import * as performanceLevelAction from '../../../../stores/actions/Academic/PerformanceLevelActions';
import { Colxx } from '../../../common/CustomBootstrap';
import AddNewModal from '../../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../../common/Data/CreateEditAuditInformation';
import FormGroupCustom from '../../../common/Data/FormGroupCustom';
import LabelCustom from '../../../common/Data/LabelCustom';
import RequiredMessagesCustom from '../../../common/Data/RequiredMessagesCustom';
import { Loader } from '../../../common/Loader';

const AreaCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [generalPerformancesLevelList, setGeneralPerformancesLevelList] = useState(null);
  const [schoolList, setSchoolList] = useState(null);
  const [generalPerformanceLevel, setGeneralPerformanceLevel] = useState(null);
  const [school, setSchool] = useState(null);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(null);
  const [campusList, setCampusList] = useState(null);
  const [campus, setCampus] = useState(null);
  const [academicGradesList, setAcademicGradesList] = useState(null);
  const [academicGrades, setAcademicGrades] = useState(null);
  const [color, setColor] = useState({ background: '' });

  const intl = useIntl();

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, unregister, reset, setValue, formState, trigger } = methods;

  useEffect(() => {
    cleanForm();
    getDropdowns();
    if (props?.data?.id) {
      if (
        props?.data?.generalPerformanceLevel !== undefined &&
        props?.data?.generalPerformanceLevel != null
      ) {
        setGeneralPerformanceLevel({
          key: props?.data?.generalPerformanceLevel?.id,
          label: props?.data?.generalPerformanceLevel?.name,
          value: props?.data?.generalPerformanceLevel?.id,
        });
      }
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
        setType({
          key: props?.data?.type,
          label: intl.messages["display." + props?.data?.type],
          value: props?.data?.type,
        });
      }
      if (props?.data?.campus !== undefined && props?.data?.campus != null) {
        setCampus(props?.data?.campus.map((c: any) => {
          return { label: c.name, value: c.id, key: c.id };
        }));
      }
      if (props?.data?.academicGrades !== undefined && props?.data?.academicGrades != null) {
        setAcademicGrades(props?.data?.academicGrades.map((c: any) => {
          return { label: c.name, value: c.id, key: c.id };
        }));
      }
      if (props?.data?.colorHex) {
        setColor({ background: props?.data?.colorHex })
      }
      register('schoolId', {
        required: true,
        value: props?.data?.id ? props?.data?.schoolId : '',
      });
      register('generalPerformanceLevelId', {
        required: true,
        value: props?.data?.id ? props?.data?.generalPerformanceLevelId : '',
      });
      register('type', {
        required: true,
        value: props?.data?.id ? props?.data?.type : '',
      });
      register('campusId', {
        required: false,
        value: props?.data?.id ? props?.data?.campusId : '',
      });
      register('academicGradesId', {
        required: false,
        value: props?.data?.id ? props?.data?.academicGradesId : '',
      });
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setSchool(null);
    setGeneralPerformanceLevel(null);
    setType(null);
    setColor({ background: '' });
    if (props?.loginReducer?.schoolId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('schoolId', {
        required: true,
        value: props?.loginReducer?.schoolId,
      });
    }
  };

  const getDropdowns = async () => {
    props.getPerformanceLevelTypes().then((data: any) => {
      setTypes(data.map((c: any) => {
        return { label: intl.messages["display." + c.name], value: c.name, key: c.name };
      }))
    });
    props.getDropdownsPerformanceLevel(props?.loginReducer?.schoolId).then((data: any) => {
      setSchoolList(
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setCampusList(
        data.dataCampus.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setGeneralPerformancesLevelList(
        data.dataGeneralPerformanceLevels.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setAcademicGradesList(
        data.dataAcademicGrade.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      )
    });
  };

  const { ref: nameRef, ...nameRest } = register('name', {
    required: true,
    value: props?.data?.id ? props?.data?.name : '',
  });

  const { ref: minimumScoreRef, ...minimumScoreRest } = register('minimumScore', {
    required: props?.data?.id && props?.data?.type !== "QUALITATIVE" ? true : false,
    value: props?.data?.id ? props?.data?.minimumScore : '',
  });

  const { ref: topScoreRef, ...topScoreRest } = register('topScore', {
    required: props?.data?.id && props?.data?.type !== "QUALITATIVE" ? true : false,
    value: props?.data?.id ? props?.data?.topScore : '',
  });

  const { ref: abbreviationRef, ...abbreviationRest } = register('abbreviation', {
    required: false,
    value: props?.data?.id ? props?.data?.abbreviation : '',
  });

  const { ref: colorRef, ...colorRest } = register('colorHex', {
    required: false,
    value: props?.data?.id ? props?.data?.colorHex : '',
  });

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const handleChange = (color: any) => {
    setColor({ background: color.hex })
    setValue('colorHex', color.hex);
  };

  return (
    <>
      {/* <DevTool control={methods.control} placement="top-left" /> */}
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
              <FormGroupCustom>
                <LabelCustom id="forms.name" required={true} />
                <Input {...nameRest} innerRef={nameRef} className="form-control" />
                <RequiredMessagesCustom formState={formState} register={"name"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="forms.abbreviation" required={false} />
                <Input {...abbreviationRest} innerRef={abbreviationRef} className="form-control" />
                <RequiredMessagesCustom formState={formState} register={"abbreviation"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="forms.type" required={true} />
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
                    if (selectedOption?.key == 'QUALITATIVE') {
                      register('minimumScore', {
                        required: false, value: null
                      });
                      register('topScore', {
                        required: false, value: null
                      });
                    } else {
                      register('minimumScore', {
                        required: true,
                        value: props?.data?.id ? props?.data?.minimumScore : '',
                      });
                      register('topScore', {
                        required: true,
                        value: props?.data?.id ? props?.data?.topScore : '',
                      });
                    }
                    trigger('type');
                  }}
                />
                <RequiredMessagesCustom formState={formState} register={"type"} />
              </FormGroupCustom>
              {type?.key && type?.key !== 'QUALITATIVE' ?
                <>
                  <FormGroupCustom>
                    <LabelCustom id="forms.minimumScore" required={true} />
                    <Input {...minimumScoreRest} innerRef={minimumScoreRef} className="form-control" />
                    <RequiredMessagesCustom formState={formState} register={"minimumScore"} />
                  </FormGroupCustom>
                  <FormGroupCustom>
                    <LabelCustom id="forms.topScore" required={true} />
                    <Input {...topScoreRest} innerRef={topScoreRef} className="form-control" />
                    <RequiredMessagesCustom formState={formState} register={"topScore"} />
                  </FormGroupCustom>
                </>
                : ''}
              <FormGroupCustom>
                <LabelCustom id="forms.color" required={false} />
                <InputGroup addonType="append">
                  <Input {...colorRest} innerRef={colorRef} className="form-control" disabled={true} />
                  <div style={{
                    width: '36px',
                    borderRadius: '2px',
                    background: color?.background
                  }} />
                </InputGroup>
                <TwitterPicker color={color?.background} onChange={(event) => { handleChange(event) }} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="menu.performanceLevelGeneral" required={true} />
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('generalPerformanceLevelId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={generalPerformancesLevelList}
                  value={generalPerformanceLevel}
                  onChange={(selectedOption: any) => {
                    setValue('generalPerformanceLevelId', selectedOption?.key);
                    setGeneralPerformanceLevel(selectedOption);
                    trigger('generalPerformanceLevelId');
                  }}
                />
                <RequiredMessagesCustom formState={formState} register={"generalPerformanceLevelId"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="menu.grades" required={false} />
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  isMulti
                  {...register('academicGradesId', { required: false })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={academicGradesList}
                  value={academicGrades}
                  onChange={(selectedOption: any) => {
                    setValue('academicGradesId', selectedOption.map((c: any) => { return c.key }));
                    setAcademicGrades(selectedOption);
                  }}
                />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="menu.campus" required={false} />
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  isMulti
                  {...register('campusId', { required: false })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={campusList}
                  value={campus}
                  onChange={(selectedOption: any) => {
                    setValue('campusId', selectedOption.map((c: any) => { return c.key }));
                    setCampus(selectedOption);
                  }}
                />
              </FormGroupCustom>
              {!props?.loginReducer?.schoolId ? (
                <FormGroupCustom>
                  <LabelCustom id="menu.school" required={true} />
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
                  <RequiredMessagesCustom formState={formState} register={"schoolId"} />
                </FormGroupCustom>
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

const mapDispatchToProps = { ...performanceLevelAction };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaCreateEdit);
