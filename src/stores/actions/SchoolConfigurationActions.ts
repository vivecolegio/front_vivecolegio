import { createNotification } from "../../helpers/Notification";
import { client } from "../graphql";
import { QUERY_GET_ALL_SCHOOL_CONFIGURATION } from "../graphql/SchoolConfiguration/SchoolConfigurationQueries";

export const getListAllSchoolConfiguration = (schoolId:string) => {
    return async (dispatch: any) => {
      try {
        let listData = {};
        await client
          .query({
            query: QUERY_GET_ALL_SCHOOL_CONFIGURATION,
            variables:{
              schoolId
            }
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