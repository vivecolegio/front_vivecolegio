import { gql } from '@apollo/client';

export const QUERY_GET_ALL_COURSE = gql`
  query getAllCourse($campusId: String!, $academicGradeId: String!, $schoolId: String) {
    data: getAllCourse(orderCreated: true, allData: true, campusId: $campusId, academicGradeId: $academicGradeId, schoolId: $schoolId) {
      edges {
        cursor
        node {
          id
          name
          campus {
            id
            name
          }
          teacher {
            user {
            id
            name
            lastName
            }
          }
          academicDay{
            id
            name
          }
          order           
          active          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_COURSE = gql`
  query getCourse($id: String!) {
    data: getCourse(id: $id) {
      id   
      version 
      name
      order  
      teacherId
      teacher {
        user {
          id
          name
          lastName
        }
      }
      academicDayId
      academicDay {
        id
        name
      }
      studentsId
      students {
        id
        code
        user{
          id
          name
          lastName
          email
          phone
          gender {
            name
          }
          documentNumber
          documentType {
            name
          }
        }        
      }          
      academicGradeId              
      academicGrade {
        id 
        name
      }                  
      campusId
      campus {
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

export const QUERY_GET_DROPDOWNS_COURSE = gql`
  query getDropdownsCourse($schoolId: String!) {
    dataCampus: getAllCampus(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }    
  }
`;
