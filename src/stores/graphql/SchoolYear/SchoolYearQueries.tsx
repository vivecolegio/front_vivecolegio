import { gql } from '@apollo/client';

export const QUERY_GET_ALL_SCHOOL_YEAR = gql`
  query getAllSchoolYear {
    data: getAllSchoolYear(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          schoolYear
          folioNumber  
          startDate
          endDate
          active          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_SCHOOL_YEAR = gql`
  query getSchoolYear($id: String!) {
    data: getSchoolYear(id: $id) {
      id   
      schoolYear
      folioNumber  
      startDate
      endDate
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

export const QUERY_GET_DROPDOWNS_SCHOOL_YEAR = gql`
  query getDropdownsSchoolYear {
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
