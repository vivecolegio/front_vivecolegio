import { gql } from '@apollo/client';

export const QUERY_GET_ALL_COMPONENT_EVALUATIVE = gql`
  query getAllEvaluativeComponent($schoolId: String!) {
    data: getAllEvaluativeComponent(orderCreated: true, allData: true, schoolId: $schoolId) {
      edges {
        cursor
        node {
          id
          name  
          weight       
          active          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_COMPONENT_EVALUATIVE = gql`
  query getEvaluativeComponent($id: String!) {
    data: getEvaluativeComponent(id: $id) {
      id
      name      
      weight
      default
      type
      academicAreasId
      academicAreas {
        id
        name
      }
      academicAsignaturesId
      academicAsignatures {
        id
        name
      }
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

export const QUERY_GET_DROPDOWNS_COMPONENT_EVALUATIVE = gql`
  query getDropdownsComponentEvaluative ($schoolId: String!) {
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

export const QUERY_GET_EVALUATIVE_COMPONENT_TYPE = gql`
    query getAllEvaluativeComponentType {
      __type(name: "EvaluativeComponentType") {
        name
        enumValues {
          name
        }
      }
    }
`;