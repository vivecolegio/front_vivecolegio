import { createNotification } from '../../helpers/Notification';
import { client } from '../graphql';
import { MUTATION_LOGIN } from '../graphql/Login/LoginMutations';
import { LOGIN, RESET_APP } from '../reducers/types/loginTypes';

export const login = (user: any) => {
  return async (dispatch: any) => {
    try {
      let data: any = null;
      await client
        .query({
          query: MUTATION_LOGIN,
          variables: {
            username: user.username,
            password: user.password,
          },
        })
        .then((result: any) => {
          data = result.data;
          if(data !=null){
            localStorage.setItem('token', data.data.jwt);
            dispatch({
              type: LOGIN,
              payload: {
                userId: data.data.userId,
                role: data.data.role,
                name: data.data.name,
              },
            });
          }else{
            createNotification('error', 'Error al inciar sesión, por favor intente de nuevo', '');
          }
        });
      return data != null;
    } catch (error) {
      createNotification('error', 'Error al inciar sesión, por favor intente de nuevo', '');
      return error;
    }
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    try {
      localStorage.setItem('token', null);
      localStorage.clear();
      dispatch({
        type: RESET_APP,
      });
    } catch (error) {
      return error;
    }
  };
};

export const resetApp = () => {
  return async (dispatch: any) => {
    try {
      localStorage.setItem('token', null);
      localStorage.clear();
      dispatch({
        type: RESET_APP,
      });
    } catch (error) {
      return error;
    }
  };
};
