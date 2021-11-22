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
        name
        icon
        menuItemsLogin {
          id
          name
          icon
          createAction
          deleteAction
          updateAction
          readAction
          fullAccess
          activateAction
          inactiveAction
          module {
            url
          }
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query {
    me {
      roleMenus {
        id
        name
        icon
        menuItemsLogin {
          id
          name
          icon
          createAction
          deleteAction
          updateAction
          readAction
          fullAccess
          activateAction
          inactiveAction
          module {
            url
          }
        }
      }
    }
  }
`;
