import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../common/Loader';
import { connect } from 'react-redux';
import { Badge, Card, CardBody, Input, InputGroup } from 'reactstrap';
import BannerImg from '../../../assets/img/logos/banner.png';
import ProfileImg from '../../../assets/img/profiles/empty.png';
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
      //console.log(resp);
    });
  };

  const uploadFileImage = async (file: any) => {
    props.updateProfilePhotoUser(file, props?.loginReducer?.userId).then((resp: any) => {
      console.log(resp);
    });
    console.log(file)
  };

  return (
    <>
      {loading ? (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader />
          </Colxx>
        </>
      ) : (
        <>
          <Colxx xxs="12" className="mb-5">
            <Card>
              <SingleLightbox
                thumb={BannerImg}
                large={BannerImg}
                className="social-header h-250 card-img"
              />
            </Card>
          </Colxx>
          <Colxx xxs="12" lg="5" xl="5" className="col-left m-auto">
            <SingleLightbox
              thumb={user?.profilePhoto || ProfileImg}
              large={user?.profilePhoto || ProfileImg}
              className="img-thumbnail card-img social-profile-img"
            />
            <Card>
              <CardBody>
                <div className="text-center pt-4 mb-4 mt-4">
                  <p className="pt-2 mb-1 font-1-5rem">
                    <strong>
                      {user ? user.name : ''} {user ? user.lastName : ''}
                    </strong>
                  </p>
                  <p className="text-muted mb-2 font-1rem">{user ? user.email : ''}</p>
                  <Badge color="outline-info font-0-8rem" pill>
                    {user ? user.role.name : ''}
                  </Badge>
                </div>
                <InputGroup className="mb-3">
                  <Input
                    type="file"
                    id="exampleCustomFileBrowser2"
                    name="customFile"
                    onChange={(e) => uploadFileImage(e.target.files[0])}
                  />
                </InputGroup>
                <hr />
                <div className="row mt-4">
                  <div className="col-md-6 text-right">
                    <p className="text-muted text-small mb-2 d-flex align-items-center justify-content-end">
                      <i className="iconsminds-id-card mr-2 font-1rem text-info" />{' '}
                      {user ? user.documentType.name : ''}
                    </p>
                    <p className="mb-3 font-1rem">{user ? user.documentNumber : ''}</p>
                  </div>
                  <div className="col-md-6 text-left">
                    <p className="text-muted text-small mb-2 d-flex align-items-center">
                      <i className="iconsminds-male-female mr-2 font-1rem text-info" />
                      <IntlMessages id="forms.gender" />
                    </p>
                    <p className="mb-3 font-1rem">{user ? user.gender.name : ''}</p>
                  </div>
                  <div className="col-md-6 text-right">
                    <p className="text-muted text-small mb-2 d-flex align-items-center justify-content-end">
                      <i className="iconsminds-smartphone-3 mr-2 font-1rem text-info" />
                      <IntlMessages id="forms.phone" />
                    </p>
                    <p className="mb-3 font-1rem">{user ? user.phone : ''}</p>
                  </div>
                  <div className="col-md-6 text-left">
                    <p className="text-muted text-small mb-2 d-flex align-items-center">
                      <i className="iconsminds-cake mr-2 font-1rem text-info" />
                      <IntlMessages id="forms.birthdate" />
                    </p>
                    <p className="mb-3 font-1rem">
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
