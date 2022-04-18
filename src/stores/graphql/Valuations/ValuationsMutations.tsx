import { gql } from '@apollo/client';

export const MUTATION_CREATE_EXPERIENCE_LEARNING_AVERAGE_VALUATION_STUDENTS = gql`
  mutation createExperienceLearningAverageValuationStudents($evaluativeComponentId : String!, $academicPeriodId: String!, $academicAsignatureCourseId: String!) {
    create: createExperienceLearningAverageValuationStudents(evaluativeComponentId : $evaluativeComponentId, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId)
  }
`;

