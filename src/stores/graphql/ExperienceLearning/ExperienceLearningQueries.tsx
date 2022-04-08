import { gql } from '@apollo/client';

export const QUERY_GET_ALL_EXPERIENCE_LEARNING = gql`
  query getAllExperienceLearning($campusId: String!, $academicAsignatureCourseId : String!) {
    data: getAllExperienceLearning(orderCreated: true, allData: true, campusId: $campusId, academicAsignatureCourseId : $academicAsignatureCourseId ) {
      edges {
        cursor
        node {
          id
          active
          title   
          experienceType       
          academicAsignatureCourse {
            courseId
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
  }
`;
