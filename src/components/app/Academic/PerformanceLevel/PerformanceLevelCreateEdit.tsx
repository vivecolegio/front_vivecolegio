import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../../constants/defaultValues';
import IntlMessages from '../../../../helpers/IntlMessages';
import * as performanceLevelAction from '../../../../stores/actions/Academic/PerformanceLevelActions';
import { Colxx } from '../../../common/CustomBootstrap';
import AddNewModal from '../../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../../common/Data/CreateEditAuditInformation';

const AreaCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [generalPerformancesLevelList, setGeneralPerformancesLevelList] = useState(null);
  const [schoolList, setSchoolList] = useState(null);
  const [generalPerformanceLevel, setGeneralPerformanceLevel] = useState(null);
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
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setGeneralPerformanceLevel(null);
    setSchool(null);
  };

  const getDropdowns = async () => {
    props.getDropdownsPerformanceLevel().then((data: any) => {
      setSchoolList(
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setGeneralPerformancesLevelList(
        data.dataGeneralPerformanceLevels.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: nameRef, ...nameRest } = register('name', {
    required: true,
    value: props?.data?.id ? props?.data?.name : '',
  });
  const { ref: minimumScoreRef, ...minimumScoreRest } = register('minimumScore', {
    required: true,
    value: props?.data?.id ? props?.data?.minimumScore : '',
  });
  const { ref: topScoreRef, ...topScoreRest } = register('topScore', {
    required: true,
    value: props?.data?.id ? props?.data?.topScore : '',
  });
  register('schoolId', {
    required: true,
    value: props?.data?.id ? props?.data?.schoolId : '',
  });
  register('generalPerformanceLevelId', {
    required: true,
    value: props?.data?.id ? props?.data?.generalPerformanceLevelId : '',
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
                  <IntlMessages id="forms.minimumScore" />
                </Label>
                <Input {...minimumScoreRest} innerRef={minimumScoreRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="forms.topScore" />
                </Label>
                <Input {...topScoreRest} innerRef={topScoreRef} className="form-control" />
              </div>
              <div className="form-group">
                <Label>
                  <IntlMessages id="menu.performanceLevel" />
                  {' - '}
                  <IntlMessages id="menu.general" />
                </Label>
                <Select
                  placeholder={<IntlMessages id="forms.select" />}
                  {...register('generalPerformanceLevelId', { required: true })}
                  className="react-select"
                  classNamePrefix="react-select"
                  options={generalPerformancesLevelList}
                  value={generalPerformanceLevel}
                  onChange={(selectedOption: any) => {
                    setValue('generalPerformanceLevelId', selectedOption?.key);
                    setGeneralPerformanceLevel(selectedOption);
                  }}
                />
              </div>
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

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaCreateEdit);
