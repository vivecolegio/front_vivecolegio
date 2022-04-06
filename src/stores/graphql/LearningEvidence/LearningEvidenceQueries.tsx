import { gql } from '@apollo/client';

export const QUERY_GET_ALL_LEARNING_EVIDENCE = gql`
  query getAllEvidenceLearning($schoolId: String!) {
    data: getAllEvidenceLearning(orderCreated: true, allData: true, schoolId: $schoolId) {
      edges {
        cursor
        node {
          id
          name
          active
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_LEARNING_EVIDENCE = gql`
  query getEvidenceLearning($id: String!) {
    data: getEvidenceLearning(id: $id) {
      id
      name
      abbreviation
      schoolId
      school {
        id
        name
      }
      generalEvidenceLearningId 
      generalEvidenceLearning {
        id 
        name
      }
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

export const QUERY_GET_DROPDOWNS_LEARNING_EVIDENCE = gql`
  query getDropdownsEvidenceLearning {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataGeneralAreas: getAllGeneralEvidenceLearning(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
