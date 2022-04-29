import React from 'react';
import { Card, CardBody } from 'reactstrap';

const GradientCard = ({
  icon = 'iconsminds-bell',
  title = 'title',
  detail = 'detail'
}) => {
  return (
    <Card className="progress-banner">
      <CardBody className="justify-content-between d-flex flex-row align-items-center">
        <div>
          <i
            className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
          />
          <div>
            <p className="lead text-white">{title}</p>
            <p className="text-small text-white">{detail}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default React.memo(GradientCard);
