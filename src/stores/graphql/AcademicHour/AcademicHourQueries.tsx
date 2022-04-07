import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ACADEMIC_HOUR = gql`
  query getAllAcademicHour($campusId: String!, $academicDayId: String!) {
    data: getAllAcademicHour(orderCreated: true, allData: true, campusId: $campusId, academicDayId: $academicDayId) {
      edges {
        cursor
        node {
          id
          active
          order
          startTime                        
          endTime  
          academicDay  {            
            name
            day
          }                        
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ACADEMIC_HOUR = gql`
  query getAcademicHour($id: String!) {
    data: getAcademicHour(id: $id) {
      id   
      startTime                        
      endTime                            
      campusId     
      campus  {
        id
        name
      }                       
      academicDayId     
      academicDay  {
        id
        name
        day 
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

export const QUERY_GET_DROPDOWNS_ACADEMIC_HOUR = gql`
  query getDropdownsAcademicHour($schoolId: String!, $campusId: String!) {
    dataCampus: getAllCampus(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataAcademicDay: getAllAcademicDay(allData: false, orderCreated: false, campusId: $campusId) {
      edges {
        node {
          id
          name
          day
        }
      }
    }
  }
`;
