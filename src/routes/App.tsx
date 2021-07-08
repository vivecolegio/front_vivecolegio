import React, { Suspense, useEffect, useState } from 'react';
import { useClearCache } from 'react-clear-cache';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AdministratorSchoolList from '../components/app/AdministratorsSchool/AdministratorSchoolList';
import AreaList from '../components/app/Area/AreaList';
import AsignatureList from '../components/app/Asignature/AsignatureList';
import CampusList from '../components/app/Campus/CampusList';
import CycleList from '../components/app/Cycle/CycleList';
import Login from '../components/app/Login/Login';
import MenuList from '../components/app/Menu/MenuList';
import ModuleList from '../components/app/Module/ModuleList';
import PerformanceLevelList from '../components/app/PerformanceLevel/PerformanceLevelList';
import RoleList from '../components/app/Role/RoleList';
import SchoolList from '../components/app/School/SchoolList';
import StandardList from '../components/app/Standard/StandardList';
import StudentsList from '../components/app/Students/StudentsList';
import UserList from '../components/app/User/UserList';
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
                    <Route exact path="/users" component={permissions ? UserList : Login} />
                    <Route exact path="/modules" component={permissions ? ModuleList : Login} />
                    <Route exact path="/areas" component={permissions ? AreaList : Login} />
                    <Route exact path="/asignatures" component={permissions ? AsignatureList : Login} />
                    <Route exact path="/cycles" component={permissions ? CycleList : Login} />
                    <Route exact path="/performanceLevel" component={permissions ? PerformanceLevelList : Login} />
                    <Route exact path="/standardAcademic" component={permissions ? StandardList : Login} />
                    <Route exact path="/schools" component={permissions ? SchoolList : Login} />
                    <Route exact path="/campus" component={permissions ? CampusList : Login} />
                    <Route exact path="/students" component={permissions ? StudentsList : Login} />
                    <Route exact path="/administratorsSchool" component={permissions ? AdministratorSchoolList : Login} />
                    <Route exact path="/menus" component={permissions ? MenuList : Login} />
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
