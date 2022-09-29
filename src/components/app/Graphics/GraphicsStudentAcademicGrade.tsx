import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { COLUMN_LIST } from '../../../constants/Graphics/studentListGradeConstants';
import * as graphicsStudentAcademicGradeActions from '../../../stores/actions/GraphicsStudentAcademicGradeActions';
import { Colxx } from '../../common/CustomBootstrap';
import DataList from '../../common/Data/DataList';
/* eslint-disable no-await-in-loop */
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardHeader, Nav, NavItem, Row, TabContent, TabPane } from 'reactstrap';
import { Loader } from '../../common/Loader';
import GraphicBarStudentGrade from './GraphicBarStudentGrade';
import GraphicDonutStudentGrade from './GraphicDonutStudentGrade';

const GraphicsStudentAcademicGrade = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [activeSecondTab, setActiveSecondTab] = useState('1');
  let Students: number;

  useEffect(() => {
    props.dataGraphicsStudentAcademicGrade(props?.loginReducer?.schoolId).then((listData: any) => {
      Students = listData.reduce((prev: any, next: any) => prev + next.node.countStudent, 0);
      setDataTable(
        listData.map((c: any) => {
          c.node.grade = c.node ? c.node.name : '';
          c.node.students = c.node ? c.node.countStudent : '';
          c.node.percentage = c.node
            ? ((c.node.countStudent * 100) / Students).toFixed(2) + ' %'
            : '';
          return c;
        }),
      );
    });
  }, []);

  const getDataTable = async () => {
    props.dataGraphicsStudentAcademicGrade(props?.loginReducer?.schoolId).then((listData: any) => {
      Students = listData.reduce((prev: any, next: any) => prev + next.node.countStudent, 0);
      setDataTable(
        listData.map((c: any) => {
          c.node.grade = c.node ? c.node.name : '';
          c.node.students = c.node ? c.node.countStudent : '';
          c.node.percentage = c.node
            ? ((c.node.countStudent * 100) / Students).toFixed(2) + ' %'
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

  return (
    <>
      {' '}
      {dataTable !== null ? (
        <>
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <h1 className="font-bold">Grafica de Estudiantes por Grado</h1>
          </div>
          <Colxx xxs="12" xs="12" lg="12">
            <Card className="mb-4">
              <CardHeader className="pl-0 pr-0">
                <Nav tabs className=" card-header-tabs  ml-0 mr-0">
                  <NavItem className="w-50 text-center">
                    <NavLink
                      to="#"
                      className={classnames({
                        active: activeSecondTab === '1',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveSecondTab('1');
                      }}
                    >
                      <div className="glyph-icon iconsminds-pie-chart-3"></div>
                    </NavLink>
                  </NavItem>
                  <NavItem className="w-50 text-center">
                    <NavLink
                      to="#"
                      className={classnames({
                        active: activeSecondTab === '2',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveSecondTab('2');
                      }}
                    >
                      <div className="glyph-icon iconsminds-bar-chart-4"></div>
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>

              <TabContent activeTab={activeSecondTab}>
                <TabPane tabId="1">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <GraphicDonutStudentGrade />
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                        <GraphicBarStudentGrade />
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
              </TabContent>
            </Card>
          </Colxx>
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
