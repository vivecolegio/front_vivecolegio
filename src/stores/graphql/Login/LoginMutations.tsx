import { gql } from '@apollo/client';

export const MUTATION_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    data: login(username: $username, password: $password) {
      jwt
      name
      userId
      role {
        id
        name
      }
      roleMenus {
        id
        menu {
          id
          name
          icon
          menuItems {
            id
            name
            icon
          }
        }
      }
    }
  }
`;