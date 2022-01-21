import { gql } from '@apollo/client';

export const QUERY_GET_ALL_AREA = gql`
  query getAllAcademicArea($schoolId: String!) {
    data: getAllAcademicArea(orderCreated: true, allData: true, schoolId: $schoolId) {
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

export const QUERY_GET_AREA = gql`
  query getAcademicArea($id: String!) {
    data: getAcademicArea(id: $id) {
      id
      name
      abbreviation
      schoolId
      school {
        id
        name
      }
      generalAcademicAreaId 
      generalAcademicArea {
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

export const QUERY_GET_DROPDOWNS_AREA = gql`
  query getDropdownsAcademicArea {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataGeneralAreas: getAllGeneralAcademicArea(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
