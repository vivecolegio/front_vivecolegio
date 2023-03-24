import { gql } from '@apollo/client';

export const MUTATION_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    data: login(username: $username, password: $password) {
      jwt
      name
      lastName
      profilePhoto
      student {
        id
      }
      teacher {
        id
      }
      userId      
      schools {
        id
        name 
        schoolYear {
          id
          schoolYear
         }
      }
      campus {
        id
        name
        schoolId
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
          isHidden
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
  query ($schoolYearId: String!) {
    me (schoolYearId: $schoolYearId) {
      name
      lastName
      profilePhoto
      student {
        id
      }
      teacher {
        id
      }
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
          isHidden
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
