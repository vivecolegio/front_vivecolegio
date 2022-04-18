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
          evaluativeComponentId
          evaluativeComponent {
            id
            name
          }
          academicPeriodId
          academicPeriod {
            name
          }
          evidenciceLearningsId
          evidenciceLearnings {
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
      evaluativeComponentId
      evaluativeComponent {
        id
        name
        weight
      }
      academicPeriodId
      academicPeriod {
        name
      }
      evidenciceLearningsId
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
      experienceLearningPerformanceLevel {
        criteria
        performanceLevelId
      }
      evaluativeComponentId
      evaluativeComponent {
        name
        weight
        id
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
      evidenciceLearningsId
      evidenciceLearnings {
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

export const QUERY_GET_DROPDOWNS_EXPERIENCE_LEARNING = gql`
  query getDropdownsExperienceLearning(
    $schoolId: String!
    $academicAsignatureId: String
    $academicGradeId: String
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
    dataAcademicPeriods: getAllAcademicPeriod(
      allData: false
      orderCreated: false
      schoolId: $schoolId
      orderCustom: true
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
    dataPerformanceLevels: getAllPerformanceLevel(
      orderCreated: true
      allData: true
      schoolId: $schoolId
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
    dataEvaluativeComponents: getAllEvaluativeComponent(
      orderCreated: true
      allData: true
      schoolId: $schoolId
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
