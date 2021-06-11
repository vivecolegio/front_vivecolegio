
import { removeEmptyStringElements } from '../../../helpers/DataTransformations';
import { client } from '../../graphql';
import { MUTATION_CREATE_VERSION, MUTATION_UPDATE_VERSION } from '../../graphql/Version/VersionMutations';
import { QUERY_GET_ALL_VERSION, QUERY_GET_VERSION } from '../../graphql/Version/VersionQueries';
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from '../../reducers/types/notificationTypes';


export const getListAllVersion = () => {
  return async (dispatch: any) => {
    try {
      let listData = {};
          await client
            .query({
              query: QUERY_GET_ALL_VERSION,
            })
            .then((result: any) => {
              listData = result.data;
            });
      return listData;
    } catch (error) {
      dispatch({
        type: ERROR_NOTIFICATION,
        payload: `ERROR: ${error}`,
      });
      return error;
    }
  };
};

export const dataVersion = (id: any) => {
  return async (dispatch: any) => {
    try {
      let data = {};
      await client
        .query({
          query: QUERY_GET_VERSION,
          variables: {
            id,
          },
        })
        .then((result: any) => {
          data = result.data;
        });
      return data;
    } catch (error) {
        dispatch({
            type: ERROR_NOTIFICATION,
            payload: `ERROR: ${error}`,
          });
      return error;
    }
  };
};

export const saveNewVersion = (data: any) => {
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
      model = removeEmptyStringElements(model);
      let dataCreate = null;
      await client
        .mutate({
          mutation: MUTATION_CREATE_VERSION,
          variables: { input: model },
        })
        .then((dataReponse: any) => {
          if (dataReponse.errors?.length > 0) {
            dataReponse.errors.forEach((error: any) => {
              dispatch({
                type: ERROR_NOTIFICATION,
                payload: error.message,
              });
            });
          } else {
            dataCreate = dataReponse.data.create.id;
            dispatch({
              type: SUCCESS_NOTIFICATION,
              payload: 'Created Success',
            });
          }
        });
      return dataCreate as any;
    } catch (error) {
        dispatch({
            type: ERROR_NOTIFICATION,
            payload: `ERROR: ${error}`,
          });
      return error;
    }
  };
};

export const updateVersion = (data: any, id: any) => {
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
          mutation: MUTATION_UPDATE_VERSION,
          variables: { id, input: model },
        })
        .then((dataReponse: any) => {
          if (dataReponse.errors?.length > 0) {
            dataReponse.errors.forEach((error: any) => {
              dispatch({
                type: ERROR_NOTIFICATION,
                payload: error.message,
              });
            });
          } else {
            dataUpdate = dataReponse.data.update.id;
            dispatch({
              type: SUCCESS_NOTIFICATION,
              payload: 'Updated Success',
            });
            setTimeout(() => {
              dispatch({
                type: ERROR_NOTIFICATION,
                payload: 'Time Out Error'
              });
            }, 3000);
          }
        });
      return dataUpdate as any;
    } catch (error) {
        dispatch({
            type: ERROR_NOTIFICATION,
            payload: `ERROR: ${error}`,
          });
      return error;
    }
  };
};
