/* eslint-disable @typescript-eslint/naming-convention */
import { gql } from '@apollo/client';

export const QUERY_GET_VALUATIONS_STUDENT = gql`
  query getValuationStudents($id: String!) {
    data: getValuationStudents(id: $id) {
      id
      studentId
      experienceLearningId
      assessment       
      performanceLevel {
        name
      }   
    }
  }
`;

export const QUERY_GET_All_EXPERIENCE_LEARNING_AVERAGE_VALUATION = gql`
  query getAllExperienceLearningAverageValuation($evaluativeComponentId : String!, $academicPeriodId: String!, $academicAsignatureCourseId: String!) {
    data: getAllExperienceLearningAverageValuation(orderCreated: true, allData: true, evaluativeComponentId:$evaluativeComponentId, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId) {
      edges {
        cursor
        node {
          id
          studentId
          evaluativeComponentId
          average 
        }
      }    
       
    }
  }
`;

export const QUERY_GET_All_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION = gql`
  query getAllAcademicAsignatureCoursePeriodValuation($academicPeriodId: String!, $academicAsignatureCourseId: String!) {
    data: getAllAcademicAsignatureCoursePeriodValuation(orderCreated: true, allData: true, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId) {
      edges {
        cursor
        node {
          id
          studentId
          assessment    
          performanceLevel {
            name
          }      
        }
      }    
       
    }
  }
`;
