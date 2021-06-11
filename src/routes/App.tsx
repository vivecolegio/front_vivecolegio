import React, { Suspense, useEffect, useState } from 'react';
import { useClearCache } from 'react-clear-cache';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/app/Home';
import SignIn from '../components/app/Login/SignIn';
import SignUp from '../components/app/Login/SignUp';
import Layout from '../components/common/layout/Layout';



const App = (props: any) => {

    const [permissions, setPermissions] = useState(false);

  const { isLatestVersion, emptyCacheStorage, latestVersion } = useClearCache();

  const handleLogout = async () => {
    await props.logout();
    setPermissions(false);
  };

  useEffect(() => {
    if (!isLatestVersion) {
      emptyCacheStorage();
    }
    const token = localStorage.getItem('token');
    if (props?.loginReducer?.user?.username?.length > 1 && token != null) {
      setPermissions(true);
      const dateExp = props?.loginReducer?.payload?.exp;
      const date1 = new Date(dateExp * 1000);
      const date = new Date();
      let diff = (date1.getTime() - date.getTime()) / 1000;
      diff /= 60;
      if (diff < 0) {
        handleLogout();
      }
    } else {
      setPermissions(false);
    }
  }, [emptyCacheStorage, isLatestVersion, props.loginReducer]);

    return (
        <IntlProvider locale={props.translateReducer?.language} >
            <HashRouter>
                <Layout permissions={permissions}>
                {latestVersion}
                <Suspense fallback={<></>} >
                    <Switch>
                        <Route exact path="/" component={SignIn} />
                        <Route exact path="/signin" component={SignIn} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/home" component={permissions ? Home: SignIn} />
                    </Switch>
                </Suspense>
                </Layout>
            </HashRouter>
        </IntlProvider>
    );
};

export default App;