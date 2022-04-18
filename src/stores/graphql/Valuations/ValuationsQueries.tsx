/* eslint-disable @typescript-eslint/naming-convention */
import { gql } from '@apollo/client';

export const QUERY_GET_VALUATIONS_STUDENT = gql`
  query getValuationStudents($id: String!) {
    data: getValuationStudents(id: $id) {
      
          id
          studentId
          experienceLearningId
          assessment       
       
    }
  }
`;

export const QUERY_GET_All_EXPERIENCE_LEARNING_AVERAGE_VALUATION = gql`
  query getAllExperienceLearningAverageValuation($id: String!) {
    data: getAllExperienceLearningAverageValuation(id: $id) {
      
          id
          studentId
          experienceLearningId
          assessment       
       
    }
  }
`;
