import { gql } from '@apollo/client';

export const QUERY_GET_ALL_EXPERIENCE_LEARNING = gql`
  query getAllExperienceLearning($campusId: String!, $academicAsignatureCourseId : String!, $academicPeriodId: String) {
    data: getAllExperienceLearning(orderCreated: true, allData: true, campusId: $campusId, academicAsignatureCourseId : $academicAsignatureCourseId, academicPeriodId: $academicPeriodId ) {
      edges {
        cursor
        node {
          id
          active
          title   
          experienceType 
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
      totalCount
    }
  }
`;

export const QUERY_GET_EXPERIENCE_LEARNING = gql`
  query getExperienceLearning($id: String!) {
    data: getExperienceLearning(id: $id) {
      id   
      title   
      description
      fecha
      academicPeriodId
      academicPeriod {
        id
        name
      }
      learningsId
      learnigs {
        id
        statement
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
  query getDropdownsExperienceLearning($schoolId: String!, $academicAsignatureId: String!, $academicGradeId: String!) {
    dataCampus: getAllCampus(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataLearnings: getAllLearning(allData: false, orderCreated: false, schoolId: $schoolId, academicAsignatureId: $academicAsignatureId, academicGradeId: $academicGradeId) {
      edges {
        node {
          id
          statement
        }
      }
    }
    dataAcademicPeriods: getAllAcademicPeriod(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
