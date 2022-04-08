import { gql } from '@apollo/client';

export const QUERY_GET_ALL_PERFORMANCE_LEVEL = gql`
  query getAllPerformanceLevel($schoolId: String!) {
    data: getAllPerformanceLevel(orderCreated: true, allData: true, schoolId: $schoolId) {
      edges {
        cursor
        node {
          id
          name
          topScore
          minimumScore
          active
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
      topScore
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
  query getDropdownsPerformanceLevel {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
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
  }
`;
