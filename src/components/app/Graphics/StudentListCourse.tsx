import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { COLUMN_LIST } from '../../../constants/Graphics/studentListGradeConstants';
import * as studentActions from '../../../stores/actions/StudentListActions';
import * as userActions from '../../../stores/actions/UserActions';
import { Colxx } from '../../common/CustomBootstrap';
import DataList from '../../common/Data/DataList';
/* eslint-disable no-await-in-loop */
import { Loader } from '../../common/Loader';
import GraphicsStudentAcademicGrade from './GraphicsStudentAcademicGrade';

const StudentList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
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

    props
      .getListAllStudent(props?.loginReducer?.campusId, props?.loginReducer?.schoolId)
      .then((listData: any) => {
        setDataTable(
          listData.map((c: any) => {
            c.node.grade = c.node.user ? c.node.user.name : '';
            c.node.students = c.node.user ? c.node.user.lastName : '';
            c.node.percentage = c?.node?.user ? c?.node?.user?.documentType?.name : '';
            return c;
          }),
        );
      });
  }, []);

  const getDataTable = async () => {
    props
      .getListAllStudent(props?.loginReducer?.campusId, props?.loginReducer?.schoolId)
      .then((listData: any) => {
        setDataTable(
          listData.map((c: any) => {
            c.node.grade = c.node.user ? c.node.user.name : '';
            c.node.students = c.node.user ? c.node.user.lastName : '';
            c.node.percentage = c?.node?.user ? c?.node?.user?.documentType?.name : '';
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
          <GraphicsStudentAcademicGrade />
          <DataList
            data={dataTable}
            columns={columns}
            match={props?.match}
            childrenButtons={[{}]}
            refreshDataTable={refreshDataTable}
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
const mapDispatchToProps = { ...studentActions, ...userActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
