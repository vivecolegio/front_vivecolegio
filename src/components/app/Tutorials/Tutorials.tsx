import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, Row } from 'reactstrap';
import play from '../../../assets/img/videos/play.png';
import { blogData } from '../../app/data/videos';
import { Colxx } from '../../common/CustomBootstrap';

const Tutorials = () => {
  return (
    <>
      <Row>
        <Colxx lg="12" xl="12" className="mb-4">
          <Card>
            <div className="position-absolute card-top-buttons">
              <button type="button" className="btn btn-header-light icon-button">
                <i className="simple-icon-refresh" />
              </button>
            </div>
            <CardBody>
              <CardTitle>
                <h1>Tutoriales</h1>
              </CardTitle>
              <div className="scroll dashboard-list-with-thumbs">
                <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
                  {blogData.map((blogItem, index) => {
                    return (
                      <div key={index} className="d-flex flex-row mb-3">
                        <a
                          href={blogItem.video_high}
                          className="d-block position-relative"
                          target="_blank"
                        >
                          <img
                            src={play}
                            alt={blogItem.title}
                            className="list-thumbnail border-0"
                          />
                        </a>

                        <div className="pl-3 pt-2 pr-2 pb-2">
                          <a href={blogItem.video_high} target="_blank">
                            <p className="list-item-heading">{blogItem.title}</p>
                            <div className="pr-4">
                              <p className="text-muted mb-1 text-small">{blogItem.description}</p>
                            </div>
                            <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                              <span>Calidad del video: </span>
                              <a
                                href={blogItem.video_high}
                                type="button"
                                className="mb-2 btn btn-outline-warning btn-xs"
                                target="_blank"
                              >
                                Baja
                              </a>
                              <a
                                href={blogItem.video_medium}
                                type="button"
                                className="mb-2 btn btn-outline-primary btn-xs"
                                target="_blank"
                              >
                                Media
                              </a>
                              <a
                                href={blogItem.video_low}
                                type="button"
                                className="mb-2 btn btn-outline-success btn-xs"
                                target="_blank"
                              >
                                Alta
                              </a>
                            </div>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorials);
