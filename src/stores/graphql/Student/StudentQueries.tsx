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
            phone
            email
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

export const QUERY_GET_DROPDOWNS_STUDENT = gql`
  query getDropdownsStudent ($type : String!) {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataCampus: getAllCampus(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataRoles: getAllRoleType(type: $type) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataGenders: getAllGender(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataDocumentTypes: getAllDocumentType(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

