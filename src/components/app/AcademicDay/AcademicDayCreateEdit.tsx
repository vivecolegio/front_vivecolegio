import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as AcademicDayActions from '../../../stores/actions/AcademicDayActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const AcademicDayCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [campusList, setCampusList] = useState(null);
  const [campus, setCampus] = useState(null);

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, reset, setValue, getValues } = methods;

  useEffect(() => {
    cleanForm();
    getDropdowns();
    if (props?.data?.id) {
      if (props?.data?.campus !== undefined && props?.data?.campus != null) {
        setCampus({
          key: props?.data?.campus?.id,
          label: props?.data?.campus?.name,
          value: props?.data?.campus?.id,
        });
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setCampus(null);
    if (props?.loginReducer?.campusId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('campusId', {
        required: true,
        value: props?.loginReducer?.campusId,
      });
    }
  };

  const getDropdowns = async () => {
    props.getDropdownsAcademicDay().then((data: any) => {
      setCampusList(
        data.dataCampus.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: typeDayRef, ...typeDayRest } = register('typeDay', {
    required: true,
    value: props?.data?.id ? props?.data?.typeDay : '',
  });
  const { ref: workingDayRef, ...workingDayRest } = register('workingDay', {
    required: true,
    value: props?.data?.id ? props?.data?.workingDay : '',
  });
  register('campusId', {
    required: true,
    value: props?.data?.id ? props?.data?.campusId : '',
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
                  <IntlMessages id="forms.workingDay" />
                </Label>
                <Input {...workingDayRest} innerRef={workingDayRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.type" />
                </Label>
                <Input {...typeDayRest} innerRef={typeDayRef} className="form-control" />
              </div>
              {!props?.loginReducer?.campusId ? (
                <div className="form-group">
                  <Label>
                    <IntlMessages id="menu.campus" />
                  </Label>
                  <Select
                    placeholder={<IntlMessages id="forms.select" />}
                    {...register('campusId', { required: true })}
                    className="react-select"
                    classNamePrefix="react-select"
                    options={campusList}
                    value={campus}
                    onChange={(selectedOption) => {
                      setValue('campusId', selectedOption?.key);
                      setCampus(selectedOption);
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

const mapDispatchToProps = { ...AcademicDayActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicDayCreateEdit);
