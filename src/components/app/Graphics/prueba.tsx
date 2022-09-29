import { connect } from 'react-redux';
import * as graphicsStudentAcademicGradeActions from '../../../stores/actions/GraphicsStudentAcademicGradeActions';
import { Colxx } from '../../common/CustomBootstrap';

import React, { useEffect, useState } from 'react';

import { COLUMN_LIST } from '../../../constants/Graphics/studentListGradeConstants';
import DataList from '../../common/Data/DataList';
/* eslint-disable no-await-in-loop */
import { Loader } from '../../common/Loader';

const GraphicsStudentAcademicGrade = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);

  const [data, setData] = useState(null);
  useEffect(() => {
    let { roleMenus } = props.loginReducer;
    let submenus: any = [];
    roleMenus.map((c: any) => {
      return (submenus = submenus.concat(c.menuItemsLogin));
    });
    setCurrentMenu(
      submenus.find((c: any) => {
        return c?.module?.url == 'reset_password_permit';
      }),
    );

    props.dataGraphicsStudentAcademicGrade(props?.loginReducer?.schoolId).then((data: any) => {
      console.log(data);
    });

    props.dataGraphicsStudentAcademicGrade(props?.loginReducer?.schoolId).then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.grade = c.node ? c.node.name : '';
          c.node.students = c.node ? c.node.countStudent : '';
          c.node.percentage = c.node ? c.node.countStudent : '';
          return c;
        }),
      );
    });
  }, []);

  const getDataTable = async () => {
    props.dataGraphicsStudentAcademicGrade(props?.loginReducer?.schoolId).then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.grade = c.node ? c.node.name : '';
          c.node.students = c.node ? c.node.countStudent : '';
          c.node.percentage = c.node ? c.node.countStudent : '';
          return c;
        }),
      );
    });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  return (
    <>
      {' '}
      {dataTable !== null ? (
        <>
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
const mapDispatchToProps = { ...graphicsStudentAcademicGradeActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphicsStudentAcademicGrade);
