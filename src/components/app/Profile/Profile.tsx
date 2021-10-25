import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Badge, Card, CardBody } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as userActions from '../../../stores/actions/UserActions';
import { Colxx } from '../../common/CustomBootstrap';
import SingleLightbox from '../../common/layout/pages/SingleLightbox';

const Profile = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // const methods = useFormContext();

  useEffect(() => {
    getUser();
    setLoading(false);
  }, [props?.data]);

  const getUser = async () => {
    props.dataUser(props?.loginReducer?.userId).then((resp: any) => {
      setUser(resp.data);
      console.log(resp);
    });
  };

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
          <Colxx xxs="12" lg="6" xl="8" className="col-left mt-20 m-auto">
            <SingleLightbox
              thumb="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
              large="../../../assets/img/profiles/1.jpg"
              className="img-thumbnail card-img social-profile-img"
            />

            <Card className="mb-4">
              <CardBody>
                <div className="text-center pt-4 mb-4">
                  <p className="list-item-heading pt-2 mb-1">
                    {user ? user.name : ''} {user ? user.lastName : ''}
                  </p>
                  <p className="text-muted mb-1">{user ? user.email : ''}</p>
                  <Badge color="outline-secondary" pill>
                    {user ? user.role.name : ''}
                  </Badge>
                </div>
                <div className="row">
                  <div className="col-md-6 text-right">
                    <p className="text-muted text-small mb-2">
                      <i className="iconsminds-id-card mr-2" /> {user ? user.documentType.name : ''}
                    </p>
                    <p className="mb-3">{user ? user.documentNumber : ''}</p>
                  </div>
                  <div className="col-md-6 text-left">
                    <p className="text-muted text-small mb-2">
                      <i className="iconsminds-male-female mr-2" />
                      <IntlMessages id="forms.gender" />
                    </p>
                    <p className="mb-3">{user ? user.gender.name : ''}</p>
                  </div>
                  <div className="col-md-6 text-right">
                    <p className="text-muted text-small mb-2">
                      <i className="iconsminds-smartphone-3 mr-2" />
                      <IntlMessages id="forms.phone" />
                    </p>
                    <p className="mb-3">{user ? user.phone : ''}</p>
                  </div>
                  <div className="col-md-6 text-left">
                    <p className="text-muted text-small mb-2">
                      <i className="iconsminds-cake mr-2" />
                      <IntlMessages id="forms.birthdate" />
                    </p>
                    <p className="mb-3">
                      {user ? moment(user.birthdate).format('YYYY-MM-DD') : ''}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = { ...userActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
