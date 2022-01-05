import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ACADEMIC_INDICATOR = gql`
  query getAllAcademicIndicator {
    data: getAllAcademicIndicator(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          indicator         
          active          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ACADEMIC_INDICATOR = gql`
  query getAcademicIndicator($id: String!) {
    data: getAcademicIndicator(id: $id) {
      id   
      version
      indicator
      academicStandardId              
      academicStandard {
        id 
        standard
      }   
      academicAsignatureId              
      academicAsignature {
        id 
        name
      }
      academicGradeId              
      academicGrade {
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

export const QUERY_GET_DROPDOWNS_ACADEMIC_INDICATOR = gql`
  query getDropdownsAcademicIndicator {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataStandards: getAllAcademicStandard(allData: false, orderCreated: false) {
      edges {
        node {
          id
          standard
        }
      }
    }
    dataAsignatures: getAllAcademicAsignature(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataGrades: getAllAcademicGrade(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
