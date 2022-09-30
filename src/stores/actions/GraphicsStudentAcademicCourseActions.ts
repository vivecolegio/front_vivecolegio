import { createNotification } from "../../helpers/Notification";
import { client } from "../graphql";
import { QUERY_GET_ALL_ACADEMIC_COURSE_GRAPHICS } from "../graphql/GraphicsStudentAcademicCourse/GraphicsStudentAcademicCourseQueries";

export const dataGraphicsStudentAcademicCourse = (id: any, academicGradeId: any) => {
    return async (dispatch: any) => {
      try {
        let data = {};
        await client
          .query({
            query: QUERY_GET_ALL_ACADEMIC_COURSE_GRAPHICS,
            variables: {
              id,
              academicGradeId,
            },
          })
          .then((result: any) => {
            data = result.data.data.edges;
          });
        return data;
      } catch (error) {
        createNotification('error', 'error', '');
        return error;
      }
    };
  };
  