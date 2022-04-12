import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import {
  Button,
  Input,
  InputGroup,
  Label,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as StudentActions from '../../../stores/actions/StudentActions';
import { Colxx } from '../../common/CustomBootstrap';
import AddNewModal from '../../common/Data/AddNewModal';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import { Loader } from '../../common/Loader';

const StudentCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('student');
  const [searchValue, setSearchValue] = useState('');
  const [guardianList, setGuardianList] = useState([]);
  const [guardian, setGuardian] = useState(null);
  const [documentTypeGuardian, setDocumentTypeGuardian] = useState(null);
  const [schoolsList, setSchoolsList] = useState(null);
  const [campusList, setCampusList] = useState(null);
  const [school, setSchool] = useState(null);
  const [campus, setCampus] = useState(null);
  const [rolesList, setRolesList] = useState(null);
  const [documentTypesList, setDocumentTypesList] = useState(null);
  const [gendersList, setGendersList] = useState(null);
  const [gradeList, setGradesList] = useState(null);
  const [courseList, setCourseList] = useState(null);
  const [birtdate, setBirtdate] = useState(null);
  const [role, setRole] = useState(null);
  const [gender, setGender] = useState(null);
  const [grade, setGrade] = useState(null);
  const [course, setCourse] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [newUser, setNewUser] = useState({
    name: null,
    lastName: null,
    phone: null,
    email: null,
    documentNumber: null,
    password: null,
    username: null,
    genderId: null,
    documentTypeId: null,
    roleId: null,
  });

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, reset, setValue, getValues } = methods;

  useEffect(() => {
    cleanForm();
    getDropdowns(props?.loginReducer?.schoolId);
    if (props?.data?.id) {
      if (props?.data?.school !== undefined && props?.data?.school != null) {
        setSchool({
          key: props?.data?.school?.id,
          label: props?.data?.school?.name,
          value: props?.data?.school?.id,
        });
      }
      if (props?.data?.campus !== undefined && props?.data?.campus != null) {
        setCampus({
          key: props?.data?.campus.id,
          label: props?.data?.campus.name,
          value: props?.data?.campus.id,
        });
      }
      if (props?.data?.academicGrade !== undefined && props?.data?.academicGrade != null) {
        setGrade({
          key: props?.data?.academicGrade.id,
          label: props?.data?.academicGrade.name,
          value: props?.data?.academicGrade.id,
        });
      }
      if (props?.data?.course !== undefined && props?.data?.course != null) {
        setCourse({
          key: props?.data?.course.id,
          label: props?.data?.course.name,
          value: props?.data?.course.id,
        });
      }
      if (props?.data?.user !== undefined && props?.data?.user != null) {
        setNewUser({
          name: props?.data?.user?.name,
          lastName: props?.data?.user?.lastName,
          phone: props?.data?.user?.phone,
          email: props?.data?.user?.email,
          documentNumber: props?.data?.user?.documentNumber,
          password: props?.data?.user?.password,
          username: props?.data?.user?.username,
          genderId: props?.data?.user?.genderId,
          documentTypeId: props?.data?.user?.documentTypeId,
          roleId: props?.data?.user?.roleId,
        });
      }
      if (
        props?.data?.user &&
        props?.data?.user?.birthdate !== undefined &&
        props?.data?.user?.birthdate != null
      ) {
        setBirtdate(new Date(props?.data?.user?.birthdate));
      }
      if (
        props?.data?.user &&
        props?.data?.user?.role !== undefined &&
        props?.data?.user?.role != null
      ) {
        setRole({
          key: props?.data?.user?.role?.id,
          label: props?.data?.user?.role?.name,
          value: props?.data?.user?.role?.id,
        });
      }
      if (
        props?.data?.user &&
        props?.data?.user?.gender !== undefined &&
        props?.data?.user?.gender != null
      ) {
        setGender({
          key: props?.data?.user?.gender?.id,
          label: props?.data?.user?.gender?.name,
          value: props?.data?.user?.gender?.id,
        });
      }
      if (
        props?.data?.user &&
        props?.data?.user?.documentType !== undefined &&
        props?.data?.user?.documentType != null
      ) {
        setDocumentType({
          key: props?.data?.user?.documentType?.id,
          label: props?.data?.user?.documentType?.name,
          value: props?.data?.user?.documentType?.id,
        });
      }
    }
    setLoading(false);
  }, [props?.data]);

  const cleanForm = async () => {
    reset();
    setSchool(null);
    setCampus(null);
    setNewUser({
      name: null,
      lastName: null,
      phone: null,
      email: null,
      documentNumber: null,
      password: null,
      username: null,
      genderId: null,
      documentTypeId: null,
      roleId: null,
    });
    setBirtdate(null);
    setRole(null);
    setGender(null);
    setDocumentType(null);
    setSearchValue('');
    setDocumentTypeGuardian(null);
    setGuardian(null);
    setCourse(null);
    setGrade(null);
    setActiveTab('student');
    if (props?.loginReducer?.campusId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('campusId', {
        required: true,
        value: props?.loginReducer?.campusId,
      });
    }
    if (props?.loginReducer?.schoolId && !props?.data?.id) {
      // set value when register is new and sesion contains value
      register('schoolId', {
        required: true,
        value: props?.loginReducer?.schoolId,
      });
    }
  };

  const getDropdowns = async (schoolId: any) => {
    props.getDropdownsStudent('Student', schoolId).then((data: any) => {
      setSchoolsList(
        data.dataSchools.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setCampusList(
        data.dataCampus.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setRolesList(
        data.dataRoles.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setGendersList(
        data.dataGenders.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
      setDocumentTypesList(
        data.dataDocumentTypes.edges.map((c: any) => {
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

  const getCourses = async (academicGradeId: any) => {
    props.getCoursesOfGrade(academicGradeId, props?.loginReducer?.campusId).then((data: any) => {
      setCourseList(
        data.dataCourses.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const { ref: codeRef, ...codeRest } = register('code', {
    required: true,
    value: props?.data?.id ? props?.data?.code : '',
  });
  register('schoolId', {
    required: true,
    value: props?.data?.id ? props?.data?.schoolId : '',
  });
  register('campusId', {
    required: true,
    value: props?.data?.id ? props?.data?.campusId : '',
  });
  register('academicGradeId', {
    required: true,
    value: props?.data?.id ? props?.data?.academicGradeId : '',
  });
  register('courseId', {
    required: true,
    value: props?.data?.id ? props?.data?.courseId : '',
  });
  register('newUser', {
    required: true,
    value: newUser,
  });

  const searchGuardianList = async () => {
    props.getGuardianByCriteria(searchValue, documentTypeGuardian?.key).then((data: any) => {
      setGuardianList(
        data.data.edges.map((c: any) => {
          return { label: c?.node?.user?.name, value: c?.node?.user?.id, key: c?.node?.user?.id };
        }),
      );
      setSearchValue('');
      setGuardian(guardianList[0]);
    });
  };

  const associateGuardianStudent = async () => {
    const body = {
      studentsId: [props?.data?.id],
    };
    props.associateGuardian(body, guardian?.key).then((data: any) => {
      props.toggleModal();
    });
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByStudent: props?.data?.id ? props?.data?.createdByStudent : null,
    updatedByStudent: props?.data?.id ? props?.data?.updatedByStudent : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  return (
    <>
      {loading ? (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader/>
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
            hideFooter={activeTab === 'student' ? false : true}
          >
            <ModalBody>
              <Nav tabs className="separator-tabs ml-0 mb-5">
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === 'student',
                      'nav-link': true,
                      'text-uppercase': true,
                    })}
                    onClick={() => {
                      setActiveTab('student');
                    }}
                    to="#"
                  >
                    <IntlMessages id="menu.student" />
                  </NavLink>
                </NavItem>
                {props?.data?.id ? (
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: activeTab === 'guardian',
                        'nav-link': true,
                        'text-uppercase': true,
                      })}
                      onClick={() => {
                        setActiveTab('guardian');
                      }}
                      to="#"
                    >
                      <IntlMessages id="menu.assignGuardian" />
                    </NavLink>
                  </NavItem>
                ) : (
                  ''
                )}
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="student">
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.name" />
                    </Label>
                    <Input
                      name="name"
                      defaultValue={newUser.name}
                      onChange={(data) => {
                        setValue('newUser', { ...newUser });
                        setNewUser({ ...newUser, ...{ name: data.target.value } });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.code" />
                    </Label>
                    <Input {...codeRest} innerRef={codeRef} className="form-control" />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.lastname" />
                    </Label>
                    <Input
                      name="lastName"
                      defaultValue={newUser.lastName}
                      onChange={(data) => {
                        setValue('newUser', { ...newUser });
                        setNewUser({ ...newUser, ...{ lastName: data.target.value } });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.phone" />
                    </Label>
                    <Input
                      name="phone"
                      defaultValue={newUser.phone}
                      onChange={(data) => {
                        setValue('newUser', { ...newUser });
                        setNewUser({ ...newUser, ...{ phone: data.target.value } });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.email" />
                    </Label>
                    <Input
                      name="email"
                      defaultValue={newUser.email}
                      onChange={(data) => {
                        setValue('newUser', { ...newUser });
                        setNewUser({ ...newUser, ...{ email: data.target.value } });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.birthdate" />
                    </Label>
                    <ReactDatePicker
                      selected={birtdate}
                      onChange={(date) => {
                        setValue('newUser', { ...newUser });
                        setNewUser({ ...newUser, ...{ birthdate: date as Date } });
                        setBirtdate(date as Date);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.user" />
                    </Label>
                    <Input
                      name="username"
                      defaultValue={newUser.username}
                      onChange={(data) => {
                        setValue('newUser', { ...newUser });
                        setNewUser({ ...newUser, ...{ username: data.target.value } });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Input
                      name="password"
                      defaultValue={newUser.password}
                      onChange={(data) => {
                        setValue('newUser', { ...newUser });
                        setNewUser({ ...newUser, ...{ password: data.target.value } });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.role" />
                    </Label>
                    <Select
                      placeholder={<IntlMessages id="forms.select" />}
                      className="react-select"
                      classNamePrefix="react-select"
                      options={rolesList}
                      value={role}
                      onChange={(selectedOption) => {
                        newUser.roleId = selectedOption?.key;
                        setValue('newUser', { ...newUser });
                        setRole(selectedOption);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.gender" />
                    </Label>
                    <Select
                      placeholder={<IntlMessages id="forms.select" />}
                      className="react-select"
                      classNamePrefix="react-select"
                      options={gendersList}
                      value={gender}
                      onChange={(selectedOption) => {
                        newUser.genderId = selectedOption?.key;
                        setValue('newUser', { ...newUser });
                        setGender(selectedOption);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.documentType" />
                    </Label>
                    <Select
                      placeholder={<IntlMessages id="forms.select" />}
                      className="react-select"
                      classNamePrefix="react-select"
                      options={documentTypesList}
                      value={documentType}
                      onChange={(selectedOption) => {
                        newUser.documentTypeId = selectedOption?.key;
                        setValue('newUser', { ...newUser });
                        setDocumentType(selectedOption);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.documentNumber" />
                    </Label>
                    <Input
                      name="documentNumber"
                      defaultValue={newUser.documentNumber}
                      onChange={(data) => {
                        setValue('newUser', { ...newUser });
                        setNewUser({ ...newUser, ...{ documentNumber: data.target.value } });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.grade" />
                    </Label>
                    <Select
                      placeholder={<IntlMessages id="forms.select" />}
                      {...register('academicGradeId', { required: true })}
                      className="react-select"
                      classNamePrefix="react-select"
                      options={gradeList}
                      value={grade}
                      onChange={(selectedOption) => {
                        setValue('academicGradeId', selectedOption?.key);
                        setGrade(selectedOption);
                        getCourses(selectedOption?.key);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.course" />
                    </Label>
                    <Select
                      placeholder={<IntlMessages id="forms.select" />}
                      {...register('courseId', { required: true })}
                      className="react-select"
                      classNamePrefix="react-select"
                      options={courseList}
                      value={course}
                      onChange={(selectedOption) => {
                        setValue('courseId', selectedOption?.key);
                        setCourse(selectedOption);
                      }}
                    />
                  </div>
                  {!props?.loginReducer?.schoolId ? (
                    <div className="form-group">
                      <Label>
                        <IntlMessages id="menu.school" />
                      </Label>
                      <Select
                        placeholder={<IntlMessages id="forms.select" />}
                        {...register('schoolId', { required: true })}
                        className="react-select"
                        classNamePrefix="react-select"
                        options={schoolsList}
                        value={school}
                        onChange={(selectedOption) => {
                          setValue('schoolId', [selectedOption?.key]);
                          setSchool(selectedOption);
                          getDropdowns(selectedOption?.key);
                        }}
                      />
                    </div>
                  ) : (
                    ''
                  )}
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
                          setValue('campusId', [selectedOption?.key]);
                          setCampus(selectedOption);
                          getDropdowns(selectedOption?.key);
                        }}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </TabPane>
                <TabPane tabId="guardian">
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.documentType" />
                    </Label>
                    <Select
                      placeholder={<IntlMessages id="forms.select" />}
                      className="react-select"
                      classNamePrefix="react-select"
                      options={documentTypesList}
                      value={documentTypeGuardian}
                      onChange={(selectedOption) => {
                        setDocumentTypeGuardian(selectedOption);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <Label>
                      <IntlMessages id="forms.guardian" />
                    </Label>
                    <InputGroup className="input-group-prepend">
                      <Select
                        placeholder={<IntlMessages id="forms.select" />}
                        className="react-select w-80"
                        classNamePrefix="react-select"
                        options={guardianList}
                        value={guardian}
                        inputValue={searchValue}
                        onChange={(selectedOption) => {
                          setGuardian(selectedOption);
                        }}
                        onInputChange={(e, action) => {
                          if (action?.action === 'input-blur' || action?.action === 'menu-close') {
                            setSearchValue(action.prevInputValue);
                          } else {
                            setSearchValue(e);
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          return searchGuardianList();
                        }}
                        color="primary"
                        size="xs"
                      >
                        <IntlMessages id="forms.search" />
                      </Button>
                    </InputGroup>
                  </div>
                  <div className="form-group text-center">
                    <Button
                      onClick={() => {
                        return associateGuardianStudent();
                      }}
                      disabled={!guardian}
                      color="primary"
                      size="md"
                    >
                      <IntlMessages id="menu.assignGuardian" />
                    </Button>
                  </div>
                </TabPane>
              </TabContent>
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
  ...StudentActions,
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreateEdit);
