import React from 'react';
import { connect } from 'react-redux';

const Home = (props: any) => {
  return <></>;
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps)(Home);
