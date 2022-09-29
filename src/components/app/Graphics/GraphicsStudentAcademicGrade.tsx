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

	useEffect(() => {
		getDataChat(props?.loginReducer?.schoolId);
	}, []);

	useEffect(() => {
		if (dataChart) {
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
			series.labels.template.set("text", "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})");
			series.data.setAll(dataChart);
			series.appear(1000, 100);
		}
	}, [dataChart]);

	const getDataChat = async (schoolId: any) => {
		props.dataGraphicsStudentAcademicGrade(schoolId).then((listData: any) => {
			setDataChart(
				listData.map((c: any) => {
					return { category: c.node.name, value: c.node.countStudent };
				})
			);
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
