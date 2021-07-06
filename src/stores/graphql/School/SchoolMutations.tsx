import { gql } from '@apollo/client';

export const MUTATION_CREATE_SCHOOL = gql`
  mutation createSchool($input: NewSchool!) {
    create: createSchool(data: $input) {
      id
    }
  }
`;

export const MUTATION_UPDATE_SCHOOL = gql`
  mutation updateSchool($id: String!, $input: NewSchool!) {
    update: updateSchool(id: $id, data: $input) {
      id
    }
  }
`;

export const MUTATION_CHANGE_ACTIVE_SCHOOL = gql`
  mutation changeActiveSchool($id: String!, $active: Boolean!) {
    changeActive: changeActiveSchool(id: $id, active: $active)
  }
`;