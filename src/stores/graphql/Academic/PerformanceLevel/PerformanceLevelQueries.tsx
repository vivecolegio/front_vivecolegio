import { gql } from '@apollo/client';

export const QUERY_GET_ALL_PERFORMANCE_LEVEL = gql`
  query getAllPerformanceLevel($schoolId: String!) {
    data: getAllPerformanceLevel(orderCreated: true, allData: true, schoolId: $schoolId) {
      edges {
        cursor
        node {
          id
          name
          type
          topScore
          minimumScore
          active
          category
          categoryGrade
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_PERFORMANCE_LEVEL_ASIGNATURE_COURSE = gql`
  query getAllPerformanceLevelAcademicAsignatureCourse($academicAsignatureCourseId: String!) {
    data: getAllPerformanceLevelAcademicAsignatureCourse(academicAsignatureCourseId: $academicAsignatureCourseId) {
      edges {
        cursor
        node {
          id
          name
          type
          topScore
          minimumScore
          active
          category
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_PERFORMANCE_LEVEL_COURSE = gql`
  query getAllPerformanceLevelAcademicCourse($courseId: String!) {
    data: getAllPerformanceLevelAcademicCourse(courseId: $courseId) {
      edges {
        cursor
        node {
          id
          name
          type
          topScore
          minimumScore
          active
          category
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_PERFORMANCE_LEVEL = gql`
  query getPerformanceLevel($id: String!) {
    data: getPerformanceLevel(id: $id) {
      id
      name
      colorHex
      abbreviation
      topScore
      type
      campusId
      campus {
        id
        name
      }
      minimumScore
      generalPerformanceLevelId
      generalPerformanceLevel {
        id
        name
      }
      schoolId
      school {
        id 
        name
      }
      academicGradesId
      academicGrades {
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

export const QUERY_GET_DROPDOWNS_PERFORMANCE_LEVEL = gql`
  query getDropdownsPerformanceLevel ($schoolId: String!) {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataCampus: getAllCampus(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataGeneralPerformanceLevels: getAllGeneralPerformanceLevel(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataAcademicGrade: getAllAcademicGrade(orderCreated: false, allData: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const QUERY_GET_PERFORMANCE_LEVEL_TYPE = gql`
    query getAllPerformanceLevelType {
      __type(name: "PerformanceLevelType") {
        name
        enumValues {
          name
        }
      }
    }
`;
