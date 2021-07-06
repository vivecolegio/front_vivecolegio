import { gql } from '@apollo/client';

export const MUTATION_CREATE_USER = gql`
  mutation createUser($input: NewUser!) {
    create: createUser(data: $input) {
      id
    }
  }
`;

export const MUTATION_UPDATE_USER = gql`
  mutation updateUser($id: String!, $input: NewUser!) {
    update: updateUser(id: $id, data: $input) {
      id
    }
  }
`;

export const MUTATION_CHANGE_ACTIVE_USER = gql`
  mutation changeActiveUser($id: String!, $active: Boolean!) {
    changeActive: changeActiveUser(id: $id, active: $active)
  }
`;