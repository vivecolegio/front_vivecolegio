import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../common/CustomBootstrap';

class StudentListGradeBar extends Component {
  componentDidMount() {
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
        categoryField: 'country',
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
        categoryXField: 'country',
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

    // Set data
    let data = [
      {
        country: 'USA',
        value: 2025,
      },
      {
        country: 'China',
        value: 1882,
      },
      {
        country: 'Japan',
        value: 1809,
      },
      {
        country: 'Germany',
        value: 1322,
      },
      {
        country: 'UK',
        value: 1122,
      },
      {
        country: 'France',
        value: 1114,
      },
      {
        country: 'India',
        value: 984,
      },
      {
        country: 'Spain',
        value: 711,
      },
      {
        country: 'Netherlands',
        value: 665,
      },
      {
        country: 'South Korea',
        value: 443,
      },
      {
        country: 'Canada',
        value: 441,
      },
    ];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }

  render() {
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
  }
}

export default StudentListGradeBar;
