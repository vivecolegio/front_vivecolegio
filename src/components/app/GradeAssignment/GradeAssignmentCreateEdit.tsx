import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader } from '../../common/Loader';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as GradeAssignmentActions from '../../../stores/actions/GradeAssignmentActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import { useSearchParams } from 'react-router-dom';
import FormGroupCustom from '../../common/Data/FormGroupCustom';
import LabelCustom from '../../common/Data/LabelCustom';
import RequiredMessagesCustom from '../../common/Data/RequiredMessagesCustom';

const GradeAssignmentCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [gradesList, setGradesList] = useState(null);
  const [asignaturesList, setAsignaturesList] = useState(null);
  const [schoolsList, setSchoolsList] = useState(null);
  const [school, setSchool] = useState(null);
  const [grade, setGrade] = useState(null);
  const [asignature, setAsignature] = useState(null);

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  let [params] = useSearchParams();
  const academicGradeId = params.get('academicGradeId');

  const { handleSubmit, control, register, reset, setValue, formState, trigger } = methods;

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
        props?.data?.academicAsignature !== undefined &&
        props?.data?.academicAsignature != null
      ) {
        setAsignature({
          key: props?.data?.academicAsignature?.id,
          label: props?.data?.academicAsignature?.name,
          value: props?.data?.academicAsignature?.id,
        });
      }
      if (props?.data?.academicGrade !== undefined && props?.data?.academicGrade != null) {
        setGrade({
          key: props?.data?.academicGrade?.id,
          label: props?.data?.academicGrade?.name,
          value: props?.data?.academicGrade?.id,
        });
      }
      register('academicAsignatureId', {
        required: true,
        value: props?.data?.id ? props?.data?.academicAsignatureId : '',
      });
      register('academicGradeId', {
        required: true,
        value: props?.data?.id ? props?.data?.academicGradeId : '',
      });
      register('schoolId', {
        required: true,
        value: props?.data?.id ? props?.data?.schoolId : '',
      });
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setGrade(null);
    setAsignature(null);
    setSchool(null);
    if (props?.loginReducer?.schoolId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('schoolId', {
        required: true,
        value: props?.loginReducer?.schoolId,
      });
    }
    if (academicGradeId) {
      // set value when register is new and sesion contains value
      register('academicGradeId', {
        required: true,
        value: academicGradeId,
      });
    }
    if (props?.loginReducer?.schoolYear && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('schoolYearId', {
        required: true,
        value: props?.loginReducer?.schoolYear,
      });
    }
  };

  const getDropdowns = async () => {
    props.getDropdownsGradeAssignment(props?.loginReducer?.schoolId, academicGradeId).then((data: any) => {
      setSchoolsList(
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setAsignaturesList(
        data.dataAsignatures.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setGradesList(
        data.dataGrades.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: minHourlyIntensityRef, ...minHourlyIntensityRest } = register('minHourlyIntensity', {
    required: true,
    value: props?.data?.id ? props?.data?.minHourlyIntensity : '',
  });
  const { ref: maxHourlyIntensityRef, ...maxHourlyIntensityRest } = register('maxHourlyIntensity', {
    required: true,
    value: props?.data?.id ? props?.data?.maxHourlyIntensity : '',
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
              <FormGroupCustom>
                <LabelCustom id="menu.asignature" required={true} />
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('academicAsignatureId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={asignaturesList}
                  value={asignature}
                  onChange={(selectedOption) => {
                    setValue('academicAsignatureId', selectedOption?.key);
                    setAsignature(selectedOption);
                    trigger('academicAsignatureId')
                  }}
                />
                <RequiredMessagesCustom formState={formState} register={"academicAsignatureId"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="forms.minHourlyIntensity" required={true} />
                <Input
                  {...minHourlyIntensityRest}
                  innerRef={minHourlyIntensityRef}
                  className="form-control"
                  type="number" step="1" min={1}
                />
                <RequiredMessagesCustom formState={formState} register={"minHourlyIntensity"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="forms.maxHourlyIntensity" required={true} />
                <Input
                  {...maxHourlyIntensityRest}
                  innerRef={maxHourlyIntensityRef}
                  className="form-control"
                  type="number" step="1" min={1}
                />
                <RequiredMessagesCustom formState={formState} register={"maxHourlyIntensity"} />
              </FormGroupCustom>
              {!props?.loginReducer?.schoolId ? (
                <FormGroupCustom>
                  <LabelCustom id="menu.school" />
                  <Select
                    isClearable
                    placeholder={<IntlMessages id="forms.select" />}
                    {...register('schoolId', { required: true })}
                    className="react-select"
                    classNamePrefix="react-select"
                    options={schoolsList}
                    value={school}
                    onChange={(selectedOption) => {
                      setValue('schoolId', selectedOption?.key);
                      setSchool(selectedOption);
                      trigger('schoolId')
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

const mapDispatchToProps = {
  ...GradeAssignmentActions,
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeAssignmentCreateEdit);
