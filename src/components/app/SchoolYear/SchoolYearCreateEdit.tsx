import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';
import * as schoolYearActions from '../../../stores/actions/SchoolYearActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import FormGroupCustom from '../../common/Data/FormGroupCustom';
import LabelCustom from '../../common/Data/LabelCustom';
import RequiredMessagesCustom from '../../common/Data/RequiredMessagesCustom';
import { Loader } from '../../common/Loader';
import { permissionsMenu } from '../../../helpers/DataTransformations';

const SchoolYearCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [schoolList, setSchoolList] = useState(null);
  const [school, setSchool] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [schoolYearList, setSchoolYearList] = useState(null);

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
      if (props?.data?.startDate !== undefined && props?.data?.startDate != null) {
        setStartDate(new Date(props?.data?.startDate));
      }
      if (props?.data?.endDate !== undefined && props?.data?.endDate != null) {
        setEndDate(new Date(props?.data?.endDate));
      }
      register('schoolId', {
        required: true,
        value: props?.data?.id ? props?.data?.schoolId : '',
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
    props.getListAllSchoolYear(props?.loginReducer?.schoolId, false).then((data: any) => {
      setSchoolYearList(
        data.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });

    setSchoolList(
      [{
        key: props?.loginReducer?.schoolData?.id,
        label: props?.loginReducer?.schoolData?.name,
        value: props?.loginReducer?.schoolData?.id,
      }]
    );
  };

  const { ref: folioNumberRef, ...folioNumberRest } = register('folioNumber', {
    required: false,
    value: props?.data?.id ? props?.data?.folioNumber : '',
  });

  const { ref: schoolYearRef, ...schoolYearRest } = register('schoolYear', {
    required: true,
    value: props?.data?.id ? props?.data?.schoolYear : '',
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
            <ModalBody >
              <FormGroupCustom>
                <LabelCustom id="menu.schoolYear" required={true} />
                <Input {...schoolYearRest} innerRef={schoolYearRef} className="form-control" />
                <RequiredMessagesCustom formState={formState} register={"schoolYear"} />
              </FormGroupCustom>
              <FormGroupCustom>
                <LabelCustom id="forms.folioNumber" required={false} />
                <Input {...folioNumberRest} innerRef={folioNumberRef} className="form-control" />
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
                <LabelCustom id="menu.schoolYearImport" required={false} />
                <Select
                  isClearable
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('schoolYearId', { required: false })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={schoolList}
                  value={school}
                  isDisabled={true}
                />
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

const mapDispatchToProps = { ...schoolYearActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolYearCreateEdit);
