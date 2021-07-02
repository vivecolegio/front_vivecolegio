import React from 'react';
import { connect } from 'react-redux';
import { Card, Row } from 'reactstrap';

import * as LoginActions from '../../../../stores/actions/LoginActions';
import { Colxx } from '../../CustomBootstrap';

const Basic = (props: any) => {
  document.body.classList.add('background');

  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto">
              <Card className="auth-card">{props.children}</Card>
            </Colxx>
          </Row>
        </div>
      </main>
    </>
  );
};

const mapDispatchToProps = {
  ...LoginActions,
};

const mapStateToProps = ({ loginReducer }: any) => {return loginReducer};

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
