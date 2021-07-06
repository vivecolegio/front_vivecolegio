import { gql } from '@apollo/client';

export const QUERY_GET_ALL_DOCUMENT_TYPE = gql`
  query getAllDocumentType {
    data: getAllDocumentType(orderCreated: true, allData: true) {
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

export const QUERY_GET_DOCUMENT_TYPE = gql`
  query getDocumentType($id: String!) {
    data: getDocumentType(id: $id) {
      id
      name     
    }
  }
`;
