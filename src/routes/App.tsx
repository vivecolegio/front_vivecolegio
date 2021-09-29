import React, { Suspense, useEffect, useState } from 'react';
import { useClearCache } from 'react-clear-cache';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AreaList from '../components/app/Academic/Area/AreaList';
import AsignatureList from '../components/app/Academic/Asignature/AsignatureList';
import GradeList from '../components/app/Academic/Grade/GradeList';
import PerformanceLevelList from '../components/app/Academic/PerformanceLevel/PerformanceLevelList';
import StandardList from '../components/app/Academic/Standard/StandardList';
import AcademicIndicatorList from '../components/app/AcademicIndicator/AcademicIndicatorList';
import AcademicPeriodList from '../components/app/AcademicPeriod/AcademicPeriodList';
import AdministratorCampusList from '../components/app/AdministratorsCampus/AdministratorCampusList';
import AdministratorSchoolList from '../components/app/AdministratorsSchool/AdministratorSchoolList';
import CampusList from '../components/app/Campus/CampusList';
import ComponentEvaluativeList from '../components/app/ComponentEvaluative/ComponentEvaluativeList';
import CoordinatorCampusList from '../components/app/CoordinatorCampus/CoordinatorCampusList';
import DocumentTypeList from '../components/app/DocumentType/DocumentTypeList';
import EducationLevelList from '../components/app/EducationLevel/EducationLevelList';
import GenderList from '../components/app/Gender/GenderList';
import GeneralAreaList from '../components/app/GeneralAcademic/Area/AreaList';
import GeneralAsignatureList from '../components/app/GeneralAcademic/Asignature/AsignatureList';
import GeneralCycleList from '../components/app/GeneralAcademic/Cycle/CycleList';
import GeneralGradeList from '../components/app/GeneralAcademic/Grade/GradeList';
import GeneralPerformanceLevelList from '../components/app/GeneralAcademic/PerformanceLevel/PerformanceLevelList';
import GeneralStandardList from '../components/app/GeneralAcademic/Standard/StandardList';
import GradeAssignmentList from '../components/app/GradeAssignment/GradeAssignmentList';
import Login from '../components/app/Login/Login';
import MenuList from '../components/app/Menu/MenuList';
import ModalityList from '../components/app/Modality/ModalityList';
import ModuleList from '../components/app/Module/ModuleList';
import MunicipalityList from '../components/app/Municipality/MunicipalityList';
import RoleList from '../components/app/Role/RoleList';
import SchoolList from '../components/app/School/SchoolList';
import SchoolYearList from '../components/app/SchoolYear/SchoolYearList';
import SpecialityList from '../components/app/Speciality/SpecialityList';
import StudentsList from '../components/app/Students/StudentsList';
import SubmenuList from '../components/app/Submenu/SubmenuList';
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
                    {/* ADMIN */}
                    <Route exact path="/roles" component={permissions ? RoleList : Login} />
                    <Route exact path="/users" component={permissions ? UserList : Login} />
                    <Route exact path="/modules" component={permissions ? ModuleList : Login} />
                    <Route exact path="/menus" component={permissions ? MenuList : Login} />
                    <Route exact path="/submenus" component={permissions ? SubmenuList: Login} /> 
                    <Route exact path="/submenus/:idMenu" component={permissions ? SubmenuList: Login} /> 
                    <Route exact path="/genders" component={permissions ? GenderList : Login} />
                    <Route exact path="/documentTypes" component={permissions ? DocumentTypeList : Login} />
                    <Route exact path="/municipality" component={permissions ? MunicipalityList : Login} />
                    {/* ADMIN */}     
                    {/* PERSONAL */}                
                    <Route exact path="/schools" component={permissions ? SchoolList : Login} />
                    <Route exact path="/campus" component={permissions ? CampusList : Login} />
                    <Route exact path="/students" component={permissions ? StudentsList : Login} />
                    <Route exact path="/administratorsSchool" component={permissions ? AdministratorSchoolList : Login} />
                    <Route exact path="/administratorsCampus" component={permissions ? AdministratorCampusList : Login} />
                    <Route exact path="/coordinatorsCampus" component={permissions ? CoordinatorCampusList : Login} />
                    {/* PERSONAL */}
                    {/* GENERAL ACADEMIC */}        
                    <Route exact path="/general/areas" component={permissions ? GeneralAreaList : Login} />
                    <Route exact path="/general/asignatures" component={permissions ? GeneralAsignatureList : Login} />
                    <Route exact path="/general/cycles" component={permissions ? GeneralCycleList : Login} />
                    <Route exact path="/general/performanceLevel" component={permissions ? GeneralPerformanceLevelList : Login} />
                    <Route exact path="/general/standardAcademic" component={permissions ? GeneralStandardList : Login} />
                    <Route exact path="/general/grades" component={permissions ? GeneralGradeList : Login} />
                    {/* GENERAL ACADEMIC */} 
                    {/* ACADEMIC */}        
                    <Route exact path="/areas" component={permissions ? AreaList : Login} />
                    <Route exact path="/asignatures" component={permissions ? AsignatureList : Login} />
                    <Route exact path="/performanceLevel" component={permissions ? PerformanceLevelList : Login} />
                    <Route exact path="/standardAcademic" component={permissions ? StandardList : Login} />
                    <Route exact path="/grades" component={permissions ? GradeList : Login} />
                    <Route exact path="/educationLevel" component={permissions ? EducationLevelList : Login} />
                    <Route exact path="/evaluativeComponent" component={permissions ? ComponentEvaluativeList : Login} />
                    <Route exact path="/modality" component={permissions ? ModalityList : Login} />
                    <Route exact path="/schoolYear" component={permissions ? SchoolYearList : Login} />
                    <Route exact path="/speciality" component={permissions ? SpecialityList : Login} />
                    <Route exact path="/periodAcademic" component={permissions ? AcademicPeriodList : Login} />
                    <Route exact path="/indicatorAcademic" component={permissions ? AcademicIndicatorList : Login} />
                    <Route exact path="/gradeAssignment" component={permissions ? GradeAssignmentList : Login} />
                    {/* ACADEMIC */} 
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
