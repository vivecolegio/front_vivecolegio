import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { COLUMN_LIST } from '../../../constants/Course/CourseConstants';
import * as courseActions from '../../../stores/actions/CourseActions';
import { Colxx } from '../../common/CustomBootstrap';
import DataList from '../../common/Data/DataList';
import { Loader } from '../../common/Loader';

const CoursesTeacherList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let navigate = useNavigate();


  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllCourseTeacher(props?.loginReducer?.teacherId,).then((listData: any) => {
      setDataTable(listData.map((c: any) => {
        c.node.teacher_format = c.node.teacher ? c?.node?.teacher?.user?.name + c?.node?.teacher?.user?.lastName : '';
        c.node.academicDay_format = c.node.academicDay ? c.node.academicDay.name : '';
        c.node.campus_format = c.node.campus ? c.node.campus.name : '';
        return c;
      }));
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllCourseTeacher(props?.loginReducer?.teacherId,).then((listData: any) => {
      setDataTable(listData.map((c: any) => {
        c.node.teacher_format = c.node.teacher ? c?.node?.teacher?.user?.name + c?.node?.teacher?.user?.lastName : '';
        c.node.academicDay_format = c.node.academicDay ? c.node.academicDay.name : '';
        c.node.campus_format = c.node.campus ? c.node.campus.name : '';
        return c;
      }));
    });
  };

  const additionalFunction = async (item: any, btn: any) => {
    console.log(item)
    switch (btn?.action) {
      case 'goToChildrenStudents':
        goToChildren(`/studentCourse?courseId=${item.id}&courseName=${item.name}&gradeName=${item?.academicGrade?.name}&gradeId=${item?.academicGrade?.id}`);
        break;
      default:
        break;
    }
  };

  const goToChildren = async (url: any) => {
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
            additionalFunction={additionalFunction}
            childrenButtons={[
              {
                id: 0,
                label: 'Estudiantes',
                color: 'info',
                icon: 'iconsminds-student-male-female',
                action: 'goToChildrenStudents',
              },
            ]}
            withChildren={true}
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
const mapDispatchToProps = { ...courseActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesTeacherList);
