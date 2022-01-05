import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ACADEMIC_HOUR = gql`
  query getAllAcademicHour {
    data: getAllAcademicHour(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          active
          startTime                        
          endTime  
          academicDay  {
            workingDay
            typeDay
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
        workingDay
        typeDay 
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
  query getDropdownsAcademicHour {
    dataCampus: getAllCampus(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataAcademicDay: getAllAcademicDay(allData: false, orderCreated: false) {
      edges {
        node {
          id
          workingDay
          typeDay
        }
      }
    }
  }
`;
