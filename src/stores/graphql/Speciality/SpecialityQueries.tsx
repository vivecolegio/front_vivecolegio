import { gql } from '@apollo/client';

export const QUERY_GET_ALL_SPECIALITY = gql`
  query getAllSpecialty {
    data: getAllSpecialty(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          name  
          code       
          active          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_SPECIALITY = gql`
  query getSpecialty($id: String!) {
    data: getSpecialty(id: $id) {
      id
      name     
      code    
      version
      modalityId
      modality {
        id
        name
      }
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

export const QUERY_GET_DROPDOWNS_SPECIALITY = gql`
  query getDropdownsSpeciality {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataModalities: getAllModality(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;