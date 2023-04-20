import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, InputGroup, InputGroupText, ModalBody, ModalFooter } from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';
import * as academicPeriodActions from '../../../stores/actions/AcademicPeriodActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import FormGroupCustom from '../../common/Data/FormGroupCustom';
import LabelCustom from '../../common/Data/LabelCustom';
import RequiredMessagesCustom from '../../common/Data/RequiredMessagesCustom';
import { Loader } from '../../common/Loader';

const AcademicPeriodCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [schoolList, setSchoolList] = useState(null);
  const [schoolYearsList, setSchoolYearsList] = useState(null);
  const [school, setSchool] = useState(null);
  const [schoolYear, setSchoolYear] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

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
      if (props?.data?.schoolYear !== undefined && props?.data?.schoolYear != null) {
        setSchoolYear({
          key: props?.data?.schoolYear?.id,
          label: props?.data?.schoolYear?.schoolYear,
          value: props?.data?.schoolYear?.id,
        });
      }
      if (props?.data?.startDate !== undefined && props?.data?.startDate != null) {
        setStartDate(new Date(props?.data?.startDate));
      }
      if (props?.data?.endDate !== undefined && props?.data?.endDate != null) {
        setEndDate(new Date(props?.data?.endDate));
      }
      register('schoolYearId', {
        required: true,
        value: props?.data?.id ? props?.data?.schoolYear?.id : '',
      });
      register('startDate', {
        required: true,
        value: props?.data?.id ? props?.data?.startDate : '',
      });
      register('endDate', {
        required: true,
        value: props?.data?.id ? props?.data?.endDate : '',
      });
    } else {
      setSchool({
        key: props?.loginReducer?.schoolData?.id,
        label: props?.loginReducer?.schoolData?.name,
        value: props?.loginReducer?.schoolData?.id,
      });
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setStartDate(null);
    setEndDate(null);
    setSchoolYear(null);
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
    props.getDropdownsAcademicPeriod(props?.loginReducer?.schoolId).then((data: any) => {
      setSchoolList(
        [{
          key: props?.loginReducer?.schoolData?.id,
          label: props?.loginReducer?.schoolData?.name,
          value: props?.loginReducer?.schoolData?.id,
        }]
      );
      setSchoolYearsList(
        data.dataSchoolYears.edges.map((c: any) => {
          return { label: c.node.schoolYear, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: weightRef, ...weightRest } = register('weight', {
    required: true,
    value: props?.data?.id ? props?.data?.weight : '',
  });
  const { ref: orderRef, ...orderRest } = register('order', {
    required: true,
    value: props?.data?.id ? props?.data?.order : '',
  });
  const { ref: nameRef, ...nameRest } = register('name', {
    required: true,
    value: props?.data?.id ? props?.data?.name : '',
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
            validateForm={true}
          >
            <ModalBody>
              <FormGroupCustom>
                <LabelCustom id="forms.name" required={true} />
                <Input {...nameRest} innerRef={nameRef} className="form-control" />
                <RequiredMessagesCustom formState={formState} register={"name"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="menu.schoolYear" required={true} />
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('schoolYearId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={schoolYearsList}
                  value={schoolYear}
                  onChange={(selectedOption) => {
                    setValue('schoolYearId', selectedOption?.key);
                    setSchoolYear(selectedOption);
                    trigger('schoolYearId');
                  }}
                />
                <RequiredMessagesCustom formState={formState} register={"schoolYearId"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="forms.startDate" required={true} />
                <DatePicker
                  {...register('startDate', { required: true })}
                  selected={startDate}
                  onChange={(date: any) => {
                    setValue('startDate', date as Date);
                    setStartDate(date as Date);
                    trigger('startDate');
                  }}
                />
                <RequiredMessagesCustom formState={formState} register={"startDate"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="forms.endDate" required={true} />
                <DatePicker
                  {...register('endDate', { required: true })}
                  selected={endDate}
                  onChange={(date: any) => {
                    setValue('endDate', date as Date);
                    setEndDate(date as Date);
                    trigger('endDate');
                  }}
                  minDate={startDate}
                  disabled={startDate == null}
                />
                <RequiredMessagesCustom formState={formState} register={"endDate"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="forms.weight" required={true} />
                <InputGroup>
                  <Input {...weightRest} innerRef={weightRef} className="form-control" type="number" step="1" min={1} max={100} />
                  <InputGroupText addonType="append">%</InputGroupText>
                </InputGroup>
                <RequiredMessagesCustom formState={formState} register={"weight"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="forms.sorting" required={true} />
                <Input {...orderRest} innerRef={orderRef} className="form-control" type="number" step="1" min={1} />
                <RequiredMessagesCustom formState={formState} register={"order"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="menu.ie" required={true} />
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('schoolId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={schoolList}
                  value={school}
                  isDisabled={true}
                />
              </FormGroupCustom>
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

const mapDispatchToProps = { ...academicPeriodActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicPeriodCreateEdit);
