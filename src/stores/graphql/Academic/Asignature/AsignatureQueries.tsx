import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ASIGNATURE = gql`
  query getAllAcademicAsignature($schoolId: String!) {
    data: getAllAcademicAsignature(orderCreated: true, allData: true, schoolId: $schoolId) {
      edges {
        cursor
        node {
          id
          name         
          active          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ASIGNATURE = gql`
  query getAcademicAsignature($id: String!) {
    data: getAcademicAsignature(id: $id) {
      id
      name
      abbreviation
      code
      weight
      version
      schoolId
      school {
        id
        name
      }
      academicAreaId
      academicArea {
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

export const QUERY_GET_DROPDOWNS_ASIGNATURE = gql`
  query getDropdownsAcademicAsignature($schoolId: String!) {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataAreas: getAllAcademicArea(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
