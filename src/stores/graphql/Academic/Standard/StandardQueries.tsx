import { gql } from '@apollo/client';

export const QUERY_GET_ALL_STANDARD = gql`
  query getAllAcademicStandard {
    data: getAllAcademicStandard(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id          
          active
          standard                
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_STANDARD = gql`
  query getAcademicStandard($id: String!) {
    data: getAcademicStandard(id: $id) {
      id
      standard
      schoolId
      school {
        id
        name
      }
      generalAcademicStandardId
      generalAcademicStandard {
        id
        standard
      }
      academicAsignatureId 
      academicAsignature {
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
