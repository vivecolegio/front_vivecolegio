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
      title: 'Very informative content, thank you. ',
      detail: 'Mayra Sibley | Tea Loaf with Fresh Oranges | 17.09.2018 - 04:45',
      thumb: '/assets/img/profiles/l-1.jpg',
      rate: 5,
      key: 0,
    },
    {
      title: 'This article was delightful to read. Please keep them coming.',
      detail: 'Barbera Castiglia | Cheesecake with Chocolate Cookies | 15.08.2018 - 01:18',
      thumb: '/assets/img/profiles/l-2.jpg',
      rate: 4,
      key: 1,
    },
    {
      title: 'Your post is bad and you should feel bad.',
      detail: 'Bao Hathaway | Homemade Cheesecake | 26.07.2018 - 11:14',
      thumb: '/assets/img/profiles/l-3.jpg',
      rate: 5,
      key: 2,
    },
    {
      title: 'Very original idea!',
      detail: 'Lenna Majeed | Tea Loaf with Fresh Oranges | 17.06.2018 - 09:20',
      thumb: '/assets/img/profiles/l-4.jpg',
      rate: 3,
      key: 3,
    },
    {
      title: 'This article was delightful to read. Please keep them coming.',
      detail: 'Esperanza Lodge | Cheesecake with Fresh Berries | 16.06.2018 - 16:45',
      thumb: '/assets/img/profiles/l-5.jpg',
      rate: 2,
      key: 4,
    },
    {
      title: 'Nah, did not like it.',
      detail: '24.07.2018 - 15:00',
      thumb: '/assets/img/profiles/l-2.jpg',
      rate: 5,
      key: 5,
    },
    {
      title: 'Laree Munsch',
      detail: 'Brynn Bragg | Wedding Cake with Flowers | 12.04.2018 - 12:45',
      thumb: '/assets/img/profiles/l-1.jpg',
      rate: 4,
      key: 6,
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
                  <p className="mb-0 lead font-bold">Titulo del foro</p>
                  <p className="mb-0 ">Descripción corta del foro</p>
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
                    (19)
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="details">
                <Row>
                  <Colxx sm="12">
                    <CardBody>
                      <p className="font-weight-bold">Augue Vitae Commodo</p>
                      <p>
                        Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu
                        mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget
                        fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae;
                        Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum
                        convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis
                        mattis, egetauctor sapien varius. <br />
                        <br />
                        Nulla non purus fermentum, pulvinar dui condimentum, malesuada nibh. Sed
                        viverra quam urna, at condimentum ante viverra non. Mauris posuere erat
                        sapien, a convallis libero lobortis sit amet. Suspendisse in orci tellus.
                      </p>
                      <br />
                      <p className="font-weight-bold">Phasellus Efficitur</p>
                      <p>
                        Tellus a sem condimentum, vitae convallis sapien feugiat.Aenean non nibh nec
                        nunc aliquam iaculis. Ut quis suscipit nunc. Duis at lectusa est aliquam
                        venenatis vitae eget arcu. Sed egestas felis eget convallismaximus.
                        Curabitur maximus, ligula vel sagittis iaculis, risus nisi tinciduntsem, ut
                        ultricies libero nulla eu ligula. Nam ultricies mollis nulla, sedlaoreet leo
                        convallis ac. Mauris nisl risus, tincidunt ac diam aliquet,convallis
                        pellentesque nisi. Nam sit amet libero at odio malesuada ultricies avitae
                        dolor. Cras in viverra felis, non consequat quam. Praesent a orci
                        enim.Vivamus porttitor nisi at nisl egestas iaculis. Nullam commodo eget
                        duisollicitudin sagittis. Duis id nibh mollis, hendrerit metus
                        consectetur,ullamcorper risus. Morbi elementum ultrices nunc, quis porta
                        nisi ornare sitamet.
                        <br />
                        <br />
                        Etiam tincidunt orci in nisi aliquam placerat. Aliquam finibus in sem
                        utvehicula. Morbi eget consectetur leo. Quisque consectetur lectus eros,
                        sedsodales libero ornare cursus. Etiam elementum ut dolor eget
                        hendrerit.Suspendisse eu lacus eu eros lacinia feugiat sit amet non purus.
                        <br />
                        <br />
                        Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallis
                        enim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis,
                        eget auctor sapien varius.
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
