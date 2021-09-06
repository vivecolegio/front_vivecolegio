import { createNotification } from "../../helpers/Notification";
import { client } from '../graphql';
import { MUTATION_CHANGE_ACTIVE_COMPONENT_EVALUATIVE, MUTATION_CREATE_COMPONENT_EVALUATIVE, MUTATION_UPDATE_COMPONENT_EVALUATIVE } from '../graphql/ComponentEvaluative/ComponentEvaluativeMutations';
import { QUERY_GET_ALL_COMPONENT_EVALUATIVE, QUERY_GET_COMPONENT_EVALUATIVE } from '../graphql/ComponentEvaluative/ComponentEvaluativeQueries';


export const getListAllComponentEvaluative = () => {
  return async (dispatch: any) => {
    try {
      let listData = {};
      await client
        .query({
          query: QUERY_GET_ALL_COMPONENT_EVALUATIVE,
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

export const dataComponentEvaluative = (id: any) => {
  return async (dispatch: any) => {
    try {
      let data = {};
      await client
        .query({
          query: QUERY_GET_COMPONENT_EVALUATIVE,
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

export const saveNewComponentEvaluative = (data: any) => {
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
          mutation: MUTATION_CREATE_COMPONENT_EVALUATIVE,
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

export const updateComponentEvaluative = (data: any, id: any) => {
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
          mutation: MUTATION_UPDATE_COMPONENT_EVALUATIVE,
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

export const changeActiveComponentEvaluative = (active: any, id: any) => {
  return async (dispatch: any) => {
    try {
      let dataChangeActive = null;
      await client
        .mutate({
          mutation: MUTATION_CHANGE_ACTIVE_COMPONENT_EVALUATIVE,
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
