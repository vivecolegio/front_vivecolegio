import { gql } from '@apollo/client';

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION = gql`
  query getAllExperienceLearningSelfAssessmentValuation($experienceLearningId: String!, $studentId: String) {
    data: getAllExperienceLearningSelfAssessmentValuation(orderCreated: true, allData: true, experienceLearningId: $experienceLearningId, studentId: $studentId) {
      edges {
        cursor
        node {
          id                                      
          active  
          assessment
          observations
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

export const QUERY_GET_EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION = gql`
  query getExperienceLearningSelfAssessmentValuation($id: String!) {
    data: getExperienceLearningSelfAssessmentValuation(id: $id) {
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
