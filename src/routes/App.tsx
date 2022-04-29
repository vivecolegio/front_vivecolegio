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
import AcademicAsignatureCourseList from '../components/app/AcademicAsignatureCourse/AcademicAsignatureCourseList';
import AcademicDayList from '../components/app/AcademicDay/AcademicDayList';
import AcademicHourList from '../components/app/AcademicHour/AcademicHourList';
import AcademicPeriodList from '../components/app/AcademicPeriod/AcademicPeriodList';
import AdministratorCampusList from '../components/app/AdministratorsCampus/AdministratorCampusList';
import AdministratorSchoolList from '../components/app/AdministratorsSchool/AdministratorSchoolList';
import ChatApp from '../components/app/Aplications/Chat/Chat';
import ElectionsApp from '../components/app/Aplications/Elections/Elections';
import ForumApp from '../components/app/Aplications/Forums/Forum';
import ForumListApp from '../components/app/Aplications/Forums/ForumList';
import Survey from '../components/app/Aplications/Survey/Survey';
import SurveyDetail from '../components/app/Aplications/Survey/SurveyDetail';
import { default as AcademicIndicatorList, default as BasicLearningDutiesList } from '../components/app/BasicLearningDuties/BasicLearningDutiesList';
import CampusList from '../components/app/Campus/CampusList';
import ClassroomPlan from '../components/app/ClassroomPlan/ClassroomPlan';
import ClassroomPlanDetail from '../components/app/ClassroomPlan/ClassroomPlanDetail';
import CoEvaluation from '../components/app/CoEvaluation/CoEvaluation';
import CoEvaluationStudents from '../components/app/CoEvaluationStudents/CoEvaluationStudents';
import ComponentEvaluativeList from '../components/app/ComponentEvaluative/ComponentEvaluativeList';
import CoordinatorCampusList from '../components/app/CoordinatorCampus/CoordinatorCampusList';
import CourseList from '../components/app/Course/CourseList';
import Analytics from '../components/app/Dashboards/Analytics';
import DocumentTypeList from '../components/app/DocumentType/DocumentTypeList';
import EducationLevelList from '../components/app/EducationLevel/EducationLevelList';
import ExperienceLearningList from '../components/app/ExperienceLearning/ExperienceLearningList';
import GenderList from '../components/app/Gender/GenderList';
import GeneralAreaList from '../components/app/GeneralAcademic/Area/AreaList';
import GeneralAsignatureList from '../components/app/GeneralAcademic/Asignature/AsignatureList';
import GeneralCycleList from '../components/app/GeneralAcademic/Cycle/CycleList';
import GeneralGradeList from '../components/app/GeneralAcademic/Grade/GradeList';
import GeneralPerformanceLevelList from '../components/app/GeneralAcademic/PerformanceLevel/PerformanceLevelList';
import GeneralStandardList from '../components/app/GeneralAcademic/Standard/StandardList';
import GradeAssignmentList from '../components/app/GradeAssignment/GradeAssignmentList';
import GuardianList from '../components/app/Guardian/GuardianList';
import InboxDetail from '../components/app/Inbox/InboxDetail';
import LearningList from '../components/app/Learning/LearningList';
import LearningEvidenceList from '../components/app/LearningEvidence/LearningEvidenceList';
import Login from '../components/app/Login/Login';
import MenuList from '../components/app/Menu/MenuList';
import ModalityList from '../components/app/Modality/ModalityList';
import ModuleList from '../components/app/Module/ModuleList';
import MunicipalityList from '../components/app/Municipality/MunicipalityList';
import MyClasessList from '../components/app/MyClasses/MyClasessList';
import Profile from '../components/app/Profile/Profile';
import QuestionCategoryTestOnlineList from '../components/app/QuestionCategoryTestOnline/QuestionCategoryTestOnlineList';
import QuestionsBankTestOnline from '../components/app/QuestionsBankTestOnline/QuestionsBankTestOnline';
import QuestionTestOnlineList from '../components/app/QuestionTestOnline/QuestionTestOnlineList';
import RoleList from '../components/app/Role/RoleList';
import RubricCriteriaList from '../components/app/RubricCriteria/RubricCriteriaList';
import RubricCriteriaValuation from '../components/app/RubricCriteriaValuation/RubricCriteriaValuation';
import RubricValuation from '../components/app/RubricValuation/RubricValuation';
import OfficeSchedule from '../components/app/Schedule/OfficeSchedule';
import SchoolSchedule from '../components/app/Schedule/SchoolSchedule';
import SchoolList from '../components/app/School/SchoolList';
import SchoolYearList from '../components/app/SchoolYear/SchoolYearList';
import SelfValuation from '../components/app/SelfValuation/SelfValuation';
import SpecialityList from '../components/app/Speciality/SpecialityList';
import Spreadsheet from '../components/app/Spreadsheet/Spreadsheet';
import StudentsList from '../components/app/Students/StudentsList';
import SubmenuList from '../components/app/Submenu/SubmenuList';
import TeacherList from '../components/app/Teacher/TeacherList';
import TraditionalValuation from '../components/app/TraditionalValuation/TraditionalValuation';
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
                <Route path="/home" element={ <Home/> } />
                {permissions ? (
                  <>                  
                    <Route path="/profile" element={ <Profile/> } />
                    <Route path="/myScheduleOffice" element={ <OfficeSchedule/> } />
                    <Route path="/myScheduleShool" element={ <SchoolSchedule/> } />
                    <Route path="/messages" element={ <InboxDetail/> } />
                    {/* ADMIN */}
                    <Route path="/roles" element={ <RoleList/>  }/>
                    <Route path="/users" element={ <UserList/> } />
                    <Route path="/modules" element={ <ModuleList/> } />
                    <Route path="/menus" element={ <MenuList/> } />
                    <Route path="/submenus" element={ <SubmenuList/>} /> 
                    <Route path="/genders" element={ <GenderList/> } />
                    <Route path="/documentTypes" element={ <DocumentTypeList/> } />
                    <Route path="/municipality" element={ <MunicipalityList/> } />
                    {/* ADMIN */}     
                    {/* PERSONAL */}                
                    <Route path="/schools" element={ <SchoolList/> } />
                    <Route path="/campus" element={ <CampusList/> } />
                    <Route path="/students" element={ <StudentsList/> } />
                    <Route path="/teachers" element={ <TeacherList/> } />
                    <Route path="/guardians" element={ <GuardianList/> } />
                    <Route path="/administratorsSchool" element={ <AdministratorSchoolList/> } />
                    <Route path="/administratorsCampus" element={ <AdministratorCampusList/> } />
                    <Route path="/coordinatorsCampus" element={ <CoordinatorCampusList/> } />
                    {/* PERSONAL */}
                    {/* GENERAL ACADEMIC */}        
                    <Route path="/general/areas" element={ <GeneralAreaList/> } />
                    <Route path="/general/asignatures" element={ <GeneralAsignatureList/> } />
                    <Route path="/general/cycles" element={ <GeneralCycleList/> } />
                    <Route path="/general/performanceLevel" element={ <GeneralPerformanceLevelList/> } />
                    <Route path="/general/standardAcademic" element={ <GeneralStandardList/> } />
                    <Route path="/general/grades" element={ <GeneralGradeList/> } />
                    {/* GENERAL ACADEMIC */} 
                    {/* ACADEMIC */}        
                    <Route path="/areas" element={ <AreaList/> } />
                    <Route path="/asignatures" element={ <AsignatureList/> } />
                    <Route path="/performanceLevel" element={ <PerformanceLevelList/> } />
                    <Route path="/standardAcademic" element={ <StandardList/> } />
                    <Route path="/grades" element={ <GradeList/> } />
                    <Route path="/educationLevel" element={ <EducationLevelList/> } />
                    <Route path="/evaluativeComponent" element={ <ComponentEvaluativeList/> } />
                    <Route path="/modality" element={ <ModalityList/> } />
                    <Route path="/schoolYear" element={ <SchoolYearList/> } />
                    <Route path="/speciality" element={ <SpecialityList/> } />
                    <Route path="/periodAcademic" element={ <AcademicPeriodList/> } />
                    <Route path="/indicatorAcademic" element={ <AcademicIndicatorList/> } />
                    <Route path="/gradeAssignment" element={ <GradeAssignmentList/> } />
                    <Route path="/academicDay" element={ <AcademicDayList/> } />
                    <Route path="/academicHour" element={ <AcademicHourList/> } />
                    <Route path="/course" element={ <CourseList/> } />
                    <Route path="/academicAsignatureCourse" element={ <AcademicAsignatureCourseList/> } />
                    <Route path="/dba" element={ <BasicLearningDutiesList/> } />
                    <Route path="/learning" element={ <LearningList/> } />
                    <Route path="/evidenceLearning" element={ <LearningEvidenceList/> } />
                    <Route path="/experienceLearning" element={ <ExperienceLearningList/> } />
                    <Route path="/myClasses" element={ <MyClasessList/> } />
                    <Route path="/traditionalValuation" element={ <TraditionalValuation/> } />
                    <Route path="/selfValuation" element={ <SelfValuation/> } />
                    <Route path="/rubricCriteria" element={ <RubricCriteriaList/> } />
                    <Route path="/rubricValuation" element={ <RubricValuation/> } />
                    <Route path="/rubricCriteriaValuation" element={ <RubricCriteriaValuation/> } />
                    <Route path="/coEvaluation" element={ <CoEvaluation/> } />
                    <Route path="/coEvaluationStudents" element={ <CoEvaluationStudents/> } />
                    <Route path="/spreadsheet" element={ <Spreadsheet/> } />
                    <Route path="/questionCategoryTestOnline" element={ <QuestionCategoryTestOnlineList/> } />
                    <Route path="/questionTestOnline" element={ <QuestionTestOnlineList/> } />
                    <Route path="/questionsBank" element={ <QuestionsBankTestOnline/> } />
                    <Route path="/classroomPlan" element={ <ClassroomPlan/> } />
                    <Route path="/classroomPlanDetail" element={ <ClassroomPlanDetail/> } />
                    {/* ACADEMIC */} 
                    {/* APPLICATIONS */} 
                    <Route path="/chat" element={ <ChatApp/> } />
                    <Route path="/foros" element={ <ForumListApp/> } />
                    <Route path="/foro-detalle" element={ <ForumApp/> } />
                    <Route path="/elecciones-personero" element={ <ElectionsApp/> } />
                    <Route path="/encuestas" element={ <Survey/> } />
                    <Route path="/encuestas-detalle" element={ <SurveyDetail/> } />
                    <Route path="/informe-avance-desempeno" element={ <Analytics/> } />

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
