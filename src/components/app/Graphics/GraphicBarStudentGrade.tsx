import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import * as graphicsStudentAcademicGradeActions from '../../../stores/actions/GraphicsStudentAcademicGradeActions';
import { Colxx } from '../../common/CustomBootstrap';

const GraphicBarStudentGrade = (props: any) => {
  const [dataChart, setDataChart] = useState(null);

  useEffect(() => {
    getDataChat(props?.loginReducer?.schoolId);
  }, []);

  useEffect(() => {
    if (dataChart) {
      let root = am5.Root.new('chartdivBar');

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: 'panX',
          wheelY: 'zoomX',
          pinchZoomX: true,
        }),
      );

      let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
      cursor.lineY.set('visible', false);

      let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
      });

      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0.3,
          categoryField: 'category',
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        }),
      );

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.3,
          renderer: am5xy.AxisRendererY.new(root, {}),
        }),
      );

      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: 'Series 1',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          sequencedInterpolation: true,
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueY}',
          }),
        }),
      );

      series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
      series.columns.template.adapters.add('fill', function (fill, target) {
        return chart.get('colors').getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add('stroke', function (stroke, target) {
        return chart.get('colors').getIndex(series.columns.indexOf(target));
      });

      xAxis.data.setAll(dataChart);
      series.data.setAll(dataChart);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/

      series.data.setAll(dataChart);
      series.appear(1000);
      chart.appear(1000, 100);
    }
  }, [dataChart]);

  const getDataChat = async (schoolId: any) => {
    props.dataGraphicsStudentAcademicGrade(schoolId).then((listData: any) => {
      setDataChart(
        listData.map((c: any) => {
          return { category: c.node.name, value: c.node.countStudent };
        }),
      );
    });
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Row className="icon-cards-row mb-2">
            <div id="chartdivBar" style={{ width: '100%', height: '500px' }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GraphicBarStudentGrade);
