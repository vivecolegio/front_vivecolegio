import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ROLE = gql`
  query getAllRole {
    data: getAllRole(orderCreated: true, allData: true) {
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

export const QUERY_GET_ROLE = gql`
  query getRole($id: String!) {
    data: getRole(id: $id) {
      id
      name
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
