import { createNotification } from "../../helpers/Notification";
import { client } from '../graphql';
import { MUTATION_CHANGE_ACTIVE_ADMINISTRATOR_CAMPUS, MUTATION_CREATE_ADMINISTRATOR_CAMPUS, MUTATION_UPDATE_ADMINISTRATOR_CAMPUS } from '../graphql/AdministratorCampus/AdministratorCampusMutations';
import { QUERY_GET_ALL_ADMINISTRATOR_CAMPUS, QUERY_GET_ADMINISTRATOR_CAMPUS } from '../graphql/AdministratorCampus/AdministratorCampusQueries';


export const getListAllAdministratorCampus = () => {
  return async (dispatch: any) => {
    try {
      let listData = {};
      await client
        .query({
          query: QUERY_GET_ALL_ADMINISTRATOR_CAMPUS,
        })
        .then((result: any) => {
          listData = result.data.data.edges;
        });
      return listData;
    } catch (error) {
      createNotification('error', 'error', '');
      return error;
    }
  };
};

export const dataAdministrator = (id: any) => {
  return async (dispatch: any) => {
    try {
      let data = {};
      await client
        .query({
          query: QUERY_GET_ADMINISTRATOR_CAMPUS,
          variables: {
            id,
          },
        })
        .then((result: any) => {
          data = result.data;
        });
      return data;
    } catch (error) {
      createNotification('error', 'error', '');
      return error;
    }
  };
};

export const saveNewAdministrator = (data: any) => {
  return async (dispatch: any) => {
    try {
      let model: {};
      model = {
        ...model,
      };
      model = {
        ...model,
        ...data,
      };
      let dataCreate = null;
      await client
        .mutate({
          mutation: MUTATION_CREATE_ADMINISTRATOR_CAMPUS,
          variables: { input: model },
        })
        .then((dataResponse: any) => {
          if (dataResponse.errors?.length > 0) {
            dataResponse.errors.forEach((error: any) => {
              createNotification('error', 'error', '');
            });
          } else {
            dataCreate = dataResponse.data.create.id;
            createNotification('success', 'success', '');
          }
        });
      return dataCreate as any;
    } catch (error) {
      createNotification('error', 'error', '');
      return error;
    }
  };
};

export const updateAdministrator = (data: any, id: any) => {
  return async (dispatch: any) => {
    try {
      let model: {};
      model = {
        ...model,
      };
      model = {
        ...model,
        ...data,
      };
      let dataUpdate = null;
      await client
        .mutate({
          mutation: MUTATION_UPDATE_ADMINISTRATOR_CAMPUS,
          variables: { id, input: model },
        })
        .then((dataReponse: any) => {
          if (dataReponse.errors?.length > 0) {
            dataReponse.errors.forEach((error: any) => {
              createNotification('error', 'error', '');
            });
          } else {
            dataUpdate = dataReponse.data.update.id;
            createNotification('success', 'success', '');
          }
        });
      return dataUpdate as any;
    } catch (error) {
      createNotification('error', 'error', '');
      return error;
    }
  };
};

export const changeActiveAdministrator = (active: any, id: any) => {
  return async (dispatch: any) => {
    try {
      let dataChangeActive = null;
      await client
        .mutate({
          mutation: MUTATION_CHANGE_ACTIVE_ADMINISTRATOR_CAMPUS,
          variables: { id, active },
        })
        .then((dataReponse: any) => {
          if (dataReponse.errors?.length > 0) {
            dataReponse.errors.forEach((error: any) => {
              createNotification('error', 'error', '');
            });
          } else {
            dataChangeActive = dataReponse.data.changeActive;
            createNotification('success', 'success', '');
          }
        });
      return dataChangeActive as any;
    } catch (error) {
      createNotification('error', 'error', '');
      return error;
    }
  };
};
