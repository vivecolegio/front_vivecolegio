import React from 'react';
import { Row } from 'reactstrap';
import FooterImg1 from '../../../../assets/img/logos/mintic.png';
import FooterImg2 from '../../../../assets/img/logos/minciencias.png';
import { Colxx } from '../../../common/CustomBootstrap';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="12" sm="5" lg="5"></Colxx>
            <Colxx xxs="12" sm="7" lg="7" className="d-none d-sm-block">
              <ul className="breadcrumb pt-0 pr-0 float-right">
                <li className="breadcrumb-item mb-0">
                  <img alt="LOGO" src={FooterImg1} />
                </li>
                <li className="breadcrumb-item mb-0">
                  <img alt="LOGO" src={FooterImg2} />
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
