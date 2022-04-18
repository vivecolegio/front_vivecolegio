/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Badge, Tooltip } from 'reactstrap';
import { compare } from '../../../helpers/DataTransformations';
import { createNotification } from '../../../helpers/Notification';
import { getInitialsName } from '../../../helpers/Utils';
import * as performanceLevelActions from '../../../stores/actions/Academic/PerformanceLevelActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import * as experienceLearningCoEvaluationActions from '../../../stores/actions/ExperienceLearningCoEvaluationActions';
import * as experienceLearningCoEvaluationValuationActions from '../../../stores/actions/ExperienceLearningCoEvaluationValuationActions';
import { Colxx } from '../../common/CustomBootstrap';
import { Loader } from '../../common/Loader';
import ThumbnailImage from '../Aplications/AplicationsComponents/ThumbnailImage';

const ExperienceLearningCoEvaluationList = (props: any) => {
  const [students, setStudents] = useState(null);
  const [performanceLevels, setPerformanceLevels] = useState(null);
  const [valuations, setValuations] = useState([]);
  const [valuationsAssessment, setValuationsAssessment] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  let navigate = useNavigate();
  const location = useLocation();
  const history = useNavigate();
  const currentUrl = location.pathname;

  let [params] = useSearchParams();
  const courseId = params.get('courseId');
  const learningId = params.get('learningId');
  const learningName = params.get('learningName');
  const asignatureName = params.get('asignatureName');
  const gradeName = params.get('gradeName');
  const courseName = params.get('courseName');
  const [loading, setLoading] = useState(true);
  const [currentMenu, setCurrentMenu] = useState({
    createAction: false,
    deleteAction: false,
    updateAction: false,
    readAction: false,
    fullAccess: false,
    activateAction: false,
    inactiveAction: false,
  });

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
    props.dataCourse(courseId).then((course: any) => {
      setStudents(course?.data?.students.sort(compare));
    });
    props.generateExperienceLearningCoEvaluation(learningId).then((response: any) => {
      props
        .generateExperienceLearningCoEvaluationValuation(learningId)
        .then((responseValuation: any) => {
          props
            .getListAllExperienceLearningCoEvaluationValuation(learningId)
            .then(async (listDataValuation: any) => {
              console.log(listDataValuation);
              let valuationsArr: any = [];
              await props
                .getListAllPerformanceLevel(props?.loginReducer?.schoolId)
                .then((levels: any) => {
                  setPerformanceLevels(levels);
                  // set valuations list and get the performance level for each one
                  valuationsArr = listDataValuation.map((l: any) => {
                    const perf = levels?.find((c: any) => {
                      return (
                        l?.node.assessment &&
                        l?.node?.assessment <= c.node.topScore &&
                        l?.node?.assessment >= c.node.minimumScore
                      );
                    });
                    l.node.performance = perf?.node?.name;
                    return l;
                  });
                });
              console.log(valuationsArr);
              setValuationsAssessment(valuationsArr);
            });
          props.getListAllExperienceLearningCoEvaluation(learningId).then(async (listData: any) => {
            console.log(listData);
            let valuationsArr: any = [];
            // get performance levels
            await props
              .getListAllPerformanceLevel(props?.loginReducer?.schoolId)
              .then((levels: any) => {
                setPerformanceLevels(levels);
                // set valuations list and get the performance level for each one
                valuationsArr = listData.map((l: any) => {
                  const perf = levels?.find((c: any) => {
                    return (
                      l?.node.assessment &&
                      l?.node?.assessment <= c.node.topScore &&
                      l?.node?.assessment >= c.node.minimumScore
                    );
                  });
                  l.node.performance = perf?.node?.name;
                  return l.node;
                });
              });
            setValuations(valuationsArr);
          });
        });
    });
    setLoading(false);
  }, []);

  const goTo = async () => {
    navigate(-1);
  };

  return (
    <>
      <div className="mt-4 d-flex justify-content-center align-items-center">
        <h1 className="font-bold">Coevaluación</h1>
      </div>
      <hr/>
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
          <div className="d-flex flex-row mt-4">
            <span className="mb-0 mr-4">
              <span className="text-muted">Experiencia de aprendizaje:</span>{' '}
              <h4 className="font-bold text-blue">{learningName}</h4>
            </span>
          </div>
          <p
            className="text-muted mt-2 d-flex align-items-center cursor-pointer"
            onClick={() => {
              return goTo();
            }}
          >
            <i className="simple-icon-arrow-left-circle mr-2"></i>
            Regresar a experiencias de aprendizaje
          </p>
        </div>
        <div className="mt-4 w-60">
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <td className='w-20' rowSpan={valuations[0]?.experienceLearning?.experienceLearningPerformanceLevel?.length + 1}>
                <strong>Criterio:</strong> {valuations[0]?.experienceLearning?.criteria}
                </td>
              </tr>
              {
                valuations[0]?.experienceLearning?.experienceLearningPerformanceLevel.map((e:any)=>{
                  return <>
                  <tr>
                    <td><strong>Nivel de desempeño:</strong> {e?.performanceLevel?.name}</td>
                    <td><strong>Criterio:</strong> {e?.criteria}</td>
                  </tr>
                  </>
                })
              }
            </tbody>
          </table>
        </div>
      </div>


      {loading ? (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader />
          </Colxx>
        </>
      ) : (
        <>
          {students !== null ? (
            <>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Código</th>
                    <th className="text-center">Estudiante</th>
                    {students.map((item: any, index: any) => {
                      return (
                        <>
                          <th className="text-center">{item?.code}</th>
                        </>
                      );
                    })}
                    <th className="text-center">Valoración</th>
                    <th className="text-center">Nivel de desempeño</th>
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
                          <td className="text-center">
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
                          {students.map((item2: any, index2: any) => {
                            return (
                              <>
                                <td className="text-center vertical-middle">
                                  <span id="tooltip_observation">
                                  {valuations.find(
                                    (c: any) =>
                                      c?.studentId === item?.id && c?.coEvaluatorId === item2?.id,
                                  )?.assessment || '--'}</span>
                                  {/* {
                                      !valuations.find(
                                        (c: any) =>
                                          c?.studentId === item?.id && c?.coEvaluatorId === item2?.id,
                                      )?.observations ?  */}                                   
                                    {/* : '' */}
                                  {/* } */}
                                </td>
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
      )}
    </>
  );
};
const mapDispatchToProps = {
  ...courseActions,
  ...performanceLevelActions,
  ...experienceLearningCoEvaluationActions,
  ...experienceLearningCoEvaluationValuationActions,
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceLearningCoEvaluationList);
