import { createNotification } from "../../helpers/Notification";
import { client } from '../graphql';
import { MUTATION_CREATE_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION_STUDENTS, MUTATION_CREATE_EXPERIENCE_LEARNING_AVERAGE_VALUATION_STUDENTS, MUTATION_UPDATE_ALL_STUDENT_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION } from "../graphql/Valuations/ValuationsMutations";
import { QUERY_GET_All_ACADEMIC_AREA_COURSE_PERIOD_VALUATION, QUERY_GET_All_ACADEMIC_AREA_COURSE_PERIOD_VALUATION_STUDENT, QUERY_GET_All_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION, QUERY_GET_All_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION_STUDENT, QUERY_GET_All_EXPERIENCE_LEARNING_AVERAGE_VALUATION, QUERY_GET_VALUATIONS_STUDENT } from "../graphql/Valuations/ValuationsQueries";

export const generateAcademicAsignatureCoursePeriodValuationStudents = (schoolId : string, academicPeriodId: string, academicAsignatureCourseId: string) => {
  return async (dispatch: any) => {
    try {    
      let dataCreate = null; 
      await client
        .mutate({
          mutation: MUTATION_CREATE_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION_STUDENTS,
          variables: { schoolId,academicPeriodId, academicAsignatureCourseId },
        })
        .then((dataResponse: any) => {
          if (dataResponse.errors?.length > 0) {
            dataResponse.errors.forEach((error: any) => {            
                createNotification('error', 'error', '');
            });
          } else {
            dataCreate = dataResponse.data.create.id;
          }
        });
      return dataCreate as any;
    } catch (error) {
        createNotification('error', 'error', '');
      return error;
    }
  };
};

// export const getListAllComponentEvaluative = (schoolId:string) => {
//   return async (dispatch: any) => {
//     try {
//       let listData = {};
//       await client
//         .query({
//           query: QUERY_GET_ALL_COMPONENT_EVALUATIVE,
//           variables:{
//             schoolId,
//           },
//         })
//         .then((result: any) => {
//           listData = result.data.data.edges;
//         });
//       return listData;
//     } catch (error) {
//       createNotification('error', 'error', '');
//       return error;
//     }
//   };
// };

export const getValuationStudents = (id: any) => {
  return async (dispatch: any) => {
    try {
      let data = {};
      await client
        .query({
          query: QUERY_GET_VALUATIONS_STUDENT,
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

export const getAllExperienceLearningAverageValuation = (evaluativeComponentId : string, academicPeriodId: string, academicAsignatureCourseId: string, experienceLearningType:string) => {
  return async (dispatch: any) => {
    try {
      let data = {};
      await client
        .query({
          query: QUERY_GET_All_EXPERIENCE_LEARNING_AVERAGE_VALUATION,
          variables: {
            evaluativeComponentId,academicPeriodId, academicAsignatureCourseId, experienceLearningType
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

export const getAllAcademicAsignatureCoursePeriodValuation = (academicPeriodId: string, academicAsignatureCourseId: string) => {
  return async (dispatch: any) => {
    try {
      let data = {};
      await client
        .query({
          query: QUERY_GET_All_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION,
          variables: {
            academicPeriodId, academicAsignatureCourseId,
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

export const getAllAcademicAsignatureCoursePeriodValuationStudent = (academicPeriodId: string, academicAsignatureCourseId: string, studentId: string) => {
  return async (dispatch: any) => {
    try {
      let data = {};
      await client
        .query({
          query: QUERY_GET_All_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION_STUDENT,
          variables: {
            academicPeriodId, academicAsignatureCourseId, studentId
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


export const getAllAcademicAreaCoursePeriodValuation = (academicPeriodId: string, academicAreaId: string) => {
  return async (dispatch: any) => {
    try {
      let data = {};
      await client
        .query({
          query: QUERY_GET_All_ACADEMIC_AREA_COURSE_PERIOD_VALUATION,
          variables: {
            academicPeriodId, academicAreaId,
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

export const getAllAcademicAreaCoursePeriodValuationStudent = (academicPeriodId: string, academicAreaId: string, studentId: string) => {
  return async (dispatch: any) => {
    try {
      let data = {};
      await client
        .query({
          query: QUERY_GET_All_ACADEMIC_AREA_COURSE_PERIOD_VALUATION_STUDENT,
          variables: {
            academicPeriodId, academicAreaId, studentId
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


export const generateExperienceLearningAverageValuationStudents = (evaluativeComponentId : string, academicPeriodId: string, academicAsignatureCourseId: string) => {
  return async (dispatch: any) => {
    try {    
      let dataCreate = null; 
      await client
        .mutate({
          mutation: MUTATION_CREATE_EXPERIENCE_LEARNING_AVERAGE_VALUATION_STUDENTS,
          variables: { evaluativeComponentId,academicPeriodId, academicAsignatureCourseId },
        })
        .then((dataResponse: any) => {
          if (dataResponse.errors?.length > 0) {
            dataResponse.errors.forEach((error: any) => {            
                createNotification('error', 'error', '');
            });
          } else {
            dataCreate = dataResponse.data.create.id;
          }
        });
      return dataCreate as any;
    } catch (error) {
        createNotification('error', 'error', '');
      return error;
    }
  };

};



export const updateAllStudentAcademicAsignatureCoursePeriodValuation = (academicPeriodId: string, academicAsignatureCourseId: string) => {
  return async (dispatch: any) => {
    try {    
      let dataCreate = null; 
      await client
        .mutate({
          mutation: MUTATION_UPDATE_ALL_STUDENT_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION,
          variables: { academicPeriodId, academicAsignatureCourseId },
        })
        .then((dataResponse: any) => {
          if (dataResponse.errors?.length > 0) {
            dataResponse.errors.forEach((error: any) => {            
                createNotification('error', 'error', '');
            });
          } else {
            dataCreate = dataResponse.data.create.id;
            //createNotification('success', 'success', '');
          }
        });
      return dataCreate as any;
    } catch (error) {
        createNotification('error', 'error', '');
      return error;
    }
  };
};