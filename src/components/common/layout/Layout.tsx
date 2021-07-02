import React from 'react';
import { connect } from 'react-redux';

import Basic from './basic/Basic';
import Main from './main/Main';

const Layout = (props: any) => {
  const { userId } = props.loginReducer;
  const token = localStorage.getItem('token');
  const classNameMenu = {
    containerClassnames: props.menuReducer.containerClassnames,
  };
  return (
    <>
      {userId?.length > 0 && token?.length > 0 ? (
        <Main {...classNameMenu}>{props.children}</Main>
      ) : (
        <Basic>{props.children}</Basic>
      )}
    </>
  );
};

const mapStateToProps = ({ loginReducer, menuReducer }: any) => {
  return { loginReducer, menuReducer };
};

export default connect(mapStateToProps, null)(Layout);
