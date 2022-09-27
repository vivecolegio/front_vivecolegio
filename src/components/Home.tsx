import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { connect } from 'react-redux';
import { Badge, Card, CardBody, Row } from 'reactstrap';
import play from '../assets/img/videos/play.png';
import { blogData } from './app/data/videos';
import { Colxx } from './common/CustomBootstrap';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const Home = () => {
  return (
    <>
      <Row>
        {blogData.map((blogItem, index) => {
          return (
            <Colxx xxs="12" lg="6" className="mb-5" key={`blogItem_${index}`}>
              <Card className="flex-row listing-card-container">
                <div className="w-40 position-relative">
                  <a href={blogItem.video_high} target="_blank">
                    <img className="card-img-left" src={play} alt="video" />
                    {blogItem.badge && (
                      <Badge color="primary" pill className="position-absolute badge-top-left">
                        {blogItem.badge}
                      </Badge>
                    )}
                  </a>
                </div>
                <div className="w-60 d-flex align-items-center">
                  <CardBody>
                    <a href={blogItem.video_high} target="_blank">
                      <ResponsiveEllipsis
                        className="mb-3 listing-heading"
                        text={blogItem.title}
                        maxLine="2"
                        trimRight
                        basedOn="words"
                        component="h5"
                      />
                    </a>
                    <ResponsiveEllipsis
                      className="listing-desc text-muted"
                      text={blogItem.description}
                      maxLine="3"
                      trimRight
                      basedOn="words"
                      component="p"
                    />
                    <a
                      href={blogItem.video_high}
                      type="button"
                      className="btn btn-sm btn-warning"
                      target="_blank"
                    >
                      Baja
                    </a>
                    <a
                      href={blogItem.video_medium}
                      type="button"
                      className="btn btn-sm btn-primary"
                      target="_blank"
                    >
                      Media
                    </a>
                    <a
                      href={blogItem.video_low}
                      type="button"
                      className="btn btn-sm btn-success"
                      target="_blank"
                    >
                      Alta
                    </a>
                  </CardBody>
                </div>
              </Card>
            </Colxx>
          );
        })}
      </Row>
    </>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
