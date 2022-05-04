import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { COLUMN_LIST } from '../../../constants/ClassroomPlan/ClassroomPlanConstants';
import { createNotification } from '../../../helpers/Notification';
import * as classroomPlanActions from '../../../stores/actions/ClassroomPlanActions';
import DataList from '../../common/Data/DataList';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';

const ClassroomPlanList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const academicAsignatureCourseId = params.get('academicAsignatureCourseId');
  const courseId = params.get('courseId');

  const [data, setData] = useState(null);
  useEffect(() => {
    props
      .getListAllClassroomPlan(academicAsignatureCourseId)
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
      .getListAllClassroomPlan(academicAsignatureCourseId)
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
    console.log(dataForm);
    if (data === null) {
      await props.saveNewClassroomPlan(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateClassroomPlan(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataClassroomPlan(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveClassroomPlan(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteClassroomPlan(id, true).then((formData: any) => {
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
      case 'goToChildren':
        goToChildren(
          `/classroomPlanDetail?id=${item?.id}&academicAsignatureCourseId=${academicAsignatureCourseId}&courseId=${courseId}`,
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
                label: 'Ver plan',
                color: 'info',
                icon: 'iconsminds-library',
                action: 'goToChildren',
              },              
            ]}
            withChildren={true}    
            header={
              <>
              <div className='d-flex align-items-center justify-content-between'>
                <HeaderInfoAcademic asignature grade course modality goTitle="Regresar" academicAsignatureCourseId={academicAsignatureCourseId} />
                <Button color="primary"  onClick={() => {return goToChildren( `/classroomPlanDetail?academicAsignatureCourseId=${academicAsignatureCourseId}&courseId=${courseId}`)}}>
                  <i className='iconsminds-add-file mr-2'></i>
                  Crear plan de aula
                </Button>
                </div>
              </>
            }      
          />          
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapDispatchToProps = { ...classroomPlanActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomPlanList);
