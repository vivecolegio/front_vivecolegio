import { gql } from '@apollo/client';

export const QUERY_GET_ALL_GRADE_ASSIGNMENT = gql`
  query getAllGradeAssignment {
    data: getAllGradeAssignment(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          hourlyintensity                            
          academicAsignature {
            name
          }           
          academicGrade {    
            name
          }             
          active          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_GRADE_ASSIGNMENT = gql`
  query getGradeAssignment($id: String!) {
    data: getGradeAssignment(id: $id) {
      id   
      version
      hourlyintensity              
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

export const QUERY_GET_DROPDOWNS_GRADE_ASSIGNMENT = gql`
  query getDropdownsAcademicArea {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
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
