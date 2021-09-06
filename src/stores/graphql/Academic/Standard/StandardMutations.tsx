import { gql } from '@apollo/client';

export const MUTATION_CREATE_STANDARD = gql`
  mutation createAcademicStandard($input: NewAcademicStandard!) {
    create: createAcademicStandard(data: $input) {
      id
    }
  }
`;

export const MUTATION_UPDATE_STANDARD = gql`
  mutation updateAcademicStandard($id: String!, $input: NewAcademicStandard!) {
    update: updateAcademicStandard(id: $id, data: $input) {
      id
    }
  }
`;

export const MUTATION_CHANGE_ACTIVE_STANDARD = gql`
  mutation changeActiveAcademicStandard($id: String!, $active: Boolean!) {
    changeActive: changeActiveAcademicStandard(id: $id, active: $active)
  }
`;