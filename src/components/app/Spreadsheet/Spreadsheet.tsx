import moment from 'moment';
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import { Badge, Input, Label, Progress, Tooltip } from 'reactstrap';

import { calculateDaysTwoDate, compare } from '../../../helpers/DataTransformations';
import { createNotification } from '../../../helpers/Notification';
import { getInitialsName } from '../../../helpers/Utils';
import * as performanceLevelActions from '../../../stores/actions/Academic/PerformanceLevelActions';
import * as academicPeriodActions from '../../../stores/actions/AcademicPeriodActions';
import * as componentEvaluativeActions from '../../../stores/actions/ComponentEvaluativeActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import * as experienceLearningActions from '../../../stores/actions/ExperienceLearningActions';
import * as experienceLearningCoEvaluationActions from '../../../stores/actions/ExperienceLearningCoEvaluationValuationActions';
import * as experienceLearningSelfActions from '../../../stores/actions/ExperienceLearningSelfAssessmentValuationActions';
import * as experienceLearningTraditionalActions from '../../../stores/actions/ExperienceLearningTraditionalValuationActions';
import * as schoolConfiguarionActions from '../../../stores/actions/SchoolConfigurationActions';
import * as valuationsActions from '../../../stores/actions/ValuationsActions';
import { Colxx } from '../../common/CustomBootstrap';
import FormGroupCustom from '../../common/Data/FormGroupCustom';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';
import { Loader } from '../../common/Loader';
import TooltipItem from '../../common/TooltipItem';
import ThumbnailImage from '../Aplications/AplicationsComponents/ThumbnailImage';

const SpreadsheetList = (props: any) => {
  const [students, setStudents] = useState(null);
  const [performanceLevels, setPerformanceLevels] = useState(null);
  const [performanceLevelType, setPerformanceLevelType] = useState(null);
  const [academicPeriods, setAcademicPeriods] = useState(null);
  const [currentAcademicPeriod, setCurrentAcademicPeriod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormEnabled, setIsFormEnabled] = useState(true);
  const [currentMenu, setCurrentMenu] = useState({
    createAction: false,
    deleteAction: false,
    updateAction: false,
    readAction: false,
    fullAccess: false,
    activateAction: false,
    inactiveAction: false,
  });
  let [valuations, setValuations] = useState([]);
  let [notes, setNotes] = useState([]);
  let [averages, setAverages] = useState([]);
  let [averagesFinal, setAveragesFinal] = useState([]);
  const [dateProgress, setDateProgress] = useState({ startDate: null, endDate: null, totalDays: 0, countDays: 0 })
  let [countDigits, setCountDigits] = useState(2);

  let navigate = useNavigate();
  const location = useLocation();
  const history = useNavigate();
  const currentUrl = location.pathname;

  let [params] = useSearchParams();
  const academicAsignatureCourseId = params.get('academicAsignatureCourseId');
  const courseId = params.get('courseId');
  const asignatureName = params.get('asignatureName');
  const gradeName = params.get('gradeName');
  const courseName = params.get('courseName');

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const [data, setData] = useState(null);
  useEffect(() => {
    let { roleMenus } = props.loginReducer;
    let submenus: any = [];
    roleMenus.map((c: any) => {
      return (submenus = submenus.concat(c.menuItemsLogin));
    });
    let cm = submenus.find((c: any) => {
      return currentUrl.includes(c?.module?.url);
    });
    if (cm && cm.readAction) {
      setCurrentMenu(cm);
    } else {
      history(`/home`);
      createNotification('warning', 'notPermissions', '');
    }
    props.dataCurrentAcademicPeriod(props?.loginReducer?.schoolId).then(async (period: any) => {
      await props.getListAllSchoolConfiguration(props?.loginReducer?.schoolId).then(async (schoolConfigurations: any) => {
        for (let schoolConfiguration of schoolConfigurations) {
          if (schoolConfiguration?.node?.code == "COUNT_DIGITS_PERFORMANCE_LEVEL") {
            setCountDigits(schoolConfiguration?.node?.valueNumber);
          }
        }
      });
      await setCurrentAcademicPeriod(period);
      if (period) {
        const today = new Date();
        const startDate = new Date(period.startDate);
        const endDate = new Date(period?.endDate);
        const totalDays = calculateDaysTwoDate(startDate, endDate);
        let countDays = totalDays;
        if (today < endDate) {
          countDays = calculateDaysTwoDate(new Date(), endDate);
        }
        setDateProgress({ startDate, endDate, totalDays, countDays })
      }
      getSpreadsheet(period?.id);
    });
  }, []);

  const getSpreadsheet = async (periodId: any) => {
    setLoading(true);
    await props.dataCourse(courseId).then(async (course: any) => {
      setStudents(course?.data?.students.sort(compare));
      let obj: any = [];
      let nts: any = [];
      let avrgs: any = [];
      let avrgsFinal: any = [];
      let levels: any = [];
      await props
        .getListAllPerformanceLevelAsignatureCourse(academicAsignatureCourseId)
        .then((dataLevels: any) => {
          setPerformanceLevels(dataLevels);
          levels = dataLevels;
          setPerformanceLevelType(dataLevels[0]?.node?.type);
        });
      await props.getAcademicPeriodsExperienceLearning(props?.loginReducer?.schoolId,
        props?.loginReducer?.schoolYear).then(async (listData: any) => {
          setAcademicPeriods(listData);
          let promisesList: any[] = [];
          if (periodId) {
            await updateAverages(periodId);
            await props
              .getAllAcademicAsignatureCoursePeriodValuation(periodId, academicAsignatureCourseId)
              .then(async (notesFinal: any) => {
                avrgsFinal = avrgsFinal.concat(notesFinal.data.edges);
                setAveragesFinal(avrgsFinal);
              });
            await props
              .getListAllComponentEvaluativeAcademicAsignatureCourse(academicAsignatureCourseId)
              .then(async (dataComponents: any) => {
                for (let c of dataComponents) {
                  await props
                    .getAllExperienceLearningAverageValuation(
                      c?.node?.id,
                      periodId,
                      academicAsignatureCourseId,
                    )
                    .then((resp: any) => {
                      avrgs = avrgs.concat(resp.data.edges);
                      setAverages(avrgs);
                    });
                  await props
                    .getAllExperienceLearningAcademicAsignatureCourse(
                      academicAsignatureCourseId,
                      periodId,
                      c?.node?.id,
                    )
                    .then(async (response: any) => {
                      await response.data.map(async (exp: any) => {
                        promisesList.push(
                          props.getValuationStudents(exp?.id).then((resp: any) => {
                            nts = nts.concat(resp.data);
                          }));
                      });
                      obj.push({
                        experiences: response.data,
                        name: `${c?.node?.name} (${c?.node?.weight}%)`,
                        evaluativeComponentId: c?.node?.id,
                      });
                    });
                };
                await Promise.all(promisesList).then(() => {
                  setValuations(obj);
                  setNotes(nts);
                  setLoading(false);
                });
              });

          } else {
            setLoading(false);
          }
        });
    });
  };

  const goTo = async () => {
    navigate(-1);
  };

  const updateAverages = async (period: any) => {
    if (period) {
      await props
        .updateAllStudentAcademicAsignatureCoursePeriodValuation(
          period,
          academicAsignatureCourseId,
        )
        .then((resp: any) => {
          // getSpreadsheet(currentAcademicPeriod);
        });
    }
  };

  const saveNote = async (event: any, note: any, experience: any, student: any) => {
    if (event.key === 'Enter') {
      let obj = {
        assessment: event.target.value,
      };
      switch (experience.experienceType) {
        case 'SELFAPPRAISAL':
          props
            .updateExperienceLearningSelfAssessmentValuation(obj, note?.id, true)
            .then((resp: any) => {
              // updateAverages();
            });
          break;
        case 'TRADITIONALVALUATION':
          props
            .updateExperienceLearningTraditionalValuation(obj, note?.id, true)
            .then((resp: any) => {
              // updateAverages();
            });
          break;

        case 'VALUATIONRUBRIC':
          break;

        case 'COEVALUATION':
          props
            .updateExperienceLearningCoEvaluationValuation(obj, note?.id, true)
            .then((resp: any) => {
              // updateAverages();
            });
          break;

        default:
          break;
      }
    }
  };

  return (
    <>
      <div className="mt-4 d-flex justify-content-center align-items-center">
        <h1 className="font-bold">Planilla</h1>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <HeaderInfoAcademic asignature grade course modality goTitle="Regresar a asignación académica" academicAsignatureCourseId={academicAsignatureCourseId} />
        <div>
          <div className="d-flex justify-content-start align-items-center" >
            {academicPeriods
              ? academicPeriods.map((item: any) => {
                return (
                  <>
                    <button
                      onClick={() => {
                        setCurrentAcademicPeriod(item?.node?.id);
                        const today = new Date();
                        const startDate = new Date(item?.node?.startDate);
                        const endDate = new Date(item?.node?.endDate);
                        const totalDays = calculateDaysTwoDate(startDate, endDate);
                        let countDays = totalDays;
                        if (today < endDate) {
                          countDays = calculateDaysTwoDate(new Date(), endDate);
                        }
                        setDateProgress({ startDate, endDate, totalDays, countDays })
                        return getSpreadsheet(item?.node?.id);
                      }}
                      key={item?.node?.id}
                      className={`ml-1 btn ${currentAcademicPeriod?.id === item?.node?.id
                        ? 'btn-info'
                        : 'btn-outline-info'
                        }`}
                      type="button"
                    >
                      <i className="iconsminds-pen-2"></i> {item?.node?.name}
                    </button>{'  '}
                  </>
                );
              })
              : ''}
          </div>
          {dateProgress.startDate != null ?
            <>
              <div className="d-flex justify-content-start align-items-center mt-2 w-100">
                <div className="text-center">
                  Progreso: {' '}
                </div>
                <Progress
                  className="ml-2"
                  bar
                  color="primary"
                  value={dateProgress.countDays > 0 ? ((dateProgress.countDays / dateProgress.totalDays) * 100) : 0}
                > ({dateProgress.countDays}/{dateProgress.totalDays}) {dateProgress.countDays > 0 ? ((dateProgress.countDays / dateProgress.totalDays) * 100).toFixed(0) : 0}%</Progress>
              </div>
              <div className="d-flex justify-content-start align-items-center mt-2 w-100">
                <div className="text-center w-50">
                  Fecha Inicio: {' ' + moment(dateProgress.startDate).format("YYYY-MM-DD")}
                </div>
                <div className="text-center w-50">
                  Fecha Fin: {' ' + moment(dateProgress.endDate).format("YYYY-MM-DD")}
                </div>
              </div>
            </>
            : ""}

          {/* {currentAcademicPeriod != null ?
            <div className='d-flex mt-3 justify-content-end mb-2'>
               <button
                className="btn btn-green mr-2"
                type="button"
                onClick={() => {
                  return setIsFormEnabled(!isFormEnabled);
                }}
              >
                <i className="iconsminds-file-edit"></i> Habilitar edición
              </button>
              <button className="btn btn-orange" type="button">
                <i className="iconsminds-delete-file"></i> Cerrar periodo
              </button> 
              <button
                className="btn btn-green mr-2"
                type="button"
                onClick={() => {
                  return updateAverages();
                }}
              >
                <i className="iconsminds-file-edit"></i> Recalcular Valoracion
              </button>
            </div>
            :
            <></>
          } */}
        </div>
      </div>

      {loading ? (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader />
          </Colxx>
        </>
      ) : valuations.length > 0 ? (
        <>
          {students !== null ? (
            <div style={{ overflow: "scroll" }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th rowSpan={2} className="text-center vertical-middle">
                      Código
                    </th>
                    <th rowSpan={2} className="text-center vertical-middle">
                      Estudiante
                    </th>
                    {valuations.map((item: any, index: any) => {
                      return (
                        <>
                          <th
                            colSpan={
                              item?.experiences?.length + 1
                            }
                            className="text-center vertical-middle"
                          >
                            {item?.name}
                          </th>
                        </>
                      );
                    })}
                    <th rowSpan={2} className="text-center vertical-middle">
                      Valoración
                    </th>
                    <th rowSpan={2} className="text-center vertical-middle">
                      Nivel de desempeño
                    </th>
                  </tr>
                  <tr>
                    {valuations.map((item: any, index: any) => {
                      return (
                        <>
                          {item.experiences.length > 0 ?
                            <>
                              {
                                item.experiences.map((e: any, indexe: any) => {
                                  return (
                                    <>
                                      <th className="text-center vertical-middle">
                                        <a data-tip data-for={e?.id}>
                                          <i
                                            className="iconsminds-idea-2 text-warning font-20"
                                          ></i>
                                        </a>
                                        <ReactTooltip id={e?.id} type='info' effect='solid'>
                                          <span>{e?.title}</span>
                                        </ReactTooltip>
                                      </th>
                                    </>
                                  );
                                })
                              }</>
                            : ""}
                          {/* {item?.experiences?.length >= 0 ? ( */}
                          <th className="text-center vertical-middle">Prom.</th>
                          {/* ) : ( */}
                          {/* '' */}
                          {/* )} */}
                        </>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {students.map((item: any, index: any) => {
                    return (
                      <>
                        <tr key={index}>
                          <td className="text-center vertical-middle">
                            <span className="font-bold">{item?.code}</span>
                          </td>
                          <td className="text-center vertical-middle">
                            <div className="d-flex align-items-center justify-content-start">
                              {item?.user?.urlPhoto ? (
                                <ThumbnailImage
                                  rounded
                                  src={item?.user?.urlPhoto}
                                  alt="profile"
                                  className="xsmall mr-3"
                                />
                              ) : (
                                <span className="img-thumbnail md-avatar-initials border-0 span-initials rounded-circle mr-3 list-thumbnail align-self-center xsmall">
                                  {getInitialsName(
                                    item?.user
                                      ? item?.user?.lastName +
                                      ' ' +
                                      item?.user?.name
                                      : 'N N',
                                  )}
                                </span>
                              )}
                              <span>
                                {item?.user?.lastName} {item?.user?.name}
                              </span>
                            </div>
                          </td>
                          {valuations.map((item2: any, index2: any) => {
                            return (
                              <>
                                {item2.experiences.length > 0 ?
                                  <>
                                    {item2.experiences.map((e: any) => {
                                      let note = notes.find(
                                        (n: any) =>
                                          n?.experienceLearningId === e?.id &&
                                          item?.id === n?.studentId,
                                      );
                                      return (
                                        <>
                                          <td className="text-center vertical-middle">
                                            {performanceLevelType === "QUALITATIVE" ?
                                              <>
                                                <Badge color="primary" className="font-0-8rem">
                                                  {note?.performanceLevel?.name}
                                                </Badge>
                                              </> :
                                              <>
                                                {note?.assessment}
                                                {/* <Input
                                                  onKeyPress={(event: any) => {
                                                    return saveNote(event, note, e, item);
                                                  }}
                                                  defaultValue={note?.assessment}
                                                  disabled={isFormEnabled}
                                                  className="form-control"
                                                  style={{ width: "60px" }}
                                                /> */}
                                              </>
                                            }
                                          </td>
                                        </>
                                      );
                                    })} </> : ""}
                                {item2?.experiences?.length > 0 ? (
                                  <th className="text-center vertical-middle">
                                    {performanceLevelType === "QUALITATIVE" ?
                                      <>
                                        <Badge color="primary" className="font-0-8rem">
                                          {averages.find(
                                            (n: any) =>
                                              item2?.evaluativeComponentId ===
                                              n?.node?.evaluativeComponentId &&
                                              item?.id === n?.node?.studentId,
                                          )?.node?.performanceLevel?.name}
                                        </Badge>
                                      </>
                                      :
                                      <>
                                        {averages.find(
                                          (n: any) =>
                                            item2?.evaluativeComponentId ===
                                            n?.node?.evaluativeComponentId &&
                                            item?.id === n?.node?.studentId,
                                        )?.node?.average?.toFixed(countDigits)}
                                        {/* <Input
                                          disabled={true}
                                          defaultValue={
                                            averages.find(
                                              (n: any) =>
                                                item2?.evaluativeComponentId ===
                                                n?.node?.evaluativeComponentId &&
                                                item?.id === n?.node?.studentId,
                                            )?.node?.average?.toFixed(2)
                                          }
                                          className="form-control"
                                          style={{ width: "4.5vh" }}
                                        /> */}
                                      </>}
                                  </th>
                                ) : (
                                  <th></th>
                                )}
                              </>
                            );
                          })}
                          <th className="text-center vertical-middle">
                            {averagesFinal.find((n: any) => item?.id === n?.node?.studentId)?.node
                              ?.assessment?.toFixed(countDigits) || ''}
                          </th>
                          <th className="text-center vertical-middle">
                            <Badge color="primary" className="font-0-8rem">
                              {averagesFinal.find(
                                (c: any) => c?.node?.studentId === item?.id,
                              )?.node?.performanceLevel?.name || '--'}
                            </Badge>
                          </th>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
};
const mapDispatchToProps = {
  ...experienceLearningActions,
  ...courseActions,
  ...componentEvaluativeActions,
  ...academicPeriodActions,
  ...valuationsActions,
  ...experienceLearningSelfActions,
  ...experienceLearningCoEvaluationActions,
  ...experienceLearningTraditionalActions,
  ...performanceLevelActions,
  ...schoolConfiguarionActions
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpreadsheetList);
