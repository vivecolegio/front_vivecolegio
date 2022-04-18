/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Badge, Input, Tooltip } from 'reactstrap';
import { compare } from '../../../helpers/DataTransformations';
import { createNotification } from '../../../helpers/Notification';
import { getInitialsName } from '../../../helpers/Utils';
import * as academicPeriodActions from '../../../stores/actions/AcademicPeriodActions';
import * as componentEvaluativeActions from '../../../stores/actions/ComponentEvaluativeActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import * as experienceLearningActions from '../../../stores/actions/ExperienceLearningActions';
import * as experienceLearningSelfActions from '../../../stores/actions/ExperienceLearningSelfAssessmentValuationActions';
import * as experienceLearningCoEvaluationActions from '../../../stores/actions/ExperienceLearningCoEvaluationValuationActions';
import * as experienceLearningTraditionalActions from '../../../stores/actions/ExperienceLearningTraditionalValuationActions';
import * as valuationsActions from '../../../stores/actions/ValuationsActions';
import { Colxx } from '../../common/CustomBootstrap';
import { Loader } from '../../common/Loader';
import ThumbnailImage from '../Aplications/AplicationsComponents/ThumbnailImage';
import TooltipItem from '../../common/TooltipItem';

const SpreadsheetList = (props: any) => {
  const [students, setStudents] = useState(null);
  const [performanceLevels, setPerformanceLevels] = useState(null);
  let [valuations, setValuations] = useState([]);
  let [notes, setNotes] = useState([]);
  const [valuationsAssessment, setValuationsAssessment] = useState([]);
  const [academicPeriods, setAcademicPeriods] = useState(null);
  let [academicPeriod, setAcademicPeriod] = useState(null);
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

  let navigate = useNavigate();
  const location = useLocation();
  const history = useNavigate();
  const currentUrl = location.pathname;

  let [params] = useSearchParams();
  const academicAsignatureCourseId = params.get('academicAsignatureCourseId');
  const courseId = params.get('courseId');
  const asignatureId = params.get('asignatureId');
  const asignatureName = params.get('asignatureName');
  const gradeId = params.get('gradeId');
  const gradeName = params.get('gradeName');
  const courseName = params.get('courseName');

  const [data, setData] = useState(null);
  useEffect(() => {
    let { roleMenus } = props.loginReducer;
    let submenus: any = [];
    roleMenus.map((c: any) => {
      return (submenus = submenus.concat(c.menuItemsLogin));
    });
    let cm = submenus.find((c: any) => {
      return currentUrl.includes(c.module.url);
    });
    if (cm && cm.readAction) {
      setCurrentMenu(cm);
    } else {
      history(`/home`);
      createNotification('warning', 'notPermissions', '');
    }
    getSpreadsheet();
  }, []);

  const getSpreadsheet = async () => {
    props.dataCourse(courseId).then(async (course: any) => {
      setStudents(course?.data?.students.sort(compare));
      let obj: any = [];
      let nts: any = [];
     

      // OJOOOOOOOOOOOOOO listData[1]?.node?.id ESTO ES EL PERIODO PERO ESTA QUEMADO
      await props.getListAllAcademicPeriod(props?.loginReducer?.schoolId).then((listData: any) => {
        setAcademicPeriods(listData);
        props
          .getListAllComponentEvaluative(props?.loginReducer?.schoolId)
          .then(async (dataComponents: any) => {
            dataComponents.map(async (c: any) => {
              // get averages for each evaluative component
              props.generateExperienceLearningAverageValuationStudents(c?.node?.id,listData[1]?.node?.id,academicAsignatureCourseId).then((resp: any) => {
              });

              // await props.getAllExperienceLearningAverageValuation(c?.node?.id,listData[1]?.node?.id,academicAsignatureCourseId).then((averages: any) => {
              //   console.log(averages);
              // });                

              props
                .getAllExperienceLearningAcademicAsignatureCourse(
                  academicAsignatureCourseId,
                  listData[1]?.node?.id,
                  c?.node?.id,
                )
                .then((response: any) => {
                  response.data.map((exp: any) => {
                    props.getValuationStudents(exp?.id).then((resp: any) => {
                      nts = nts.concat(resp.data);
                    });
                  });
                  if (response.data.length > 0) {
                    obj.push({
                      experiences: response.data,
                      name: `${c?.node?.name} (${c?.node?.weight}%)`,
                    });
                  }
                });
            });
          });
      });
      setTimeout(() => {
        setValuations(obj);
        setNotes(nts);
        console.log(nts);
        setLoading(false);
      }, 3000);
    });
  };

  const goTo = async () => {
    navigate(-1);
  };

  const saveNote = async (event: any,note:any, experience: any, student: any) => {
    if (event.key === 'Enter') {   
      let obj = {
        assessment: event.target.value,
      }
      switch (experience.experienceType) {
        case 'SELFAPPRAISAL':
          props.updateExperienceLearningSelfAssessmentValuation(obj, note?.id, true).then((resp: any) => {
            getSpreadsheet();
          });
          break;
        case 'TRADITIONALVALUATION':
          props.updateExperienceLearningTraditionalValuation(obj, note?.id, true).then((resp: any) => {
            getSpreadsheet();
          });
          break;

        case 'VALUATIONRUBRIC':
          break;

        case 'COEVALUATION':
          props.updateExperienceLearningCoEvaluationValuation(obj, note?.id, true).then((resp: any) => {
            getSpreadsheet();
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
        <div className="mt-4">
          <div className="d-flex flex-row">
            <span className="mb-0 text-muted mr-4 border-b-info">
              <span>Asignatura:</span> <h2 className="text-info font-bold">{asignatureName}</h2>
            </span>
            <span className="mb-0 text-muted mr-4 border-b-green">
              Grado: <h2 className="text-green font-bold">{gradeName}</h2>
            </span>
            <span className="mb-0 text-muted border-b-orange">
              Curso: <h2 className="text-orange font-bold">{courseName}</h2>
            </span>
          </div>
          <p
            className="text-muted mt-2 d-flex align-items-center cursor-pointer"
            onClick={() => {
              return goTo();
            }}
          >
            <i className="simple-icon-arrow-left-circle mr-2"></i>
            Regresar a mis clases
          </p>
        </div>
        <div>
          <button className="btn btn-info" type="button">
            <i className="iconsminds-pen-2"></i> Primer periodo
          </button>{' '}
          <button
            className="btn btn-green"
            type="button"
            onClick={() => {
              return setIsFormEnabled(!isFormEnabled);
            }}
          >
            <i className="iconsminds-file-edit"></i> Habilitar edición
          </button>{' '}
          <button className="btn btn-orange" type="button">
            <i className="iconsminds-delete-file"></i> Cerrar periodo
          </button>{' '}
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
            <>
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
                              item?.experiences?.length > 1
                                ? item?.experiences?.length + 1
                                : item?.experiences?.length
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
                          {item.experiences.map((e: any, indexe: any) => {
                            return (
                              <>
                                {/* <th className="text-center vertical-middle">{e?.title}</th> */}
                                <th className="text-center vertical-middle">
                                  
                                  <TooltipItem 
                                  key={`tooltip_${indexe}`} 
                                  target={<i className="iconsminds-idea-2 text-warning font-20" id={`tooltip_${indexe}`}></i>}
                                  item={{
                                        placement: 'left',
                                        body: e?.title,
                                      }} 
                                    id={indexe} />
                                </th>
                              </>
                            );
                          })}
                          {item?.experiences?.length > 1 ? (
                            <th className="text-center vertical-middle">Prom.</th>
                          ) : (
                            ''
                          )}
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
                            <div className="d-flex align-items-center justify-content-center">
                              {item?.user?.urlPhoto ? (
                                <ThumbnailImage
                                  rounded
                                  small
                                  src={item?.user?.urlPhoto}
                                  alt="profile"
                                  className="mr-4"
                                />
                              ) : (
                                <span className="img-thumbnail xl-avatar-initials border-0 span-initials rounded-circle mr-3 list-thumbnail align-self-center xsmall">
                                  {getInitialsName(
                                    item?.user
                                      ? item?.user?.name + ' ' + item?.user?.lastName
                                      : 'N N',
                                  )}
                                </span>
                              )}
                              <span>
                                {item?.user?.name} {item?.user?.lastName}
                              </span>
                            </div>
                          </td>
                          {valuations.map((item2: any, index2: any) => {
                            return (
                              <>
                                {item2.experiences.map((e: any) => {
                                  let note = notes.find(
                                    (n: any) =>
                                      n?.experienceLearningId === e?.id &&
                                      item?.id === n?.studentId,
                                  );
                                  return (
                                    <>
                                      <th className="text-center vertical-middle">
                                        {
                                          <>
                                            <Input
                                              onKeyPress={(event: any) => {
                                                return saveNote(event,note, e, item);
                                              }}
                                              defaultValue={
                                                note?.assessment
                                              }
                                              disabled={isFormEnabled}
                                              className="form-control"
                                            />
                                          </>
                                        }
                                      </th>
                                    </>
                                  );
                                })}
                                {item2?.experiences?.length > 1 ? (
                                  <th className="text-center vertical-middle">
                                    <Input disabled={true} type="number" className="form-control" />
                                  </th>
                                ) : (
                                  ''
                                )}
                              </>
                            );
                          })}
                          <td className="text-center vertical-middle">
                            {valuationsAssessment.find((c: any) => c?.node?.studentId === item?.id)
                              ?.node?.assessment || '--'}
                          </td>
                          <td className="text-center vertical-middle">
                            <Badge color="primary" className="font-0-8rem">
                              {valuationsAssessment.find(
                                (c: any) => c?.node?.studentId === item?.id,
                              )?.node?.performance || '--'}
                            </Badge>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </>
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
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpreadsheetList);
