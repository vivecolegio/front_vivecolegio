import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CardTitle, Row } from 'reactstrap';
import * as graphicsStudentAcademicGradeActions from '../../../stores/actions/GraphicsStudentAcademicGradeActions';
import { Colxx } from '../../common/CustomBootstrap';

const GraphicsStudentAcademicGrade = (props: any) => {
  const [dataChart, setDataChart] = useState(null);
  let ChartData = [
    { value: 15, category: 'Primero' },
    { value: 12, category: 'Segundo' },
    { value: 16, category: 'Tercero' },
    { value: 25, category: 'Cuarto' },
    { value: 24, category: 'Quinto' },
    { value: 32, category: 'Sexto' },
    { value: 11, category: 'Septimo' },
    { value: 14, category: 'Octavo' },
    { value: 22, category: 'Noveno' },
    { value: 29, category: 'Decimo' },
    { value: 10, category: 'Undecimo' },
  ];
  useEffect(() => {
    getDataChat(props?.loginReducer?.schoolId);
    let root = am5.Root.new('chartdiv');
    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      }),
    );
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'category',
      }),
    );
    // console.log(dataChart);
    // console.log(ChartData);
    series.data.setAll(ChartData);

    series.appear(1000, 100);
  }, []);

  const getDataChat = async (schoolId: any) => {
    props.dataGraphicsStudentAcademicGrade(schoolId).then((listData: any) => {
      console.log(listData);
      setDataChart(
        listData.map((c: any) => {
          return { category: c.node.name, value: c.node.countStudent };
        }),
      );
      //   listData.map((c: any) => {
      //     const a1 = {
      //       value: c.node ? c.node.countStudent : '',
      //       category: c.node ? c.node.name : '',
      //     };
      //     ChartData.push(a1);
      //     return c;
      //   });
    });
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <CardTitle className="mb-4">
            <h1>Listado alumnos</h1>
          </CardTitle>
          <Row className="icon-cards-row mb-2">
            <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};
const mapDispatchToProps = { ...graphicsStudentAcademicGradeActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphicsStudentAcademicGrade);
