/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { COLUMN_LIST } from '../../../constants/Student/studentConstants';
import * as courseActions from '../../../stores/actions/CourseActions';
import * as studentActions from '../../../stores/actions/StudentActions';
import { Colxx } from '../../common/CustomBootstrap';
import DataList from '../../common/Data/DataList';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';
import { Loader } from '../../common/Loader';
import StudentAddCourse from './StudentAddCourse';


const StudentCourseList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(null);

  let [params] = useSearchParams();
  const courseName = params.get('courseName');
  const gradeName = params.get('gradeName');
  const courseId = params.get('courseId');
  const gradeId = params.get('gradeId');
  const fromGrade = params.get('fromGrade');


  useEffect(() => {
    if (courseId) {
      props.dataCourse(courseId).then((listData: any) => {
        setData(listData);
        setDataTable(listData?.data?.students?.map((c: any) => {
          c.node = {};
          c.node.code = c?.code;
          c.node.id = c?.id;
          c.node.name = c?.user ? c?.user?.name : '';
          c.node.lastName = c?.user ? c?.user?.lastName : '';
          c.node.documentType_format = c?.user ? c?.user?.documentType?.name : '';
          c.node.documentNumber = c?.user ? c?.user?.documentNumber : '';
          c.node.gender_format = c?.user ? c?.user?.gender?.name : '';
          return c;
        }));
      });
    }
    if (fromGrade) {
      props.getListAllStudentAcademicGrade(props?.loginReducer?.schoolId, gradeId, props?.loginReducer?.schoolId).then((listData: any) => {
        setData(listData);
        setDataTable(listData?.data?.students?.map((c: any) => {
          c.node = {};
          c.node.code = c?.code;
          c.node.id = c?.id;
          c.node.name = c?.user ? c?.user?.name : '';
          c.node.lastName = c?.user ? c?.user?.lastName : '';
          c.node.documentType_format = c?.user ? c?.user?.documentType?.name : '';
          c.node.documentNumber = c?.user ? c?.user?.documentNumber : '';
          c.node.gender_format = c?.user ? c?.user?.gender?.name : '';
          return c;
        }));
      });
    }
  }, []);

  const getDataTable = async () => {
    if (courseId) {
      props.dataCourse(courseId).then((listData: any) => {
        setData(listData);
        setDataTable(listData?.data?.students?.map((c: any) => {
          c.node = {};
          c.node.code = c?.code;
          c.node.id = c?.id;
          c.node.name = c?.user ? c?.user?.name : '';
          c.node.lastName = c?.user ? c?.user?.lastName : '';
          c.node.documentType_format = c?.user ? c?.user?.documentType?.name : '';
          c.node.documentNumber = c?.user ? c?.user?.documentNumber : '';
          c.node.gender_format = c?.user ? c?.user?.gender?.name : '';
          return c;
        }));
      });
    }
    if (fromGrade) {
      props.getListAllStudentAcademicGrade(props?.loginReducer?.schoolId, gradeId, props?.loginReducer?.schoolId).then((listData: any) => {
        setData(listData);
        setDataTable(listData?.data?.students?.map((c: any) => {
          c.node = {};
          c.node.code = c?.code;
          c.node.id = c?.id;
          c.node.name = c?.user ? c?.user?.name : '';
          c.node.lastName = c?.user ? c?.user?.lastName : '';
          c.node.documentType_format = c?.user ? c?.user?.documentType?.name : '';
          c.node.documentNumber = c?.user ? c?.user?.documentNumber : '';
          c.node.gender_format = c?.user ? c?.user?.gender?.name : '';
          return c;
        }));
      });
    }
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {

  };

  const additionalFunction = async (item: any, btn: any) => {
    switch (btn?.action) {
      case 'goToChildrenRemove':
        removeStudent(item);
        break;
      default:
        break;
    }
  };

  const removeStudent = async (item: any) => {
    await props.updateStudent({ courseId: null }, item?.id).then(() => {
      refreshDataTable();
    });
  };

  return (
    <>
      {' '}
      {dataTable !== null ? (
        <>
          <div className='d-flex justify-content-between align-items-center'>
            {fromGrade ?
              <HeaderInfoAcademic generic={{ title: 'Grado', value: gradeName }} goTitle="Regresar a grados" />
              :
              <HeaderInfoAcademic generic={{ title: 'Grado / Curso', value: gradeName + ' / ' + courseName }} goTitle="Regresar a cursos" />
            }
            {!fromGrade ?
              <Button
                onClick={() => {
                  return setModalOpen(!modalOpen);
                }}
                color="green">
                <i className='iconsminds-add font-1rem mr-2' />
                Vincular Estudiante
              </Button> : ''}
          </div>
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
                label: 'Desvincular',
                color: 'danger',
                icon: 'iconsminds-close',
                action: 'goToChildrenRemove',
              },
            ]}
            withChildren={fromGrade ? false : true}
          />
          {!fromGrade ?
            <StudentAddCourse
              data={data}
              modalOpen={modalOpen}
              toggleModal={() => {
                return setModalOpen(!modalOpen);
              }}
              refreshDataTable={refreshDataTable}
              onSubmit={onSubmit}
            /> : ''}
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
const mapDispatchToProps = { ...courseActions, ...studentActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentCourseList);
