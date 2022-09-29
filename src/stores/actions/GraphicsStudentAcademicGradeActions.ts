import { createNotification } from "../../helpers/Notification";
import { client } from "../graphql";
import { QUERY_GET_ALL_ACADEMIC_GRADE_GRAPHICS } from "../graphql/GraphicsStudentAcademicGrade/GraphicsStudentAcademicGradeQueries";

export const dataGraphicsStudentAcademicGrade = (id: any) => {
    return async (dispatch: any) => {
      try {
        let data = {};
        await client
          .query({
            query: QUERY_GET_ALL_ACADEMIC_GRADE_GRAPHICS,
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
  