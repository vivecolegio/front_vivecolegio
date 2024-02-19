import React, { useEffect } from 'react';
import Banner from '../assets/img/banner/banner.jpeg';
import { connect } from 'react-redux';
import * as loginActions from '../stores/actions/LoginActions';

const Home = (props: any) => {
  // useEffect(() => {
  //   if (props.loginReducer.userId?.length > 0) {
  //     props.me(props?.loginReducer?.schoolYear).then(() => {});
  //   } else {
  //     props.resetApp();
  //   }
  // }, [props.loginReducer.userId]);

  return (
    <>
      {' '}
      <img style={{ width: '100%' }} src={Banner} />
    </>
  );
};

const mapDispatchToProps = {
  ...loginActions,
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
