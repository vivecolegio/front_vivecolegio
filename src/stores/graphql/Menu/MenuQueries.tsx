import { gql } from '@apollo/client';

export const QUERY_GET_ALL_MENU = gql`
  query getAllMenu {
    data: getAllMenu(orderCreated: true, allData: true) {
      edges {
        cursor
        node {
          id
          active         
          name
          icon
          sorting          
        }
      }
      totalCount
    }
  }
`;

export const QUERY_GET_MENU = gql`
  query getMenu($id: String!) {
    data: getMenu(id: $id) {
      id
      name
      version
      icon
      sorting
      module {
        id
        name
      }     
      menuItems {
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
