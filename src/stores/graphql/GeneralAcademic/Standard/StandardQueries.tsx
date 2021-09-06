import { gql } from '@apollo/client';

export const QUERY_GET_ALL_STANDARD = gql`
  query getAllGeneralAcademicStandard {
    data: getAllGeneralAcademicStandard(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id          
          active
          standard
          type
          subtype          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_STANDARD = gql`
  query getGeneralAcademicStandard($id: String!) {
    data: getGeneralAcademicStandard(id: $id) {
      id
      standard
      type
      subtype
      generalAcademicAsignatureId 
      generalAcademicAsignature {
        id
        name
      }
      generalAcademicCycleId 
      generalAcademicCycle {
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
