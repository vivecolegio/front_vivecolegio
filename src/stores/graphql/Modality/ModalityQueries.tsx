import { gql } from '@apollo/client';

export const QUERY_GET_ALL_MODALITY = gql`
  query getAllModality {
    data: getAllModality(orderCreated: true, allData: true) {
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

export const QUERY_GET_MODALITY = gql`
  query getModality($id: String!) {
    data: getModality(id: $id) {
      id
      name  
      code   
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

export const QUERY_GET_DROPDOWNS_MODALITY = gql`
  query getDropdownsModality {
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
