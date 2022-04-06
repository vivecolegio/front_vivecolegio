import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE = gql`
  query getAllAcademicAsignatureCourse($campusId: String!) {
    data: getAllAcademicAsignatureCourse(orderCreated: true, allData: true, campusId: $campusId) {
      edges {
        cursor
        node {
          id                          
          academicAsignatureId 
          academicAsignature {
            name
            generalAcademicAsignatureId          
          }           
          course {
            id 
            name
            academicGradeId
            academicGrade{
              generalAcademicGradeId
            }            
          }           
          active          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ACADEMIC_ASIGNATURE_COURSE = gql`
  query getAcademicAsignatureCourse($id: String!) {
    data: getAcademicAsignatureCourse(id: $id) {
      id   
      weight
      version        
      academicAsignatureId              
      academicAsignature {
        id 
        name
      }
      courseId              
      course {
        id 
        name
      }                  
      campusId
      campus {
        id
        name
      }   
      teacherId
      teacher {
        id
        user {
          id
          name
          lastName
        }
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

export const QUERY_GET_DROPDOWNS_ACADEMIC_ASIGNATURE_COURSE = gql`
  query getDropdownsAcademicArea($schoolId: String!, $campusId: String!) {
    dataCampus: getAllCampus(allData: false, orderCreated: false, schoolId: $schoolId) {
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
    dataGrades: getAllAcademicGrade(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataTeachers: getAllTeacher(allData: false, orderCreated: false, campusId: [$campusId], schoolId: [$schoolId]) {
      edges {
        node {
          id
          user{
            id
            name
            lastName
          }
        }
      }
    }
  }
`;

export const QUERY_GET_COURSES_OF_GRADES = gql`
  query getCoursesOfGrade ($academicGradeId: String!, $campusId: String!) {    
    dataCourses: getAllCourse(allData: false, orderCreated: false, academicGradeId: $academicGradeId, campusId: $campusId) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;