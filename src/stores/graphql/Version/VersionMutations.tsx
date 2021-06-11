import { gql } from '@apollo/client';

export const MUTATION_CREATE_VERSION = gql`
  mutation createVersion($input: NewVersion!) {
    create: createVersion(data: $input) {
      id
    }
  }
`;

export const MUTATION_UPDATE_VERSION = gql`
  mutation updateVersion($id: String!, $input: VersionInput!) {
    update: updateVersion(id: $id, data: $input) {
      id
    }
  }
`;
