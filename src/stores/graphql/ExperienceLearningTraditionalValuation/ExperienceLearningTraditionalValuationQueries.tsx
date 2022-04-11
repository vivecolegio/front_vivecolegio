import { gql } from '@apollo/client';

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_TRADITIONAL_VALUATION = gql`
  query getAllExperienceLearningTraditionalValuation($campusId: String!) {
    data: getAllExperienceLearningTraditionalValuation(orderCreated: true, allData: true, campusId: $campusId) {
      edges {
        cursor
        node {
          id                                      
          active          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_EXPERIENCE_LEARNING_TRADITIONAL_VALUATION = gql`
  query getExperienceLearningTraditionalValuation($id: String!) {
    data: getExperienceLearningTraditionalValuation(id: $id) {
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
