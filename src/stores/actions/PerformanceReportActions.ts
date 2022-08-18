import { createNotification } from "../../helpers/Notification";
import { client } from "../graphql";
import { GENERATE_PERFORMANCE_REPORT_COURSE } from "../graphql/PerformanceReport/PerformanceReportMutation";

export const generatePerformanceReportCourse = (id: any, schoolId: any, schoolYearId: any, academicPeriodId: any,showToast: boolean) => {
    return async (dispatch: any) => {
      try {
        let dataChangeActive = null;
        await client
          .mutate({
            mutation: GENERATE_PERFORMANCE_REPORT_COURSE,
            variables: { id, schoolId, schoolYearId, academicPeriodId  },
          })
          .then((dataReponse: any) => {
            if (dataReponse.errors?.length > 0) {
              dataReponse.errors.forEach((error: any) => {
                if (showToast) {
                  createNotification('error', 'error', '');
                }
              });
            } else {
              dataChangeActive = dataReponse.data.changeActive;
              if (showToast) {
                createNotification('success', 'success', '');
              }
            }
          });
        return dataChangeActive as any;
      } catch (error) {
        if (showToast) {
          createNotification('error', 'error', '');
        }
        return error;
      }
    };
  };