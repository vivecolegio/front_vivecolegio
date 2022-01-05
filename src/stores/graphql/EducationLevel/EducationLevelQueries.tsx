import { gql } from '@apollo/client';

export const QUERY_GET_ALL_EDUCATION_LEVEL = gql`
  query getAllEducationLevel {
    data: getAllEducationLevel(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          name
          description
          active
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_EDUCATION_LEVEL = gql`
  query getEducationLevel($id: String!) {
    data: getEducationLevel(id: $id) {
      id
      name
      description
      schoolId
      school {
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

export const QUERY_GET_DROPDOWNS_EDUCATION_LEVEL = gql`
  query getDropdownsEducationLevel {
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