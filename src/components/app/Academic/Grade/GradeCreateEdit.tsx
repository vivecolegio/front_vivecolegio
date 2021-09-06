import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../../constants/defaultValues';
import IntlMessages from '../../../../helpers/IntlMessages';
import * as cycleActions from '../../../../stores/actions/GeneralAcademic/CycleActions';
import * as educationLevelActions from '../../../../stores/actions/EducationLevelActions';
import * as specialityActions from '../../../../stores/actions/SpecialityActions';
import * as schoolActions from '../../../../stores/actions/SchoolActions';
import * as gradeActions from '../../../../stores/actions/Academic/GradeActions';
import { Colxx } from '../../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../../common/Data/CreateEditAuditInformation'

const GradeCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [cyclesList, setCyclesList] = useState(null);
  const [educationLevelsList, setEducationLevelsList] = useState(null);
  const [specialitiesList, setSpecialitiesList] = useState(null);
  const [schoolsList, setSchoolsList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getCycles();
    getEducationLevels();
    getSchools();
    getSpecialities();
    if (props?.data?.id) {    
      if (props?.data?.generalAcademicCycle !== undefined && props?.data?.generalAcademicCycle != null) {
        setCycle({
          key: props?.data?.generalAcademicCycle?.id,
          label: props?.data?.generalAcademicCycle?.name,
          value: props?.data?.generalAcademicCycle?.id,
        });
      }
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
        });
      }
      if (props?.data?.educationLevel !== undefined && props?.data?.educationLevel != null) {
        setEducationLevel({
          key: props?.data?.educationLevel?.id,
          label: props?.data?.educationLevel?.name,
          value: props?.data?.educationLevel?.id,
        });
      }
      if (props?.data?.specialty !== undefined && props?.data?.specialty != null) {
        setSpeciality({
          key: props?.data?.specialty?.id,
          label: props?.data?.specialty?.name,
          value: props?.data?.specialty?.id,
        });
      }
    } else {
      methods.reset();
    }
    setLoading(false);
  }, [props?.data]);

  const getCycles = async () => {
    props.getListAllCycle().then((listData: any) => {
      setCyclesList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };
  const getSchools = async () => {
    props.getListAllSchool().then((listData: any) => {
      setSchoolsList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };
  const getSpecialities = async () => {
    props.getListAllSpeciality().then((listData: any) => {
      setSpecialitiesList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };
  const getEducationLevels = async () => {
    props.getListAllEducationLevel().then((listData: any) => {
      setEducationLevelsList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const data = {
    name:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),
    generalAcademicCycle:
      props?.data?.id ||
      props?.data?.generalAcademicCycle === methods.getValues('generalAcademicCycle')
        ? {
            value: props?.data?.generalAcademicCycle?.id,
            label: props?.data?.generalAcademicCycle?.name,
          }
        : methods.getValues('generalAcademicCycle'),
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [cycle, setCycle] = useState(null);
  const [school, setSchool] = useState(null);
  const [educationLevel, setEducationLevel] = useState(null);
  const [speciality, setSpeciality] = useState(null);

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
          <ModalBody>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.name" />
              </Label>
              <Input
                {...methods.register('name', { required: true })}
                name="name"
                defaultValue={data.name}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.cycleAcademic" />
              </Label>
              <Select
                 placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('generalAcademicCycleId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={cyclesList}
                value={cycle}
                onChange={(selectedOption) => {
                  methods.setValue('generalAcademicCycleId', selectedOption?.key);
                  setCycle(selectedOption);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.educationLevel" />
              </Label>
              <Select
                 placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('educationLevelId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={educationLevelsList}
                value={educationLevel}
                onChange={(selectedOption) => {
                  methods.setValue('educationLevelId', selectedOption?.key);
                  setEducationLevel(selectedOption);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.speciality" />
              </Label>
              <Select
                 placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('specialtyId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={specialitiesList}
                value={speciality}
                onChange={(selectedOption) => {
                  methods.setValue('specialtyId', selectedOption?.key);
                  setSpeciality(selectedOption);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.school" />
              </Label>
              <Select
                 placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('schoolId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={schoolsList}
                value={school}
                onChange={(selectedOption) => {
                  methods.setValue('schoolId', selectedOption?.key);
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
        </>
      )}
    </>
  );
};

const mapDispatchToProps = { ...gradeActions, ...cycleActions, ...educationLevelActions, ...specialityActions, ...schoolActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeCreateEdit);
