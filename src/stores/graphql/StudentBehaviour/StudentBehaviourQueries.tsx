import { gql } from "@apollo/client";

export const QUERY_GET_All_STUDENT_BEHAVIOUR = gql`
  query getAllStudentBehaviour( $academicPeriodId: String!, $courseId: String!) {
    data: getAllStudentBehaviour(orderCreated: true, allData: false, academicPeriodId: $academicPeriodId, courseId: $courseId) {
      edges {
        cursor
        node {
          id
          studentId
          student {
            id
            code
          }
          academicPeriodId
          assessment  
          performanceLevel {
            name
            id
            type
            colorHex
            abbreviation
          }    
          observation
        }
      }    
    }
  }
`;
