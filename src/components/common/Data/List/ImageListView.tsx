import classnames from 'classnames';
import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { NavLink } from 'react-router-dom';
import { Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CustomInput, Row } from 'reactstrap';

import { Colxx } from '../../CustomBootstrap';

const ImageListView = ({ item, isSelect, collect, onCheckItem }:any) => {
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={item.id}>
      <ContextMenuTrigger id={item.id} collect={collect}>
        <Card
          onClick={(event) => {
            return onCheckItem(event, item.id);
          }}
          className={classnames({
            active: isSelect,
          })}
        >
          <div className="position-relative">
            <NavLink to={`?p=${item.id}`} className="w-40 w-sm-100">
              <CardImg top alt={item.title} src={item.img} />
            </NavLink>
            <Badge color={item.statusColor} pill className="position-absolute badge-top-left">
              {item.status}
            </Badge>
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="2">
                <CustomInput
                  className="item-check mb-0"
                  type="checkbox"
                  id={`check_${item.id}`}
                  checked={isSelect}
                  onChange={() => {}}
                  label=""
                />
              </Colxx>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle>{item.title}</CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {item.date}
                </CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(ImageListView);
