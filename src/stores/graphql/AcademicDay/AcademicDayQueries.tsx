import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ACADEMIC_DAY = gql`
  query getAllAcademicDay {
    data: getAllAcademicDay(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          active         
          workingDay
          typeDay         
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ACADEMIC_DAY = gql`
  query getAcademicDay($id: String!) {
    data: getAcademicDay(id: $id) {
      id
      workingDay
      typeDay                       
      campusId     
      campus  {
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

export const QUERY_GET_DROPDOWNS_ACADEMIC_DAY = gql`
  query getDropdownsAcademicDay {
    dataCampus: getAllCampus(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
