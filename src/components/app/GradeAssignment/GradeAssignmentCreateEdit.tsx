import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Input, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as asignatureActions from '../../../stores/actions/Academic/AsignatureActions';
import * as gradeActions from '../../../stores/actions/Academic/GradeActions';
import * as schoolActions from '../../../stores/actions/SchoolActions';
import * as GradeAssignmentActions from '../../../stores/actions/GradeAssignmentActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation'

const GradeAssignmentCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [gradesList, setGradesList] = useState(null);
  const [asignaturesList, setAsignaturesList] = useState(null);
  const [schoolsList, setSchoolsList] = useState(null);

  const methods = useFormContext();

  useEffect(() => {
    getAsignatures();
    getSchools();
    getGrades();
    if (props?.data?.id) {      
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
        });
      }
      if (props?.data?.academicAsignature !== undefined && props?.data?.academicAsignature != null) {
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
    } else {
      methods.reset();
    }
    setLoading(false);
  }, [props?.data]);

  const getSchools = async () => {
    props.getListAllSchool().then((listData: any) => {
      setSchoolsList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };
  const getAsignatures = async () => {
    props.getListAllAcademicAsignature().then((listData: any) => {
      setAsignaturesList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };
  const getGrades = async () => {
    props.getListAllGrade().then((listData: any) => {
      setGradesList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const data = {
    hourlyintensity:
      props?.data?.id || props?.data?.hourlyintensity === methods.getValues('hourlyintensity')
        ? props?.data?.hourlyintensity
        : methods.getValues('hourlyintensity'),  
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [school, setSchool] = useState(null);
  const [grade, setGrade] = useState(null);
  const [asignature, setAsignature] = useState(null);

  const handleChangeNumber = (event: any, name: any) => {
    methods.setValue(name, parseFloat(event.target.value));
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
          <ModalBody>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.hourlyIntensity" />
              </Label>
              <Input
                 onChange={(e) => {
                  return handleChangeNumber(e, 'hourlyintensity');
                }}
                name="hourlyintensity"
                defaultValue={data.hourlyintensity}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.asignature" />
              </Label>
              <Select
                 placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('academicAsignatureId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={asignaturesList}
                value={asignature}
                onChange={(selectedOption) => {
                  methods.setValue('academicAsignatureId', selectedOption?.key);
                  setAsignature(selectedOption);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.grade" />
              </Label>
              <Select
                 placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('academicGradeId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={gradesList}
                value={grade}
                onChange={(selectedOption) => {
                  methods.setValue('academicGradeId', selectedOption?.key);
                  setGrade(selectedOption);
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

const mapDispatchToProps = { ...GradeAssignmentActions, ...gradeActions, ...asignatureActions, ...schoolActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeAssignmentCreateEdit);
