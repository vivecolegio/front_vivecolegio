import classnames from 'classnames';
import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { NavLink } from 'react-router-dom';
import { Badge, Card, CustomInput } from 'reactstrap';

import { Colxx } from '../../CustomBootstrap';

const ThumbListView = ({ item, isSelect, collect, onCheckItem }: any) => {
  return (
    <Colxx xxs="12" key={item.id} className="mb-3">
      <ContextMenuTrigger id={item.id} collect={collect}>
        <Card
          onClick={(event) => {
            return onCheckItem(event, item.id);
          }}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <NavLink to={`?p=${item.id}`} className="d-flex">
            <img
              alt={item.title}
              src={item.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${item.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">{item.title}</p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">{item.category}</p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">{item.date}</p>
              <div className="w-15 w-sm-100">
                <Badge color={item.statusColor} pill>
                  {item.status}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${item.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(ThumbListView);
