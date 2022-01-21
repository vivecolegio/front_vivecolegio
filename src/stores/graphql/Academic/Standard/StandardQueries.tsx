import { gql } from '@apollo/client';

export const QUERY_GET_ALL_STANDARD = gql`
  query getAllAcademicStandard($schoolId: String!) {
    data: getAllAcademicStandard(orderCreated: true, allData: true, schoolId: $schoolId) {
      edges {
        cursor
        node {
          id          
          active
          standard                
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_STANDARD = gql`
  query getAcademicStandard($id: String!) {
    data: getAcademicStandard(id: $id) {
      id
      standard
      schoolId
      school {
        id
        name
      }
      generalAcademicStandardId
      generalAcademicStandard {
        id
        standard
      }
      academicAsignatureId 
      academicAsignature {
        id
        name
      }
      generalAcademicCycleId 
      generalAcademicCycle {
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

export const QUERY_GET_DROPDOWNS_STANDARD = gql`
  query getDropdownsAcademicStandard($schoolId: String!) {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataAsignatures: getAllAcademicAsignature(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataCycles: getAllGeneralAcademicCycle(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataGeneralStandards: getAllGeneralAcademicStandard(allData: false, orderCreated: false) {
      edges {
        node {
          id
          standard
        }
      }
    }
  }
`;
