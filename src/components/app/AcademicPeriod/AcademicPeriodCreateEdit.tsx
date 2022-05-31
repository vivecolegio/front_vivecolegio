import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as academicPeriodActions from '../../../stores/actions/AcademicPeriodActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
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
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
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
  register('startDate', {
    required: true,
    value: props?.data?.id ? props?.data?.startDate : '',
  });
  register('endDate', {
    required: true,
    value: props?.data?.id ? props?.data?.endDate : '',
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
                <Label>
                  <IntlMessages id="forms.weight" />
                </Label>
                <Input {...weightRest} innerRef={weightRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.sorting" />
                </Label>
                <Input {...orderRest} innerRef={orderRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.startDate" />
                </Label>
                <DatePicker
                  {...register('startDate', { required: true })}
                  selected={startDate}
                  onChange={(date: any) => {
                    setValue('startDate', date as Date);
                    setStartDate(date as Date);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.endDate" />
                </Label>
                <DatePicker
                  {...register('endDate', { required: true })}
                  selected={endDate}
                  onChange={(date: any) => {
                    setValue('endDate', date as Date);
                    setEndDate(date as Date);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.schoolYear" />
                </Label>
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
                  }}
                />
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

const mapDispatchToProps = { ...academicPeriodActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicPeriodCreateEdit);
