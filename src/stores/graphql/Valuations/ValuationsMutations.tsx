import { gql } from '@apollo/client';

export const MUTATION_CREATE_EXPERIENCE_LEARNING_AVERAGE_VALUATION_STUDENTS = gql`
  mutation createExperienceLearningAverageValuationStudents($evaluativeComponentId : String!, $academicPeriodId: String!, $academicAsignatureCourseId: String!) {
    create: createExperienceLearningAverageValuationStudents(evaluativeComponentId : $evaluativeComponentId, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId)
  }
`;

export const MUTATION_CREATE_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION_STUDENTS = gql`
  mutation createAcademicAsignatureCoursePeriodValuationStudents($schoolId : String!, $academicPeriodId: String!, $academicAsignatureCourseId: String!) {
    create: createAcademicAsignatureCoursePeriodValuationStudents(schoolId : $schoolId, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId)
  }
`;

