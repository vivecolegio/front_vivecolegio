import React from 'react';
import { connect } from 'react-redux';
import ProfileImg from '../assets/img/profiles/empty.png';
import { urlImages } from '../stores/graphql/index';

const Home = (props: any) => {
  return (
    <>
      <img
        className="dashboard-logo"
        alt="Profile"
        src={
          props?.loginReducer?.profilePhoto
            ? urlImages + props?.loginReducer?.profilePhoto
            : ProfileImg
        }
        width="100"
      />
      <br />
      <h1>
        Hola, {props?.loginReducer?.name} {props?.loginReducer?.lastName}, estás en la institución "
        {props?.loginReducer?.school}"
      </h1>
    </>
  );
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps)(Home);
