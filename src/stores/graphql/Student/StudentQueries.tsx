import { gql } from '@apollo/client';

export const QUERY_GET_ALL_STUDENT = gql`
  query getAllStudent {
    data: getAllStudent(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          active         
          school  {
            id
            name
          }       
          campus {
            id
            name
          }        
          user {
            id
            name
            lastName
          }
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_STUDENT = gql`
  query getStudent($id: String!) {
    data: getStudent(id: $id) {
      id
      schoolId     
      campusId
      userId
      school  {
        id
        name
      }       
      campus {
        id
        name
      }        
      user {
        id
        name
        lastName
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
