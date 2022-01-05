import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Alert, Button, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import * as loginActions from '../../../stores/actions/LoginActions';

const Login = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  let navigate = useNavigate();

  useEffect(() => {
    if (props.loginReducer?.userId?.length > 0) {
      navigate('/home');
      // props.history.push('/home');
    } else {
      console.log('entro por aca');
      console.log(props);
      props.resetApp();
    }
  }, [props.loginReducer?.userId]);

  const onSubmit = (e: any) => {
    console.log('entro a submit');
    e.preventDefault();
    console.log(props);
    // trigger().then(() => {
    //   if (errors?.email === undefined && errors?.password === undefined) {
    props.login({
      username: getValues('username'),
      password: getValues('password'),
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
      <div className="position-relative image-side ">
        <p className="text-white h2">VIVE COLEGIO 2.0</p>
        <p className="white mb-0">
          Una plataforma orientada a promover
          <br />
          el uso de la tecnología en el ámbito académico.
        </p>
      </div>
      <div className="form-side">
        <NavLink to="/" className="white">
          <span className="logo-single" />
        </NavLink>
        <CardTitle className="mb-4">
          <IntlMessages id="user.login-title" />
        </CardTitle>

        {props.errors?.length > 0 && (
          <Alert color="danger" className="rounded">
            <IntlMessages id="alert.danger-text" />
          </Alert>
        )}
        <Form onSubmit={handleSubmit(onSubmit)} className="av-tooltip tooltip-label-bottom">
          <FormGroup className="form-group has-float-label">
            <Label>
              <IntlMessages id="user.username" />
            </Label>
            <Input {...usernameRest} innerRef={usernameRef} className="form-control" />          
            {errors?.email && <div className="invalid-feedback d-block">{errors?.username}</div>}
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
            {errors?.password && <div className="invalid-feedback d-block">{errors?.password}</div>}
          </FormGroup>
          <div className="d-flex justify-content-between align-items-center">
            <NavLink to="/user/forgot-password">
              <IntlMessages id="user.forgot-password-question" />
            </NavLink>
            <Button
              color="primary"
              className={`btn-shadow btn-multiple-state ${props.loading ? 'show-spinner' : ''}`}
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
          </div>
        </Form>
      </div>
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
