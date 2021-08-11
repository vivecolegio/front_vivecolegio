import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ADMINISTRATOR = gql`
  query getAllSchoolAdministrator {
    data: getAllSchoolAdministrator(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          active         
          school  {
            id
            name
          }                       
          user {
            id
            name
            lastName
            email
            phone
          }
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ADMINISTRATOR = gql`
  query getSchoolAdministrator($id: String!) {
    data: getSchoolAdministrator(id: $id) {
      id
      schoolId     
      userId
      school  {
        id
        name
      }                  
      user {
        id
        name
        lastName
        email
        phone
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
