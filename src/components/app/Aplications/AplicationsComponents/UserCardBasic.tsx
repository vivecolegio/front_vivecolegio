import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardText } from 'reactstrap';
import { getInitialsName } from '../../../../helpers/Utils';
import ThumbnailImage from '../AplicationsComponents/ThumbnailImage';

const UserCardBasic = ({ link = '#', data }: any) => {
  
  const [itemSelected, setItemSelected] = useState(null);

  return (
    <Card className="d-flex flex-row mb-4 w-340" onClick={() => {
        setItemSelected(data.key);
        console.log(itemSelected)
      }}>
      <NavLink to={link} className="d-flex">
        {/* <ThumbnailImage rounded small src={data.thumb} alt="profile" className="m-4" /> */}
        <span className="img-thumbnail border-0 span-initials m-4 rounded-circle mr-3 list-thumbnail align-self-center xsmall">{getInitialsName(data.name)}</span>
      </NavLink>
      <div className=" d-flex flex-grow-1 min-width-zero">
        <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
          <div className="min-width-zero">
            <NavLink to={link}>
              <CardSubtitle className="truncate mb-1">{data.name}</CardSubtitle>
            </NavLink>
            <CardText className="text-muted text-small mb-2">{data.status}</CardText>
          </div>
        </CardBody>
      </div>
      <div className="p-2">
        <p className="lead font-bold text-info">0{data.key}</p>
      </div>
      {itemSelected == data.key ? (
        <>
          <span className="line-right"></span>
          <span className="line-left"></span>
        </>
      ) : (
        ''
      )}
    </Card>
  );
};

export default React.memo(UserCardBasic);
