import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ACADEMIC_PERIOD = gql`
  query getAllAcademicPeriod($schoolId: String!) {
    data: getAllAcademicPeriod(orderCreated: true, allData: true, schoolId: $schoolId) {
      edges {
        cursor
        node {
          id
          name
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
      name 
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

export const QUERY_GET_DROPDOWNS_ACADEMIC_PERIOD = gql`
  query getDropdownsAcademicArea($schoolId: String!) {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataSchoolYears: getAllSchoolYear(allData: false, orderCreated: false, schoolId: $schoolId) {
      edges {
        node {
          id
          schoolYear
        }
      }
    }
  }
`;
