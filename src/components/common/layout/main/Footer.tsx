import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Colxx } from '../../../common/CustomBootstrap';
import ProfileImg from '../../../../assets/logos/black.png';
import SingleLightbox from '../pages/SingleLightbox';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="12" sm="6">
              
            </Colxx>
            <Colxx className="col-sm-6 d-none d-sm-block">
              <ul className="breadcrumb pt-0 pr-0 float-right">
                <li className="breadcrumb-item mb-0">
                  <img alt="LOGO" src={ProfileImg} />
                </li>
                <li className="breadcrumb-item mb-0">
                  <img alt="LOGO" src={ProfileImg} /> 
                </li>               
              </ul>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
