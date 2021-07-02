import { gql } from '@apollo/client';

export const MUTATION_CREATE_ROLE = gql`
  mutation createRole($input: NewRole!) {
    create: createRole(data: $input) {
      id
    }
  }
`;

export const MUTATION_UPDATE_ROLE = gql`
  mutation updateRole($id: String!, $input: NewRole!) {
    update: updateRole(id: $id, data: $input) {
      id
    }
  }
`;

export const MUTATION_CHANGE_ACTIVE_ROLE = gql`
  mutation changeActiveRole($id: String!, $active: Boolean!) {
    changeActive: changeActiveRole(id: $id, active: $active)
  }
`;