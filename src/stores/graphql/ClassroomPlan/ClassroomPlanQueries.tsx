import { gql } from '@apollo/client';

export const QUERY_GET_ALL_CLASSROOM_PLAN = gql`
  query getAllClassroomPlan($academicAsignatureCourseId: String!) {
    data: getAllClassroomPlan(orderCreated: true, allData: true, academicAsignatureCourseId: $academicAsignatureCourseId) {
      edges {
        cursor
        node {
          id
          startDate
          endDate             
          active
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_CLASSROOM_PLAN = gql`
  query getClassroomPlan($id: String!) {
    data: getClassroomPlan(id: $id) {
      id     
      version
      startDate
      endDate
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

export const QUERY_GET_DROPDOWNS_CLASSROOM_PLAN = gql`
  query getDropdownsAcademicArea($schoolId: String!, $campusId: String!) {
    dataCampus: getAllCampus(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataAsignatures: getAllAcademicAsignature(
      allData: false
      orderCreated: false
      schoolId: $schoolId
    ) {
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
    dataTeachers: getAllTeacher(
      allData: false
      orderCreated: false
      campusId: [$campusId]
      schoolId: [$schoolId]
    ) {
      edges {
        node {
          id
          user {
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
  query getCoursesOfGrade($academicGradeId: String!, $campusId: String!) {
    dataCourses: getAllCourse(
      allData: false
      orderCreated: false
      academicGradeId: $academicGradeId
      campusId: $campusId
    ) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;