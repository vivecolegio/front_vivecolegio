import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ACADEMIC_PERIOD = gql`
  query getAllAcademicPeriod {
    data: getAllAcademicPeriod(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          schoolYear {
            schoolYear
          }
          startDate
          endDate
          weight
          active          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ACADEMIC_PERIOD = gql`
  query getAcademicPeriod($id: String!) {
    data: getAcademicPeriod(id: $id) {
      id   
      schoolYear {
        id
        schoolYear
      }     
      startDate
      endDate
      weight
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
