import { gql } from '@apollo/client';

export const QUERY_GET_ALL_EXPERIENCE_LEARNING = gql`
  query getAllExperienceLearning(
    $campusId: String!,
    $academicAsignatureCourseId: String
    $academicPeriodId: String
  ) {
    data: getAllExperienceLearning(
      orderCreated: true
      allData: true
      campusId: $campusId
      academicAsignatureCourseId: $academicAsignatureCourseId
      academicPeriodId: $academicPeriodId
    ) {
      edges {
        cursor
        node {
          id
          active
          title
          experienceType
          evaluativeComponentsId
          evaluativeComponents {
            id
            name
          }
          academicPeriodId
          academicPeriod {
            name
          }
          evidenceLearningsId
          evidenceLearnings {
            id
            statement
          }
          academicAsignatureCourse {
            courseId
            course {
              name
              academicGrade {
                name
              }
            }
            academicAsignature {
              name
            }
          }
          academicAsignatureCourseId
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_ASIGNATURE_COURSE = gql`
  query getAllExperienceLearningAcademicPeriodEvaluativeComponentAcademicAsignatureCourse(
    $id: String!
    $academicPeriodId: String!
    $evaluativeComponentId: String!
  ) {
    data: getAllExperienceLearningAcademicPeriodEvaluativeComponentAcademicAsignatureCourse(
      id: $id
      academicPeriodId: $academicPeriodId
      evaluativeComponentId: $evaluativeComponentId
    ) {
      id
      active
      title
      experienceType
      evaluativeComponentsId
      evaluativeComponents {
        id
        name
        weight
      }
      academicPeriodId
      academicPeriod {
        name
      }
      evidenceLearningsId
      academicAsignatureCourse {
        courseId
        course {
          name
          academicGrade {
            name
          }
        }
        academicAsignature {
          name
        }
      }
      academicAsignatureCourseId
    }
  }
`;

export const QUERY_GET_EXPERIENCE_LEARNING = gql`
  query getExperienceLearning($id: String!) {
    data: getExperienceLearning(id: $id) {
      id
      title
      description
      dateDelivery
      criteria
      onlineDelivery
      closeTestDate
      openTestDate
      shuffleQuestions
      navigationMethod
      experienceLearningPerformanceLevel {
        criteria
        performanceLevelId
      }
      evaluativeComponentsId
      evaluativeComponents {
        id
        name
        weight
      }
      academicPeriodId
      academicPeriod {
        id
        name
      }
      learningsId
      learnigs {
        id
        statement
        evidenceLearnings {
          id
          statement
        }
      }
      evidenceLearningsId
      evidenceLearnings {
        id
        statement
      }
      experienceType
      version
      createdAt
      updatedAt
      createdByUser {
        name
      }
      updatedByUser {
        name
      }
    }
  }
`;

export const QUERY_GET_ACADEMIC_PERIODS_EXPERIENCE_LEARNING = gql`
  query getAcademicPeriodSchoolYear(
    $schoolId: String!  
    $schoolYearId: String!) {
    data: getAcademicPeriodSchoolYear(schoolId: $schoolId,schoolYearId: $schoolYearId ) {
      edges {
        node {
          id
          name
          startDate
          endDate
        }
      }
    }
  }
`;

export const QUERY_GET_DROPDOWNS_EXPERIENCE_LEARNING = gql`
  query getDropdownsExperienceLearning(
    $schoolId: String!
    $academicAsignatureId: String
    $academicGradeId: String
    $schoolYearId: String!
    $academicAsignatureCourseId: String!
  ) {
    dataCampus: getAllCampus(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataLearnings: getAllLearning(
      allData: false
      orderCreated: false
      schoolId: $schoolId
      academicAsignatureId: $academicAsignatureId
      academicGradeId: $academicGradeId
    ) {
      edges {
        node {
          id
          statement
          evidenceLearnings {
            id
            statement
          }
        }
      }
    }
    dataAcademicPeriods: getAcademicPeriodSchoolYear(
      schoolId: $schoolId
      schoolYearId: $schoolYearId
    ) {
      edges {
        node {
          id
          name
          startDate
          endDate
        }
      }
    }
    dataPerformanceLevels: getAllPerformanceLevelAcademicAsignatureCourse(
      academicAsignatureCourseId : $academicAsignatureCourseId 
    ) {
      edges {
        cursor
        node {
          id
          name
          topScore
          minimumScore
        }
      }
    }
    dataEvaluativeComponents: getAllEvaluativeComponentAcademicAsignatureCourse(
      academicAsignatureCourseId : $academicAsignatureCourseId 
    ) {
      edges {
        cursor
        node {
          id
          name
          weight
        }
      }
    }    
  }
`;

export const QUERY_GET_ALL_NAVIGATION_METHOD_QUESTION_TEST_ONLINE = gql`
    query getAllNavigationMethodTestOnline {
      __type(name: "NavigationMethodTestOnline") {
        name
        enumValues {
          name
        }
      }
    }
`;

export const QUERY_GET_ALL_EXPERIENCE_TYPE = gql`
    query getAllExperienceType {
      __type(name: "ExperienceType") {
        name
        enumValues {
          name
        }
      }
    }
`;
