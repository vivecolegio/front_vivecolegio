import { gql } from '@apollo/client';

export const QUERY_GET_ALL_GENDER = gql`
  query getAllGender {
    data: getAllGender(orderCreated: true, allData: true) {
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

export const QUERY_GET_GENDER = gql`
  query getGender($id: String!) {
    data: getGender(id: $id) {
      id
      name     
    }
  }
`;
