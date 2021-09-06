import { gql } from '@apollo/client';

export const QUERY_GET_ALL_AREA = gql`
  query getAllAcademicArea {
    data: getAllAcademicArea(orderCreated: true, allData: true) {
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

export const QUERY_GET_AREA = gql`
  query getAcademicArea($id: String!) {
    data: getAcademicArea(id: $id) {
      id
      name
      abbreviation
      schoolId
      school {
        id
        name
      }
      generalAcademicAreaId 
      generalAcademicArea {
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
