import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as AcademicDayActions from '../../../stores/actions/AcademicDayActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import { Loader } from '../../common/Loader';

const AcademicDayCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [campusList, setCampusList] = useState(null);
  const [campus, setCampus] = useState(null);
  const [day, setDay] = useState(null);
  const [days, setDays] = useState([
    { label: 'LUNES', key: 'MONDAY', value: 'MONDAY' },
    { label: 'MARTES', key: 'TUESDAY', value: 'TUESDAY' },
    { label: 'MIERCOLES', key: 'WEDNESDAY', value: 'WEDNESDAY' },
    { label: 'JUEVES', key: 'THURSDAY', value: 'THURSDAY' },
    { label: 'VIERNES', key: 'FRIDAY', value: 'FRIDAY' },
    { label: 'SABADO', key: 'SATURDAY', value: 'SATURDAY' },
    { label: 'DOMINGO', key: 'SUNDAY', value: 'SUNDAY' },
  ]);

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
      if (props?.data?.day !== undefined && props?.data?.day != null) {
        setDay(props?.data?.day.map((c: any) => {
          return { label: c, value: c, key: c };
        }));
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
    props.getDropdownsAcademicDay(props?.loginReducer?.schoolId).then((data: any) => {
      setCampusList(
        data.dataCampus.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: nameRef, ...nameRest } = register('name', {
    required: true,
    value: props?.data?.id ? props?.data?.name : '',
  });
  register('campusId', {
    required: true,
    value: props?.data?.id ? props?.data?.campusId : '',
  });
  register('day', {
    required: true,
    value: props?.data?.id ? props?.data?.day : '',
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
                  <IntlMessages id="forms.workingDay" />
                </Label>
                <Select
                  isClearable
                  isMulti
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('day', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={days}
                  value={day}
                  onChange={(selectedOption) => {
                    setValue(
                      "day",
                      selectedOption.map((c: any) => {
                        return c.key;
                      }),
                    );
                    setDay(selectedOption);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.name" />
                </Label>
                <Input {...nameRest} innerRef={nameRef} className="form-control" />
              </div>
              {!props?.loginReducer?.campusId ? (
                <div className="form-group">
                  <Label>
                    <IntlMessages id="menu.campus" />
                  </Label>
                  <Select
                    isClearable
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
