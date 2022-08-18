import { gql } from '@apollo/client';

export const GENERATE_PERFORMANCE_REPORT_COURSE = gql`
  mutation generatePerformanceReportCourse($id: String!, $schoolId: String!, $schoolYearId: String!, $academicPeriodId: String!) {
    generate: generatePerformanceReportCourse(id: $id, schoolId: $schoolId, schoolYearId: $schoolYearId, academicPeriodId: $academicPeriodId)
  }
`;
