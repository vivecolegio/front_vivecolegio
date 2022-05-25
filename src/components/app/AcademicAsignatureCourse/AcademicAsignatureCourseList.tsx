import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { COLUMN_LIST } from '../../../constants/AcademicAsignatureCourse/AcademicAsignatureCourseConstants';
import { createNotification } from '../../../helpers/Notification';
import * as academicIndicatorActions from '../../../stores/actions/AcademicAsignatureCourseActions';
import DataList from '../../common/Data/DataList';
import AcademicAsignatureCourseCreateEdit from './AcademicAsignatureCourseCreateEdit';

const AcademicAsignatureCourseList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let navigate = useNavigate();

  const [data, setData] = useState(null);
  useEffect(() => {
    props
      .getListAllAcademicAsignatureCourse(props?.loginReducer?.campusId)
      .then((listData: any) => {
        setDataTable(
          listData.map((c: any) => {
            c.node.course_format = c.node.course ? c.node.course.name : '';
            c.node.grade_format = c?.node?.course?.academicGrade?.name;
            c.node.asignature_format = c.node.academicAsignature
              ? c.node.academicAsignature.name
              : '';
            return c;
          }),
        );
      });
  }, []);

  const getDataTable = async () => {
    props
      .getListAllAcademicAsignatureCourse(props?.loginReducer?.campusId)
      .then((listData: any) => {
        setDataTable(
          listData.map((c: any) => {
            c.node.course_format = c.node.course ? c.node.course.name : '';
            c.node.grade_format = c?.node?.course?.academicGrade?.name;
            c.node.asignature_format = c.node.academicAsignature
              ? c.node.academicAsignature.name
              : '';
            return c;
          }),
        );
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
        () => {},
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
        () => {},
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

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
                label: 'Estándares',
                color: 'secondary',
                icon: 'iconsminds-check',
                action: 'goToChildrenStandard',
              },
              {
                id: 1,
                label: 'DBA',
                color: 'info',
                icon: 'iconsminds-brain',
                action: 'goToChildrenDBA',
              },
              {
                id: 2,
                label: 'Aprendizaje',
                color: 'warning',
                icon: 'iconsminds-idea',
                action: 'goToChildrenLearning',
              },
            ]}
            withChildren={true}
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
        <></>
      )}
    </>
  );
};
const mapDispatchToProps = { ...academicIndicatorActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicAsignatureCourseList);
