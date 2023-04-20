import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ASIGNATURE = gql`
  query getAllAcademicAsignature($schoolId: String!, $academicAreaId: String!, $allData: Boolean!) {
    data: getAllAcademicAsignature(orderCreated: true, allData: $allData, schoolId: $schoolId, academicAreaId: $academicAreaId) {
      edges {
        cursor
        node {
          id
          name 
          order
          abbreviation     
          active 
          generalAcademicAsignature {
            id 
            name
          }         
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
      order
      abbreviation
      code
      minWeight
      maxWeight
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
      generalAcademicAsignatureId
      generalAcademicAsignature {
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
  query getDropdownsAcademicAsignature($schoolId: String!, $generalAcademicAreaId: String) {
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
    dataGeneralAsignatures: getAllGeneralAcademicAsignature(allData: false, orderCreated: false, generalAcademicAreaId: $generalAcademicAreaId) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
