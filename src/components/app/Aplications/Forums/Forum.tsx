import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Colxx } from '../../../common/CustomBootstrap';
import CommentWithLikes from '../AplicationsComponents/CommentWithLikes';

const ForumApp = (props: any) => {
  const [activeTab, setActiveTab] = useState('details');

  let navigate = useNavigate();

  useEffect(() => {}, []);

  const comments = [
    {
      title: '(kA+mB)t=kAt+mBt Entonces prueba: 1) Si A,B son simétricas kA+mB, ∀k,m∈R es simétrica.Comienza:(kA+mB)t=kAt+mBt= 2) Si kA+mB, ∀k,m∈R e  simétrica entonces A,B son simétricas.Basta con tomar k=1,m=0 y k=0,m=1.',
      detail: 'Natali Gamboa | 17.09.2018 - 04:45',
      thumb: '/assets/img/profiles/l-1.jpg',
      rate: 5,
      key: 0,
      sender: 'Natali Gamboa'
    },
    {
      title: 'gracias por responder, pero por favor, puedes terminar la demostración? De verdad que no entiendo cómo concluir.',
      detail: 'Juan Jose Arias | 15.08.2018 - 01:18',
      thumb: '/assets/img/profiles/l-2.jpg',
      rate: 4,
      key: 1,
      sender: 'Juan Jose Arias'
    },
    {
      title: '(kA+mB)t=kAt+mBt=kA+mB',
      detail: 'William Delgado | 26.07.2018 - 11:14',
      thumb: '/assets/img/profiles/l-3.jpg',
      rate: 5,
      key: 2,
      sender: 'William Delgado'
    },
    {
      title: 'demostrar que V=Vt, para eso se tiene que A=At y B=Bt y a la propiedad asociativa luego V=kA+mB=kAt+mBt=(kA+mB)t=Vt cqd',
      detail: 'Santiago Rivera | 17.06.2018 - 09:20',
      thumb: '/assets/img/profiles/l-4.jpg',
      rate: 3,
      key: 3,
      sender: 'Santiago Rivera'
    },
  ];

  return (
    <>
      <Row>
        <Colxx xxs="12" xl="12" className="col-left">
          <Card className="mb-4 rounded-card">
            <CardBody>
              <div className="d-flex">
                <i
                  onClick={() => {
                    return navigate('/foros');
                  }}
                  className="lead mr-3 cursor-pointer iconsminds-left-1 text-primary"
                ></i>
                <div>
                  <p className="mb-0 lead font-bold">Matriz simétrica</p>
                  <p className="mb-0 ">Comprobación de una matriz simétrica paso a paso.</p>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="mb-4 rounded-card">
            <CardHeader>
              <Nav tabs className="card-header-tabs ">
                <NavItem>
                  <NavLink
                    className={classNames({
                      active: activeTab === 'details',
                      'nav-link': true,
                    })}
                    onClick={() => setActiveTab('details')}
                    to="#"
                  >
                    <IntlMessages id="layouts.details" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classNames({
                      active: activeTab === 'comments',
                      'nav-link': true,
                    })}
                    onClick={() => setActiveTab('comments')}
                    to="#"
                  >
                    <IntlMessages id="layouts.comments" />
                    ({comments.length})
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="details">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <p className="font-weight-bold">Enunciado</p>
                      <p>
                      Probar con un contraejemplo de la siguiente proposición: A y B son matrices simétricas, si y solo si la matriz kA+mB es simétrica para cualquier par de números reales k y m.                      
                      </p>
                      <br />
                      <p className="font-weight-bold">Criterios</p>
                      <p>
                        Explicar paso a paso y enumerados como se demuestra la matriz simétrica.
                        Gracias, quedo atento a sus comentarios.
                      </p>
                      <br />
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
              <TabPane tabId="comments">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      {comments.map((item: any) => {
                        return (
                          <CommentWithLikes
                            className={''}
                            data={item}
                            key={`comments_${item.key}`}
                          />
                        );
                      })}
                      <InputGroup className="comment-container">
                        <InputGroup className="input-group-prepend">
                          <Input placeholder="Añadir comentarios" />
                          <Button color="primary" className="btn-rounded-preppend">
                            <span className="d-inline-block">
                              {<IntlMessages id="pages.send" />}
                            </span>{' '}
                            <i className="simple-icon-arrow-right ml-2" />
                          </Button>
                        </InputGroup>
                      </InputGroup>
                    </CardBody>
                  </Colxx>
                </Row>
              </TabPane>
            </TabContent>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
const mapDispatchToProps = {};

const mapStateToProps = ({}: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumApp);
