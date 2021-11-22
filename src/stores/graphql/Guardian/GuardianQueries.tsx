import { gql } from '@apollo/client';

export const QUERY_GET_ALL_GUARDIAN = gql`
  query getAllGuardian {
    data: getAllGuardian(orderCreated: true, allData: true) {
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

export const QUERY_GET_GUARDIAN = gql`
  query getGuardian($id: String!) {
    data: getGuardian(id: $id) {
      id
      schoolId     
      school  {
        id
        name
      }                  
      campusId     
      campus  {
        id
        name
      }                  
      userId
      user {
        id
        name
        lastName                  
        phone
        email
        birthdate
        username
        password
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
