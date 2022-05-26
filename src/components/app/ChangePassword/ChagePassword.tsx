import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../common/Loader';
import { connect } from 'react-redux';
import { Badge, Button, Card, CardBody, FormGroup, Input, InputGroup, Label } from 'reactstrap';
import BannerImg from '../../../assets/img/logos/banner.png';
import ProfileImg from '../../../assets/img/profiles/empty.png';
import IntlMessages from '../../../helpers/IntlMessages';
import * as userActions from '../../../stores/actions/UserActions';
import { Colxx } from '../../common/CustomBootstrap';
import SingleLightbox from '../../common/layout/pages/SingleLightbox';
import { useForm } from 'react-hook-form';
import { getValue } from '@testing-library/user-event/dist/types/utils';

const ChangePassword = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    getUser();
    setLoading(false);
  }, [props?.data]);

  const getUser = async () => {
    props.dataUser(props?.loginReducer?.userId).then((resp: any) => {
      setUser(resp.data);
    });
  };

  const updatePassword = async () => {
    props.changePasswordUser(getValues().password, props?.loginReducer?.userId).then((resp: any) => {
      getUser();
    });
  };

  const { ref: passwordRef, ...passwordRest } = register('password', {
    required: true,
    value: props?.data?.id ? props?.data?.password : '',
  });
  const { ref: passwordRepeatRef, ...passwordRepeatRest } = register('password', {
    required: true,
    value: props?.data?.id ? props?.data?.password : '',
  });

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
                      Cambiar contraseña
                    </strong>
                  </p>
                  <p className="text-muted mb-2 font-1rem">{user ? user.email : ''}</p>
                </div>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    Contraseña
                  </Label>
                  <Input
                    type="password"
                    {...passwordRest}
                    innerRef={passwordRef}
                    className="form-control"
                  />
                  {errors?.password && (
                    <div className="invalid-feedback d-block">{errors?.password}</div>
                  )}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    Repetir contraseña
                  </Label>
                  <Input
                    type="password"
                    {...passwordRepeatRest}
                    innerRef={passwordRepeatRef}
                    className="form-control"
                  />
                  {errors?.passwordRepeat && (
                    <div className="invalid-feedback d-block">{errors?.passwordRepeat}</div>
                  )}
                </FormGroup>
                <Button
                  color="primary"
                  className={`mb-5 mt-5 btn-login btn-shadow`}
                  size="lg"
                  type="submit"
                  onClick={updatePassword}
                > Guardar
                </Button>


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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
