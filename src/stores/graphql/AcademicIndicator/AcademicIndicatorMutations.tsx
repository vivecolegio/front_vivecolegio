import { gql } from '@apollo/client';

export const MUTATION_CREATE_ACADEMIC_INDICATOR = gql`
  mutation createAcademicIndicator($input: NewAcademicIndicator!) {
    create: createAcademicIndicator(data: $input) {
      id
    }
  }
`;

export const MUTATION_UPDATE_ACADEMIC_INDICATOR = gql`
  mutation updateAcademicIndicator($id: String!, $input: NewAcademicIndicator!) {
    update: updateAcademicIndicator(id: $id, data: $input) {
      id
    }
  }
`;

export const MUTATION_CHANGE_ACTIVE_ACADEMIC_INDICATOR = gql`
  mutation changeActiveAcademicIndicator($id: String!, $active: Boolean!) {
    changeActive: changeActiveAcademicIndicator(id: $id, active: $active)
  }
`;