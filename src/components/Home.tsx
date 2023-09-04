import React from 'react';
import Banner from '../assets/img/banner/banner.jpeg';
import { connect } from 'react-redux';

const Home = (props: any) => {
  return <> <img style={{ width: "100%" }} src={Banner} /></>;
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps)(Home);
