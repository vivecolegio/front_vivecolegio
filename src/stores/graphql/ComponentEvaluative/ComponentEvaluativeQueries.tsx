import { gql } from '@apollo/client';

export const QUERY_GET_ALL_COMPONENT_EVALUATIVE = gql`
  query getAllEvaluativeComponent($schoolId: String!) {
    data: getAllEvaluativeComponent(orderCreated: true, allData: true, schoolId: $schoolId) {
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

export const QUERY_GET_COMPONENT_EVALUATIVE = gql`
  query getEvaluativeComponent($id: String!) {
    data: getEvaluativeComponent(id: $id) {
      id
      name      
      weight
      version
      schoolId
      school {
        id
        name
      }      
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

export const QUERY_GET_DROPDOWNS_COMPONENT_EVALUATIVE = gql`
  query getDropdownsComponentEvaluative {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
