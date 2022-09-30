import React, { useEffect, useState } from 'react';
/* eslint-disable no-await-in-loop */
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Select from 'react-select';

import { COLUMN_LIST } from '../../../constants/Graphics/studentListGradeConstants';
import * as graphicsStudentAcademicCourseActions from '../../../stores/actions/GraphicsStudentAcademicCourseActions';
import * as StudentActions from '../../../stores/actions/StudentActions';
import { Colxx } from '../../common/CustomBootstrap';
import DataList from '../../common/Data/DataList';
import FormGroupCustom from '../../common/Data/FormGroupCustom';
import LabelCustom from '../../common/Data/LabelCustom';
import { Loader } from '../../common/Loader';

const GraphicsStudentAcademicCourse = (props: any) => {
  const [gradeList, setGradesList] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [activeSecondTab, setActiveSecondTab] = useState('1');
  const [grade, setGrade] = useState(null);

  useEffect(() => {
    props.getDropdownsGraphicsStudentAcademicCourse(props?.loginReducer?.schoolId).then((data: any) => {
      setGradesList(
        data.dataGrades.edges.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  }, []);

  const getDataTable = async (schoolId: any, academicGradeId: any) => {
    props.dataGraphicsStudentAcademicCourse(schoolId, academicGradeId).then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.grade = c.node ? c.node.name : '';
          c.node.students = c.node ? c.node.countStudent : '';
          c.node.percentage = c.node ? c.node.countStudent * 100 + ' %' : '';
          return c;
        }),
      );
    });
  };

  const getCourses = async (academicGradeId: any) => {
    if (academicGradeId) {
      setDataTable(null);
      setGrade(academicGradeId)
      await getDataTable(props?.loginReducer?.schoolId, academicGradeId);
    }
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable(props?.loginReducer?.schoolId, grade);
  };

  return (
    <>
      {' '}
      <FormGroupCustom>
        <LabelCustom id="forms.grade" required={true} />
        <Select
          isClearable
          className="react-select"
          classNamePrefix="react-select"
          options={gradeList}
          value={grade}
          onChange={(selectedOption) => {
            getCourses(selectedOption?.key)
          }}
        />
      </FormGroupCustom>
      {dataTable !== null ? (
        <>
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <h1 className="font-bold">Grafica de Estudiantes por Grado</h1>
          </div>
          <DataList data={dataTable} columns={columns} refreshDataTable={refreshDataTable} />
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
const mapDispatchToProps = { ...graphicsStudentAcademicCourseActions, ...StudentActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphicsStudentAcademicCourse);
