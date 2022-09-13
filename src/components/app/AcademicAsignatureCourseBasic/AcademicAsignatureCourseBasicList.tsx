import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { Button } from 'reactstrap';

import { COLUMN_LIST } from '../../../constants/AcademicAsignatureCourse/AcademicAsignatureCourseConstants';
import { createNotification } from '../../../helpers/Notification';
import * as academicIndicatorActions from '../../../stores/actions/AcademicAsignatureCourseActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import { Colxx } from '../../common/CustomBootstrap';
import DataList from '../../common/Data/DataList';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';
import { Loader } from '../../common/Loader';
import AcademicAsignatureCourseCreateEdit from './AcademicAsignatureCourseBasicCreateEdit';

const AcademicAsignatureCourseBasicList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMenuPermissionSpreadsheet, setCurrentMenuPermissionSpreadsheet] = useState(null);
  const [currentMenuPermissionExperienceLearning, setCurrentMenuPermissionExperienceLearning] = useState(null);
  const [teachersList, setTeachersList] = useState(null);
  const [teacher, setTeacher] = useState(null);

  let navigate = useNavigate();
  let [params] = useSearchParams();
  const courseId = params.get('courseId');
  const courseName = params.get('courseName');
  const currentUrl = location.pathname;
  const [data, setData] = useState(null);
  const [currentMenu, setCurrentMenu] = useState({
    createAction: false,
    deleteAction: false,
    updateAction: false,
    readAction: false,
    fullAccess: false,
    activateAction: false,
    inactiveAction: false,
  });

  useEffect(() => {
    let { roleMenus } = props.loginReducer;
    let submenus: any = [];
    roleMenus.map((c: any) => {
      return submenus = submenus.concat(c.menuItemsLogin);
    });
    setCurrentMenuPermissionSpreadsheet(submenus.find((c: any) => { return (c?.module?.url == 'see_valuations_asignature_course_permit') }));
    setCurrentMenuPermissionExperienceLearning(submenus.find((c: any) => { return (c?.module?.url == 'see_experience_learnig_asignature_course_permit') }));

    let cm = submenus.find((c: any) => { return (currentUrl === c?.module?.url) });
    if (cm && cm.readAction) {
      setCurrentMenu(cm);
    }


    props
      .getListAllAcademicAsignatureCourseByCourse(props?.loginReducer?.campusId, courseId)
      .then((listData: any) => {
        setDataTable(
          listData.map((c: any) => {
            c.node.course_format = c.node.course ? c.node.course.name : '';
            c.node.grade_format = c?.node?.course?.academicGrade?.name;
            c.node.asignature_format = c.node.academicAsignature
              ? c.node.academicAsignature.name
              : '';
            c.node.teacher_format = c.node.teacherId
              ? c.node.teacher?.user?.lastName + " " + c.node.teacher?.user?.name
              : '';
            return c;
          }),
        );
        props.dataCourse(courseId).then((data: any) => {
          let campusId = data?.data?.campus?.id;
          props.getDropdownsAcademicAsignatureCourse(props?.loginReducer?.schoolId, campusId, courseId).then((data: any) => {
            setTeachersList(
              data.dataTeachers.edges.map((c: any) => {
                return { label: `${c.node.user.name} ${c.node.user.lastName}`, value: c.node.id, key: c.node.id };
              }),
            );
          });
        });
      });
  }, []);

  const getDataTable = async () => {
    props
      .getListAllAcademicAsignatureCourseByCourse(props?.loginReducer?.campusId, courseId)
      .then((listData: any) => {
        setDataTable(
          listData.map((c: any) => {
            c.node.course_format = c.node.course ? c.node.course.name : '';
            c.node.grade_format = c?.node?.course?.academicGrade?.name;
            c.node.asignature_format = c.node.academicAsignature
              ? c.node.academicAsignature.name
              : '';
            c.node.teacher_format = c.node.teacherId
              ? c.node.teacher?.user?.lastName + " " + c.node.teacher?.user?.name
              : '';
            return c;
          }),
        );
        props.dataCourse(courseId).then((data: any) => {
          let campusId = data?.data?.campus?.id;
          props.getDropdownsAcademicAsignatureCourse(props?.loginReducer?.schoolId, campusId, courseId).then((data: any) => {
            setTeachersList(
              data.dataTeachers.edges.map((c: any) => {
                return { label: `${c.node.user.name} ${c.node.user.lastName}`, value: c.node.id, key: c.node.id };
              }),
            );
          });
        });
      });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    //console.log(dataForm);
    if (data === null) {
      await props.saveNewAcademicAsignatureCourse(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateAcademicAsignatureCourse(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataAcademicAsignatureCourse(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveAcademicAsignatureCourse(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteAcademicAsignatureCourse(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteUser(item.id, false).then(
        () => { },
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const changeActiveDataAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.changeActiveUser(!item.active, item.id, false).then(
        () => { },
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const setAll = async () => {
    setDataTable(null);
    for (const item of dataTable) {
      item.node.teacherId = teacher?.key;
      await props.updateAcademicAsignatureCourseTeacher({ teacherId: teacher?.key }, item?.node?.id).then(
        () => {
        },
        () => {
          createNotification('error', 'error', '');
        },
      );
    }
    createNotification('success', 'success', '');
    refreshDataTable();
  }

  const additionalFunction = async (item: any, btn: any) => {
    switch (btn?.action) {
      case 'goToChildrenStandard':
        goToChildren(
          `/standardAcademic?gradeId=${item?.course?.academicGradeId}&asignatureId=${item.academicAsignatureId}&academicAsignatureCourseId=${item?.id}`,
        );
        break;
      case 'goToChildrenDBA':
        goToChildren(
          `/dba?gradeId=${item?.course?.academicGrade?.generalAcademicGradeId}&asignatureId=${item.academicAsignature?.generalAcademicAsignatureId}&academicAsignatureCourseId=${item?.id}`,
        );
        break;
      case 'goToChildrenLearning':
        goToChildren(
          `/learning?gradeGeneralId=${item?.course?.academicGrade?.generalAcademicGradeId}&gradeId=${item?.course?.academicGradeId}&asignatureId=${item.academicAsignatureId}&asignatureGeneralId=${item.academicAsignature?.generalAcademicAsignatureId}&academicAsignatureCourseId=${item?.id}`,
        );
        break;
      case 'goToChildrenSpredsheet':
        goToChildren(
          `/spreadsheet?gradeId=${item?.course?.academicGradeId}&gradeName=${item?.course?.academicGrade?.name}&courseName=${item?.course?.name}&courseId=${item?.course?.id}&academicAsignatureCourseId=${item?.id}&asignatureId=${item.academicAsignatureId}&asignatureName=${item.academicAsignature?.name}`,
        );
        break;
      case 'goToChildrenExperienceLearning':
        goToChildren(
          `/experienceLearning?gradeId=${item?.course?.academicGradeId}&asignatureId=${item.academicAsignatureId}&academicAsignatureCourseId=${item?.id}`,
        );
        break;
      default:
        break;
    }
  };


  const goToChildren = async (url: string) => {
    navigate(url);
  };

  return (
    <>
      {' '}
      {dataTable !== null ? (
        <>
          <div className="d-flex justify-content-start align-items-center w-100">
            <div className="d-flex justify-content-start align-items-center w-100">
              <HeaderInfoAcademic generic={{ title: 'Curso', value: courseName }} goTitle="Regresar a cursos" />
            </div>
            {currentMenu?.updateAction && teachersList?.length > 0 ?
              <div className="d-flex justify-content-start align-items-center">
                <Select
                  isClearable
                  placeholder='Docente'
                  className="react-select"
                  classNamePrefix="react-select"
                  options={teachersList}
                  onChange={(selectedOption: any) => {
                    setTeacher(selectedOption);
                  }}
                />
                <Button
                  className="ml-2 btn-outline-info"
                  size="xs"
                  onClick={() => {
                    setAll();
                  }}
                  disabled={teachersList === null || teacher === null}
                >
                  Asignar a todos
                </Button>
              </div> : ""}
          </div>
          <DataList
            data={dataTable}
            columns={columns}
            match={props?.match}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            viewEditData={viewEditData}
            deleteData={deleteData}
            changeActiveData={changeActiveData}
            deleteAll={deleteAll}
            changeActiveDataAll={changeActiveDataAll}
            additionalFunction={additionalFunction}
            childrenButtons={[
              {
                id: 0,
                label: 'Planilla Valoración',
                color: 'info',
                icon: 'iconsminds-library',
                action: 'goToChildrenSpredsheet',
                hide: currentMenuPermissionSpreadsheet?.readAction ? false : true
              },
              {
                id: 1,
                label: 'Actividades de valoración',
                color: 'secondary',
                icon: 'iconsminds-blackboard',
                action: 'goToChildrenExperienceLearning',
                hide: currentMenuPermissionExperienceLearning?.readAction ? false : true
              },
              {
                id: 2,
                label: 'Planilla Nivelación',
                color: 'info',
                icon: 'iconsminds-library',
                action: 'goToChildrenSpredsheet',
                hide: currentMenuPermissionSpreadsheet?.readAction ? false : true
              },
              {
                id: 3,
                label: 'Actividades de nivelación',
                color: 'secondary',
                icon: 'iconsminds-blackboard',
                action: 'goToChildrenExperienceLearning',
                hide: currentMenuPermissionExperienceLearning?.readAction ? false : true
              },
            ]}
            withChildren={true}
            refreshDataTable={refreshDataTable}
          />
          <AcademicAsignatureCourseCreateEdit
            data={data}
            modalOpen={modalOpen}
            toggleModal={() => {
              setData(null);
              return setModalOpen(!modalOpen);
            }}
            onSubmit={onSubmit}
          />
        </>
      ) : (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader />
          </Colxx>
        </>
      )}
    </>
  );
};
const mapDispatchToProps = { ...academicIndicatorActions, ...courseActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicAsignatureCourseBasicList);
