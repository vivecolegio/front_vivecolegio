import { gql } from '@apollo/client';

export const QUERY_GET_ALL_ACADEMIC_COURSE_GRAPHICS = gql`
  query getAllCourse($id: String!, $academicGradeId: String) {
    data: getAllCourse(
      schoolId: $id
      academicGradeId: $academicGradeId
      campusId: ""
      orderCreated: true
      allData: false
    ) {
      edges {
        node {
          name
          academicGrade {
            name
          }
          countStudent
          campus {
            name
          }
        }
      }
    }
  }
`;
