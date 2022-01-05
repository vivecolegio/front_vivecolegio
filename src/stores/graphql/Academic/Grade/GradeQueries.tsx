import { gql } from '@apollo/client';

export const QUERY_GET_ALL_GRADE = gql`
  query getAllAcademicGrade {
    data: getAllAcademicGrade(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          active
          name
          specialty {
            name
          }
          educationLevel {
            name
          }
          generalAcademicCycle {
            name
          }
          school {
            name
          }
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_GRADE = gql`
  query getAcademicGrade($id: String!) {
    data: getAcademicGrade(id: $id) {
      id
      name
      specialtyId
      specialty {
        id
        name
      }
      educationLevelId
      educationLevel {
        id
        name
      }
      generalAcademicCycleId
      generalAcademicCycle {
        id
        name
      }
      schoolId
      school {
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

export const QUERY_GET_DROPDOWNS_GRADE = gql`
  query getDropdownsAcademicArea {
    dataSchools: getAllSchool(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataCycles: getAllGeneralAcademicCycle(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataSpecialities: getAllSpecialty(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
    dataEducationLevels: getAllEducationLevel(allData: false, orderCreated: false) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
