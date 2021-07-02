import React from 'react';

import TopNav from './TopNav';
import Sidebar from './Sidebar';
import { injectIntl } from 'react-intl';

const Main = (props: any) => {
  const intlProps = {
    intl: props.intl,
  };

  document.body.classList.remove('background');

  return (
    <>
      <div id="app-container" className={props.containerClassnames}>
        <TopNav {...intlProps} />
        <Sidebar />
        <main>
          <div className="container-fluid">{props.children}</div>
        </main>
      </div>
    </>
  );
};

export default injectIntl(Main);
