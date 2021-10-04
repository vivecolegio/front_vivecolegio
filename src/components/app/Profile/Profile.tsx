import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Badge, Card, CardBody } from 'reactstrap';
import SingleLightbox from "../../common/layout/pages/SingleLightbox";
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as campusActions from '../../../stores/actions/CampusActions';
import * as schoolActions from '../../../stores/actions/SchoolActions';
import { Colxx } from '../../common/CustomBootstrap';


const Profile = (props: any) => {
  const [loading, setLoading] = useState(true);

  // const methods = useFormContext();

  useEffect(() => {
    if (props?.data?.id) {
      // if (props?.data?.school !== undefined && props?.data?.school != null) {
      //   // setSchool({
      //   //   key: props?.data?.school?.id,
      //   //   label: props?.data?.school?.name,
      //   //   value: props?.data?.school?.id,
      //   // });
      // }
    } else {
      // methods.reset();
    }
    setLoading(false);
  }, [props?.data]);

  return (
    <>
      {loading ? (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader type={loaderIcon} color={loaderColor} height={30} width={30} />
          </Colxx>
        </>
      ) : (
        <>
          <Colxx xxs="12" lg="5" xl="4" className="col-left mt-20 m-auto">
            <SingleLightbox
              thumb="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
              large="../../../assets/img/profiles/1.jpg"
              className="img-thumbnail card-img social-profile-img"
            />

            <Card className="mb-4">
              <CardBody>
                <div className="text-center pt-4">
                  <p className="list-item-heading pt-2">Sarah Cortney</p>
                </div>
                <p className="mb-3">
                  I’m a web developer. I spend my whole day, practically every day, experimenting
                  with HTML, CSS, and JavaScript; dabbling with Python and Ruby; and inhaling a wide
                  variety of potentially useless information through a few hundred RSS feeds. I
                  build websites that delight and inform. I do it well.
                </p>
                <p className="text-muted text-small mb-2">
                  <IntlMessages id="pages.location" />
                </p>
                <p className="mb-3">Nairobi, Kenya</p>
                <p className="text-muted text-small mb-2">
                  <IntlMessages id="pages.responsibilities" />
                </p>
                <p className="mb-3">
                  <Badge color="outline-secondary" className="mb-1 mr-1" pill>
                    FRONTEND
                  </Badge>
                  <Badge color="outline-secondary" className="mb-1 mr-1" pill>
                    JAVASCRIPT
                  </Badge>
                  <Badge color="outline-secondary" className="mb-1 mr-1" pill>
                    SECURITY
                  </Badge>
                  <Badge color="outline-secondary" className="mb-1 mr-1" pill>
                    DESIGN
                  </Badge>
                </p>
                <p className="text-muted text-small mb-2">
                  <IntlMessages id="menu.contact" />
                </p>
                <div className="social-icons">
                  <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">
                      <NavLink to="#">
                        <i className="simple-icon-social-facebook" />
                      </NavLink>
                    </li>
                    <li className="list-inline-item">
                      <NavLink to="#">
                        <i className="simple-icon-social-twitter" />
                      </NavLink>
                    </li>
                    <li className="list-inline-item">
                      <NavLink to="#">
                        <i className="simple-icon-social-instagram" />
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = { ...campusActions, ...schoolActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
