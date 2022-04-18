import { gql } from '@apollo/client';

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION = gql`
  query getAllExperienceLearningCoEvaluationValuation($experienceLearningId: String!) {
    data: getAllExperienceLearningCoEvaluationValuation(orderCreated: true, allData: true, experienceLearningId: $experienceLearningId) {
      edges {
        cursor
        node {
          id                                      
          active  
          assessment          
          studentId
          student {
            id
            code
            user {
              id
              name
              lastName
            }
          }        
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION = gql`
  query getExperienceLearningCoEvaluationValuation($id: String!) {
    data: getExperienceLearningCoEvaluationValuation(id: $id) {
      id        
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
