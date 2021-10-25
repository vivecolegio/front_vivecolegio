import { gql } from '@apollo/client';

export const MUTATION_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    data: login(username: $username, password: $password) {
      jwt
      name
      userId
      schools {
        id
        name
      }
      campus {
        id
        name
      }
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
            module {
              url
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
query{
  me{
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
            module {
              url
            }
          }
        }
      }
  }
}
`;