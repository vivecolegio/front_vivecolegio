import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Alert, Button, Card, Form, FormGroup, Input, Label, Row } from 'reactstrap';

import Abrazate from '../../../assets/img/logos/AbrazateLogo.png';
import NavImg2 from '../../../assets/img/logos/gobernacion.png';
import LoginImg1 from '../../../assets/img/logos/login1.jpg';
import LogoImg from '../../../assets/img/logos/LOGO.png';
import LogoImg2 from '../../../assets/img/logos/LOGO2.png';
import FooterImg2 from '../../../assets/img/logos/minciencias.png';
import NavImg1 from '../../../assets/img/logos/ufps.png';
import IntlMessages from '../../../helpers/IntlMessages';
import * as loginActions from '../../../stores/actions/LoginActions';
import { Colxx } from '../../common/CustomBootstrap';
import { Loader } from '../../common/Loader';
import useIsAppOffline from '../../../hooks/useIsAppOffline';

const Login = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [syncOnline, setSyncOnline] = useState(false);
  const [isMiniServer, setIsMiniServer] = useState(false);
  const isOffline = useIsAppOffline();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  let navigate = useNavigate();

  useEffect(() => {
    let currentDomain = window.location.origin;
    if (
      !currentDomain.includes('https://vivecolegios.nortedesantander.gov.co') ||
      !currentDomain.includes('http://localhost')
    ) {
      setIsMiniServer(true);
      props.getLoginUserCount().then((data: any) => {
        console.log(data);
        if (data == 0) {
          setSyncOnline(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    setLoading(false);
    console.log(props.loginReducer);
    if (props.loginReducer.userId?.length > 0) {
      props.me(props?.loginReducer?.schoolYear).then(() => {
        navigate('/home');
      });
      // props.history.push('/home');
    } else {
      props.resetApp();
    }
  }, [props.loginReducer.userId]);

  const onSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    // trigger().then(() => {
    //   if (errors?.email === undefined && errors?.password === undefined) {
    props
      .login({
        username: getValues('username'),
        password: getValues('password'),
      })
      .then(() => {
        setLoading(false);
      });
    //   }
    // });
  };

  const onSubmitSyncOffline = (e: any) => {
    setLoading(true);
    e.preventDefault();
    // trigger().then(() => {
    //   if (errors?.email === undefined && errors?.password === undefined) {
    props
      .loginSyncOffline({
        username: getValues('username'),
        password: getValues('password'),
      })
      .then((data: any) => {
        if (data) {
          props
            .login({
              username: getValues('username'),
              password: getValues('password'),
            })
            .then(() => {
              setLoading(false);
            });
        }
      });
    //   }
    // });
  };

  const { ref: usernameRef, ...usernameRest } = register('username', {
    required: true,
    value: props?.data?.id ? props?.data?.username : '',
  });
  const { ref: passwordRef, ...passwordRest } = register('password', {
    required: true,
    value: props?.data?.id ? props?.data?.password : '',
  });

  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <Row className="h-100">
            <Colxx
              xxs="3"
              md="3"
              className="mx-auto mt-10 text-center d-none d-sm-none d-sm-block d-md-none d-lg-block"
            >
              {/* <img src={LogoImg} className="width-logo" /> */}
              <a href="https://vivecolegios.nortedesantander.gov.co:8443/abrazate">
                <img src={Abrazate} className="width-logo" />
              </a>
            </Colxx>
            <Colxx xxs="12" sm="12" md="3" lg="3" className="mx-auto mt-5 center-flex">
              <Card className="auth-card w-330">
                <div className="form-side pt-4 pb-2 text-center">
                  <NavLink to="/" className="white mt-3">
                    {/* <span className="logo-single" /> */}
                    <img src={LogoImg2} />
                  </NavLink>
                  {props.errors?.length > 0 && (
                    <Alert color="danger" className="rounded">
                      <IntlMessages id="alert.danger-text" />
                    </Alert>
                  )}
                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="av-tooltip tooltip-label-bottom mt-5"
                  >
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.username" />
                      </Label>
                      <Input {...usernameRest} innerRef={usernameRef} className="form-control" />
                      {errors?.email && (
                        <div className="invalid-feedback d-block">
                          {errors?.username?.toString()}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.password" />
                      </Label>
                      <Input
                        type="password"
                        {...passwordRest}
                        innerRef={passwordRef}
                        className="form-control"
                      />
                      {errors?.password && (
                        <div className="invalid-feedback d-block">
                          {errors?.password?.toString()}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-center flex-column align-items-center">
                      {/* <NavLink className="mb-3 mt-3" to="/user/forgot-password">
                        <i className='text-info simple-icon-info mr-2 font-bold'></i>
                        <IntlMessages id="user.forgot-password-question" />
                      </NavLink> */}
                      {loading ? <Loader size={50} /> : ''}
                      {!isMiniServer ? (
                        <Button
                          color="primary"
                          className={`mb-5 mt-5 btn-login btn-shadow btn-multiple-state ${
                            props.loading ? 'show-spinner' : ''
                          }`}
                          size="lg"
                          type="submit"
                          onClick={onSubmit}
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            <IntlMessages id="user.login-button" />
                          </span>
                        </Button>
                      ) : isOffline && syncOnline ? (
                        <>
                          <span className="font-1rem ml-1">
                            Por favor, conectese a una red para poder iniciar el proceso de
                            sincronización.
                          </span>
                        </>
                      ) : syncOnline ? (
                        <>
                          <span className="font-1rem ml-1">
                            Por favor, inicie sesion con un usuario administrador para realizar el
                            proceso de sincronización.
                          </span>
                          <Button
                            color="primary"
                            className={`mb-5 mt-5 btn-login btn-shadow btn-multiple-state ${
                              props.loading ? 'show-spinner' : ''
                            }`}
                            size="lg"
                            type="submit"
                            onClick={onSubmitSyncOffline}
                          >
                            <span className="spinner d-inline-block">
                              <span className="bounce1" />
                              <span className="bounce2" />
                              <span className="bounce3" />
                            </span>
                            <span className="label">
                              <IntlMessages id="user.sync-button" />
                            </span>
                          </Button>
                        </>
                      ) : (
                        <>
                          {' '}
                          <Button
                            color="primary"
                            className={`mb-5 mt-5 btn-login btn-shadow btn-multiple-state ${
                              props.loading ? 'show-spinner' : ''
                            }`}
                            size="lg"
                            type="submit"
                            onClick={isMiniServer && isOffline ? onSubmitSyncOffline : onSubmit}
                          >
                            <span className="spinner d-inline-block">
                              <span className="bounce1" />
                              <span className="bounce2" />
                              <span className="bounce3" />
                            </span>
                            <span className="label">
                              <IntlMessages id="user.login-button" />
                            </span>
                          </Button>{' '}
                        </>
                      )}
                      {/* <h2>
                        <span className="font-1rem ml-1">
                          Disculpe las molestias la plataforma se encuentra en mantenimiento.
                          Finaliza el:{' '}
                        </span>
                        <span className="font-1rem ml-1">19/02/2024 2:30 P.M.</span>
                      </h2> */}
                      {/* <p>
                        <IntlMessages id="user.still-user" />
                        <NavLink to="/user/forgot-password">
                          <span className="text-info ml-1 font-bold"><IntlMessages id="user.request-user" /></span>
                        </NavLink>
                      </p> */}
                      {/* <span className='line mt-2'></span> */}
                    </div>
                  </Form>
                </div>
                <div className="divisor"></div>
              </Card>
            </Colxx>
            <Colxx
              xxs="5"
              md="5"
              className="mx-auto my-auto text-center top-negative d-none d-sm-none d-sm-block d-md-none d-lg-block"
            >
              <div className="circular-square">
                <img src={LoginImg1} />
              </div>
              <div className="text-white font-italic mt-3 w-90 mx-auto">
                <h1>
                  La educación genera confianza. La confianza genera esperanza. La esperanza genera
                  paz.<span className="font-1rem ml-1">(Confucio)</span>
                </h1>
              </div>
            </Colxx>
            <Colxx
              xxs="1"
              md="1"
              className="mx-auto my-auto text-center top-negative d-none d-sm-none d-sm-block d-md-none d-lg-block"
            >
              {/* <div className="circular-square">
               <img src={LoginImg1}  />
              </div>              
              <div className='text-white font-italic mt-3 w-75 mx-auto'>
              <h1>La educación genera confianza. La
                confianza genera esperanza. La esperanza
                genera paz.<span className='font-1rem ml-1'>(Confucio)</span></h1>
              </div>               */}
            </Colxx>
          </Row>
        </div>
      </main>
      <Row className="d-none d-sm-none d-sm-block d-md-none d-lg-block">
        <Colxx xxs="12" md="12" className="footer-login">
          <Colxx
            className="col-sm-8 col-md-8 d-flex justify-content-around"
            style={{ height: '80px' }}
          >
            <img className="p-3" alt="LOGO" src={FooterImg2} />
            <img className="p-3" alt="LOGO" src={NavImg2} />
            <img className="p-3" alt="LOGO" src={NavImg1} />
          </Colxx>
        </Colxx>
      </Row>
    </>
  );
};

const mapDispatchToProps = {
  ...loginActions,
};

const mapStateToProps = ({ loginReducer, translateReducer }: any) => {
  return { loginReducer, translateReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
