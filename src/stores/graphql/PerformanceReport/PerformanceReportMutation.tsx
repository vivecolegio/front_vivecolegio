import { gql } from '@apollo/client';

export const GENERATE_PERFORMANCE_REPORT_COURSE = gql`
  mutation generatePerformanceReportCourse($id: String!, $schoolId: String!, $schoolYearId: String!, $academicPeriodId: String!, $format: String!) {
    generate: generatePerformanceReportCourse(id: $id, schoolId: $schoolId, schoolYearId: $schoolYearId, academicPeriodId: $academicPeriodId, format: $format)
  }
`;

export const GENERATE_PERFORMANCE_REPORT_COURSE_STUDENT = gql`
  mutation generatePerformanceReportCourse($id: String!, $schoolId: String!, $schoolYearId: String!, $academicPeriodId: String!, $format: String!,$studentId: String!) {
    generate: generatePerformanceReportCourse(id: $id, schoolId: $schoolId, schoolYearId: $schoolYearId, academicPeriodId: $academicPeriodId, format: $format, studentId: $studentId)
  }
`;
