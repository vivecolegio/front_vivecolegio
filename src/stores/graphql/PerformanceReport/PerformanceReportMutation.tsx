import { gql } from '@apollo/client';

export const GENERATE_PERFORMANCE_REPORT_COURSE = gql`
  mutation generatePerformanceReportCourse($id: String!, $schoolId: String!, $schoolYearId: String!, $academicPeriodId: String!) {
    generate: generatePerformanceReportCourse(id: $id, schoolId: $schoolId, schoolYearId: $schoolYearId, academicPeriodId: $academicPeriodId)
  }
`;

export const GENERATE_PERFORMANCE_REPORT_COURSE_STUDENT = gql`
  mutation generatePerformanceReportCourse($id: String!, $schoolId: String!, $schoolYearId: String!, $academicPeriodId: String!,$studentId: String!) {
    generate: generatePerformanceReportCourse(id: $id, schoolId: $schoolId, schoolYearId: $schoolYearId, academicPeriodId: $academicPeriodId,  studentId: $studentId)
  }
`;
