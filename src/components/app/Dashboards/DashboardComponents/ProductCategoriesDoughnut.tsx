import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from '../../../../helpers/IntlMessages';
import { DoughnutChart } from '../../Charts/index';

import { doughnutChartData } from '../../../../stores/data/charts';

const ProductCategoriesDoughnut = () => {
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.product-categories" />
        </CardTitle>
        <div className="dashboard-donut-chart">
          <DoughnutChart shadow data={doughnutChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCategoriesDoughnut;
