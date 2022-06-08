import { createNotification } from '../../helpers/Notification';
import { client } from '../graphql';
import { MUTATION_LOGIN, QUERY_ME } from '../graphql/Login/LoginMutations';
import { LOGIN, ME, RESET_APP } from '../reducers/types/loginTypes';

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
                entityId: data?.data?.student?.id,
                teacherId: data?.data?.teacher?.id,
                role: data.data.role,
                roleMenus: data.data.roleMenus,
                name: data.data.name,
                lastName: data.data.lastName,
                profilePhoto: data.data.profilePhoto,
                campus: data.data.campus && data.data.campus[0] ? data.data.campus[0].name : "",
                campusMulti: data?.data?.campus,
                school: data.data.schools && data.data.schools[0] ? data.data.schools[0].name : "",
                schoolMulti: data?.data?.schools,
                campusId: data.data.campus && data.data.campus[0] ? data.data.campus[0].id : "",
                schoolId: data.data.schools && data.data.schools[0] ? data.data.schools[0].id : "",
              },
            });
          }else{
            createNotification('error', 'errorSesion', '');
          }
        });
      return data != null;
    } catch (error) {
      createNotification('error', 'errorSesion', '');
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

export const me = (id: any) => {
  return async (dispatch: any) => {
    try {
      let data: any = {};
      await client
        .query({
          query: QUERY_ME,         
        })
        .then((result: any) => {
          data = result.data;
          if(data !=null){
            dispatch({
              type: ME,
              payload: {
                userId: data.me.userId,
                entityId: data?.me?.student?.id,
                teacherId: data?.me?.teacher?.id,
                role: data.me.role,
                roleMenus: data.me.roleMenus,
                name: data.me.name,
                lastName: data.me.lastName,
                profilePhoto: data.me.profilePhoto,              
              },
            });  
          }      
        });
      return data;
    } catch (error) {
      console.log(error)
      createNotification('error', 'error', '');
      return error;
    }
  };
};
