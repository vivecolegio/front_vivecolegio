import { gql } from '@apollo/client';

export const QUERY_GET_ALL_MENU_ITEM = gql`
  query getAllMenuItem {
    data: getAllMenuItem(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          active
          name
          icon
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_MENU_ITEM = gql`
  query getMenuItem($id: String!) {
    data: getMenuItem(id: $id) {
      id
      name
      version
      icon
      createAction
      deleteAction
      updateAction
      readAction
      fullAccess
      activateAction
      inactiveAction
      roles {
        id
        name
      }
      module {
        id
        name
      }
      menu {
        id
        name
      }
      createdAt
      updatedAt
      createdByUser {
        name
      }
      updatedByUser {
        name
      }
    }
  }
`;
