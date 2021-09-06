import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ASIGNATURE = gql`
  query getAllGeneralAcademicAsignature {
    data: getAllGeneralAcademicAsignature(orderCreated: true, allData: true) {
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

export const QUERY_GET_ASIGNATURE = gql`
  query getGeneralAcademicAsignature($id: String!) {
    data: getGeneralAcademicAsignature(id: $id) {
      id
      name
      version
      generalAcademicAreaId
      generalAcademicArea {
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
