import { gql } from '@apollo/client';

export const QUERY_GET_ALL_COMPONENT_EVALUATIVE = gql`
  query getAllEvaluativeComponent {
    data: getAllEvaluativeComponent(orderCreated: true, allData: true) {
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
