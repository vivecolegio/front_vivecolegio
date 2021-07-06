import { gql } from '@apollo/client';

export const QUERY_GET_ALL_CAMPUS = gql`
  query getAllCampus {
    data: getAllCampus(orderCreated: true, allData: true) {
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

export const QUERY_GET_CAMPUS = gql`
  query getCampus($id: String!) {
    data: getCampus(id: $id) {
      id
      name
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
