import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../common/Loader';
import { connect } from 'react-redux';
import { Badge, Button, Card, CardBody, FormGroup, Input, InputGroup, Label } from 'reactstrap';
import BannerImg from '../../../assets/img/logos/banner.png';
import ProfileImg from '../../../assets/img/profiles/empty.png';
import IntlMessages from '../../../helpers/IntlMessages';
import * as userActions from '../../../stores/actions/UserActions';
import * as loginActions from '../../../stores/actions/LoginActions';
import { Colxx } from '../../common/CustomBootstrap';
import SingleLightbox from '../../common/layout/pages/SingleLightbox';
import { urlImages } from '../../../stores/graphql/index';
import { useForm } from 'react-hook-form';

const Profile = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);

  const {
    register,
    getValues,
    formState,
  } = useForm();

  useEffect(() => {
    getUser();
    setLoading(false);
    console.log(formState)
  }, [props?.data]);

  const getUser = async () => {
    props.dataUser(props?.loginReducer?.userId).then((resp: any) => {
      setUser(resp.data);
    });
  };

  const uploadFileImage = async (file: any) => {
    props.updateProfilePhotoUser(file, props?.loginReducer?.userId).then((resp: any) => {
      getUser();
      me();
    });
  };

  const updatePassword = async () => {
    props.changePasswordUser(getValues().password, props?.loginReducer?.userId).then((resp: any) => {
      getUser();
    });
  };

  const validatePasswordsMatch = async (e: any, compare: any, type: string) => {
    if (e.target.value !== compare) {
      setErrors({ password_repeat: 'Las contraseñas no coinciden', password: 'Las contraseñas no coinciden' })
    } else if (e.target.value.length == 0 || e.target.value.length < 7 && type == "password") {
      setErrors({ password: 'La contraseña debe tener minimo 7 caractéres' });
    } else if (e.target.value.length == 0 || e.target.value.length < 7 && type != "password") {
      setErrors({ password_repeat: 'La contraseña debe tener minimo 7 caractéres' });
    } else {
      setErrors(null);
      return;
    }
  };

  const me = async () => {
    await props.me().then((dataResp: any) => { });
  };

  const { ref: passwordRef, ...passwordRest } = register('password', {
    required: true,
    value: props?.data?.id ? props?.data?.password : '',
  });
  const { ref: passwordRepeatRef, ...passwordRepeatRest } = register('password_repeat', {
    required: true,
    value: props?.data?.id ? props?.data?.password_repeat : '',
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
          <Colxx xxs="12" lg="6" xl="6" className="col-left m-auto">
            <SingleLightbox
              thumb={user?.profilePhoto ? urlImages + user?.profilePhoto : ProfileImg}
              large={user?.profilePhoto ? urlImages + user?.profilePhoto : ProfileImg}
              className="img-thumbnail card-img social-profile-img"
            />
            <Card>
              <CardBody className='pb-0'>
                <div className="text-center pt-4 mb-4 mt-4">
                  <p className="pt-2 mb-1 font-1-5rem">
                    <strong>
                      {user ? user.name : ''} {user ? user.lastName : ''}
                    </strong>
                  </p>
                  <p className="text-muted mb-2 font-1rem">{user ? user.email : ''}</p>
                  <Badge color="primary font-0-8rem" pill>
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
                <small>*La foto de perfil se cargará automaticamente una vez sea seleccionada*</small>
                {/* <hr />
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
                </div> */}
              </CardBody>
              <CardBody className='text-center pt-0'>
                <div className="text-center pt-4 mb-4 mt-3">
                  <p className="pt-2 mb-1 font-1-5rem">
                    <strong>
                      Cambiar contraseña
                    </strong>
                  </p>
                </div>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    Contraseña
                  </Label>
                  <Input
                    onInput={(e) => validatePasswordsMatch(e, getValues('password_repeat'), 'password')}
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
                    onInput={(e) => validatePasswordsMatch(e, getValues('password'), 'password_repeat')}
                    type="password"
                    {...passwordRepeatRest}
                    innerRef={passwordRepeatRef}
                    className="form-control"
                  />
                  {errors?.password_repeat && (
                    <div className="invalid-feedback d-block">{errors?.password_repeat}</div>
                  )}
                </FormGroup>
                <Button
                  color="primary"
                  className={`mb-5 mt-5 btn-login btn-shadow`}
                  size="lg"
                  type="submit"
                  disabled={errors || !getValues('password') || !getValues('password_repeat')}
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

const mapDispatchToProps = { ...userActions, ...loginActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
