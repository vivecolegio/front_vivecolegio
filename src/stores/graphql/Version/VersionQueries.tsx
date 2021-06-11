import { gql } from '@apollo/client';

export const QUERY_GET_ALL_VERSION = gql`
  query getAllVersion {
    data: getAllVersion {
      edges {
        cursor
        node {
            id
            name
            description
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_VERSION = gql`
  query getVersion($id: String!) {
    data: getVersion(id: $id) {
      id
      name
      description
    }
  }
`;