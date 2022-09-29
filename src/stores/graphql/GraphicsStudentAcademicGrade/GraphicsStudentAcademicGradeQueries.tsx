import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ACADEMIC_GRADE_GRAPHICS = gql`
query getAllAcademicGrade($id: String!) {
  data: getAllAcademicGrade(schoolId: $id, orderCreated: true, allData: false) {
    edges {
        node {
          name
          countStudent
        }
      }
  }
}
`;
