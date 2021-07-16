import { gql } from '@apollo/client';

export const QUERY_GET_ALL_USER = gql`
  query getAllUser {
    data: getAllUser(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          name
          active        
          lastName                  
          phone
          email
          role {
            name
          }
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_USER = gql`
  query getUser($id: String!) {
    data: getUser(id: $id) {
      id
      name
      lastName                  
      phone
      email
      birthdate
      genderId
      roleId
      documentTypeId
      documentNumber
      role {
        id
        name
      }
      gender {
        id
        name
      }
      documentType {
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
