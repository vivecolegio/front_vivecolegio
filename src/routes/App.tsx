import React, { Suspense, useEffect, useState } from 'react';
import { useClearCache } from 'react-clear-cache';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AreaList from '../components/app/Academic/Area/AreaList';
import AsignatureList from '../components/app/Academic/Asignature/AsignatureList';
import GradeList from '../components/app/Academic/Grade/GradeList';
import PerformanceLevelList from '../components/app/Academic/PerformanceLevel/PerformanceLevelList';
import StandardList from '../components/app/Academic/Standard/StandardList';
import AcademicDayList from '../components/app/AcademicDay/AcademicDayList';
import AcademicHourList from '../components/app/AcademicHour/AcademicHourList';
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
import GuardianList from '../components/app/Guardian/GuardianList';
import Login from '../components/app/Login/Login';
import MenuList from '../components/app/Menu/MenuList';
import ModalityList from '../components/app/Modality/ModalityList';
import ModuleList from '../components/app/Module/ModuleList';
import MunicipalityList from '../components/app/Municipality/MunicipalityList';
import Profile from '../components/app/Profile/Profile';
import RoleList from '../components/app/Role/RoleList';
import SchoolList from '../components/app/School/SchoolList';
import SchoolYearList from '../components/app/SchoolYear/SchoolYearList';
import SpecialityList from '../components/app/Speciality/SpecialityList';
import StudentsList from '../components/app/Students/StudentsList';
import SubmenuList from '../components/app/Submenu/SubmenuList';
import TeacherList from '../components/app/Teacher/TeacherList';
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
              <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/home" element={permissions ? <Home/> : <Login/>} />
                {permissions ? (
                  <>                  
                    <Route path="/profile" element={permissions ? <Profile/> : <Login/>} />
                    {/* ADMIN */}
                    <Route path="/roles" element={permissions ? <RoleList/> : <Login/> }/>
                    <Route path="/users" element={permissions ? <UserList/> : <Login/>} />
                    <Route path="/modules" element={permissions ? <ModuleList/> : <Login/>} />
                    <Route path="/menus" element={permissions ? <MenuList/> : <Login/>} />
                    <Route path="/submenus" element={permissions ? <SubmenuList/>: <Login/>} /> 
                    <Route path="/submenus/:idMenu" element={permissions ? <SubmenuList/>: <Login/>} /> 
                    <Route path="/genders" element={permissions ? <GenderList/> : <Login/>} />
                    <Route path="/documentTypes" element={permissions ? <DocumentTypeList/> : <Login/>} />
                    <Route path="/municipality" element={permissions ? <MunicipalityList/> : <Login/>} />
                    {/* ADMIN */}     
                    {/* PERSONAL */}                
                    <Route path="/schools" element={permissions ? <SchoolList/> : <Login/>} />
                    <Route path="/campus" element={permissions ? <CampusList/> : <Login/>} />
                    <Route path="/students" element={permissions ? <StudentsList/> : <Login/>} />
                    <Route path="/teachers" element={permissions ? <TeacherList/> : <Login/>} />
                    <Route path="/guardians" element={permissions ? <GuardianList/> : <Login/>} />
                    <Route path="/administratorsSchool" element={permissions ? <AdministratorSchoolList/> : <Login/>} />
                    <Route path="/administratorsCampus" element={permissions ? <AdministratorCampusList/> : <Login/>} />
                    <Route path="/coordinatorsCampus" element={permissions ? <CoordinatorCampusList/> : <Login/>} />
                    {/* PERSONAL */}
                    {/* GENERAL ACADEMIC */}        
                    <Route path="/general/areas" element={permissions ? <GeneralAreaList/> : <Login/>} />
                    <Route path="/general/asignatures" element={permissions ? <GeneralAsignatureList/> : <Login/>} />
                    <Route path="/general/cycles" element={permissions ? <GeneralCycleList/> : <Login/>} />
                    <Route path="/general/performanceLevel" element={permissions ? <GeneralPerformanceLevelList/> : <Login/>} />
                    <Route path="/general/standardAcademic" element={permissions ? <GeneralStandardList/> : <Login/>} />
                    <Route path="/general/grades" element={permissions ? <GeneralGradeList/> : <Login/>} />
                    {/* GENERAL ACADEMIC */} 
                    {/* ACADEMIC */}        
                    <Route path="/areas" element={permissions ? <AreaList/> : <Login/>} />
                    <Route path="/asignatures" element={permissions ? <AsignatureList/> : <Login/>} />
                    <Route path="/performanceLevel" element={permissions ? <PerformanceLevelList/> : <Login/>} />
                    <Route path="/standardAcademic" element={permissions ? <StandardList/> : <Login/>} />
                    <Route path="/grades" element={permissions ? <GradeList/> : <Login/>} />
                    <Route path="/educationLevel" element={permissions ? <EducationLevelList/> : <Login/>} />
                    <Route path="/evaluativeComponent" element={permissions ? <ComponentEvaluativeList/> : <Login/>} />
                    <Route path="/modality" element={permissions ? <ModalityList/> : <Login/>} />
                    <Route path="/schoolYear" element={permissions ? <SchoolYearList/> : <Login/>} />
                    <Route path="/speciality" element={permissions ? <SpecialityList/> : <Login/>} />
                    <Route path="/periodAcademic" element={permissions ? <AcademicPeriodList/> : <Login/>} />
                    <Route path="/indicatorAcademic" element={permissions ? <AcademicIndicatorList/> : <Login/>} />
                    <Route path="/gradeAssignment" element={permissions ? <GradeAssignmentList/> : <Login/>} />
                    <Route path="/academicDay" element={permissions ? <AcademicDayList/> : <Login/>} />
                    <Route path="/academicHour" element={permissions ? <AcademicHourList/> : <Login/>} />
                    {/* ACADEMIC */} 
                  </>
                ) : (
                  <></>
                )}
              </Routes>
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
