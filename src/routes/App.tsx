import React, { Suspense, useEffect, useState } from 'react';
import { useClearCache } from 'react-clear-cache';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from '../components/app/Login/Login';
import RoleList from '../components/app/Role/RoleList';
import ColorSwitcher from '../components/common/ColorSwitcher';
import Layout from '../components/common/layout/Layout';
import { NotificationContainer } from '../components/common/Notifications';
import Home from '../components/Home';
import { isMultiColorActive } from '../constants/defaultValues';
import AppLocale from '../lang';

const App = (props: any) => {
  const { locale } = props.translateReducer;

  const currentAppLocale = AppLocale[locale];

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
    if (props?.loginReducer?.userId?.length > 0 && token != null) {
      setPermissions(true);
      // const dateExp = props?.loginReducer?.payload?.exp;
      // const date1 = new Date(dateExp * 1000);
      // const date = new Date();
      // let diff = (date1.getTime() - date.getTime()) / 1000;
      // diff /= 60;
      // if (diff < 0) {
      //   handleLogout();
      // }
    } else {
      setPermissions(false);
    }
  }, [emptyCacheStorage, isLatestVersion, props.loginReducer]);

  return (
    <div className="h-100">
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        <>
          <NotificationContainer />
          {isMultiColorActive && <ColorSwitcher />}
          {latestVersion}
          <Suspense fallback={<div className="loading" />} />
          <HashRouter>
            <Layout permissions={permissions}>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={permissions ? Home : Login} />
                {permissions ? (
                  <>
                    <Route exact path="/roles" component={permissions ? RoleList : Login} />
                  </>
                ) : (
                  <></>
                )}
              </Switch>
            </Layout>
          </HashRouter>
        </>
      </IntlProvider>
    </div>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = ({ loginReducer, translateReducer }: any) => {
  return { loginReducer, translateReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
