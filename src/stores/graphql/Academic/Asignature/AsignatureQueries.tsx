import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ASIGNATURE = gql`
  query getAllAcademicAsignature {
    data: getAllAcademicAsignature(orderCreated: true, allData: true) {
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
  query getAcademicAsignature($id: String!) {
    data: getAcademicAsignature(id: $id) {
      id
      name
      abbreviation
      code
      weight
      version
      schoolId
      school {
        id
        name
      }
      academicAreaId
      academicArea {
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
