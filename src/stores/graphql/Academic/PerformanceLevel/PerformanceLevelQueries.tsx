import { gql } from '@apollo/client';

export const QUERY_GET_ALL_PERFORMANCE_LEVEL = gql`
  query getAllPerformanceLevel {
    data: getAllPerformanceLevel(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          name
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
