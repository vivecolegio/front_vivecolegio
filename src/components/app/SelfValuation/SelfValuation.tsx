/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Badge, Input } from 'reactstrap';
import { compare } from '../../../helpers/DataTransformations';
import { createNotification } from '../../../helpers/Notification';
import { getInitialsName } from '../../../helpers/Utils';
import * as performanceLevelActions from '../../../stores/actions/Academic/PerformanceLevelActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import * as experienceLearningSelfAssessmentValuationActions from '../../../stores/actions/ExperienceLearningSelfAssessmentValuationActions';
import { Colxx } from '../../common/CustomBootstrap';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';
import { Loader } from '../../common/Loader';
import ThumbnailImage from '../Aplications/AplicationsComponents/ThumbnailImage';

const ExperienceLearningSelfAssessmentValuationList = (props: any) => {
  const [students, setStudents] = useState(null);
  const [performanceLevels, setPerformanceLevels] = useState(null);
  const [valuations, setValuations] = useState([]);
  const [criteriaPerformances, setCriteriaPerformances] = useState([]);

  let navigate = useNavigate();
  const location = useLocation();
  const history = useNavigate();
  const currentUrl = location.pathname;

  let [params] = useSearchParams();
  const learningId = params.get('learningId');
  const academicAsignatureCourseId = params.get('academicAsignatureCourseId');
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
    props.generateExperienceLearningSelfAssessmentValuation(learningId).then((response: any) => {
      props
        .getListAllExperienceLearningSelfAssessmentValuation(
          learningId,
          cm?.createAction ? props?.loginReducer?.entityId : undefined,
        )
        .then(async (listData: any) => {
          //console.log(listData);
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
                //console.log(perf)
                l.node.performance = perf?.node?.name;
                l.node.code = l.node.student.code;
                return l.node;
              });
            });
          setValuations(valuationsArr.sort(compare));
        });
    });
    setLoading(false);
  }, []);

  const refreshDataTable = async () => {
    setValuations(null);
    props
      .getListAllExperienceLearningSelfAssessmentValuation(
        learningId,
        currentMenu?.createAction ? props?.loginReducer?.entityId : undefined,
      )
      .then(async (listData: any) => {
        let valuationsArr = listData.map((l: any) => {
          const perf = performanceLevels?.find((c: any) => {
            return (
              l?.node?.assessment <= c.node.topScore && l?.node?.assessment >= c.node.minimumScore
            );
          });
          l.node.performance = perf?.node?.name;
          return l.node;
        });
        setValuations(valuationsArr);
      });
  };

  const getPerformanceLevel = async (e: any, valuation: any) => {
    const perf = performanceLevels?.find((c: any) => {
      return e.target.value <= c.node.topScore && e.target.value >= c.node.minimumScore;
    });
    const elementIndex = valuations.findIndex((obj) => {
      return obj.id === valuation.id;
    });
    valuations[elementIndex].performance = perf?.node?.name;
    valuations[elementIndex].assessment = e.target.value;
    const arr = Object.assign([], valuations);
    setValuations(arr);
  };

  const setObservation = async (e: any, valuation: any) => {
    const elementIndex = valuations.findIndex((obj) => {
      return obj.id === valuation.id;
    });
    valuations[elementIndex].observations = e.target.value;
    const arr = Object.assign([], valuations);
    setValuations(arr);
  };

  const goTo = async () => {
    navigate(-1);
  };

  const saveNote = async (event:any, item:any) => {
    if (event.key === 'Enter') {
      let obj = {
        assessment: event.target.value,
      };
      await props.updateExperienceLearningSelfAssessmentValuation(obj, item.id,true).then();
    }
  };

  const saveObservations = async (event:any, item:any) => {
    if (event.key === 'Enter') {
      let obj = {
        assessment: event.target.value,
      };
      await props.updateExperienceLearningSelfAssessmentValuation(obj, item.id,true).then();
    }
  };

  return (
    <>
      <div className="mt-4 d-flex justify-content-center align-items-center">
        <h1 className="font-bold">Autoevaluación</h1>
      </div>
      <hr/>
      <div className="d-flex justify-content-between align-items-center">
      <HeaderInfoAcademic asignature grade course modality experienceLearnig goTitle="Regresar a experiencias de aprendizaje" experienceLearnigId={learningId} academicAsignatureCourseId={academicAsignatureCourseId}/>        
        <div className="mt-4 w-60">
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <td
                  className="w-20"
                  rowSpan={
                    valuations[0]?.experienceLearning?.experienceLearningPerformanceLevel?.length +
                    1
                  }
                >
                  <strong>Criterio:</strong> {valuations[0]?.experienceLearning?.criteria}
                </td>
              </tr>
              {valuations[0]?.experienceLearning?.experienceLearningPerformanceLevel.map(
                (e: any) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <strong>Nivel de desempeño:</strong> {`${e?.performanceLevel?.name}: ${e?.performanceLevel?.minimumScore} - ${e?.performanceLevel?.topScore}`}
                        </td>
                        <td>
                          <strong>Criterio:</strong> {e?.criteria}
                        </td>
                      </tr>
                    </>
                  );
                },
              )}
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
          {valuations !== null ? (
            <>
              {criteriaPerformances.map((item: any, index: any) => {
                return (
                  <div key={index} className="form-group">
                    <span>{item?.performanceLevel?.name}</span>
                    <span>{item?.criteria}</span>
                  </div>
                );
              })}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Código</th>
                    <th className="text-center">Estudiante</th>
                    <th className="text-center">Valoración</th>
                    <th className="text-center">Observación</th>
                    <th className="text-center">Nivel de desempeño</th>
                  </tr>
                </thead>
                <tbody>
                  {valuations.map((item: any, index: any) => {
                    return (
                      <>
                        <tr key={index}>
                          <td className="text-center vertical-middle">
                            <span className="font-bold">{item?.student?.code}</span>
                          </td>
                          <td className="text-center vertical-middle">
                            <div className="d-flex align-items-center justify-content-center">
                              {item?.student?.user?.urlPhoto ? (
                                <ThumbnailImage
                                  rounded
                                  small
                                  src={item?.student?.user?.urlPhoto}
                                  alt="profile"
                                  className="mr-4"
                                />
                              ) : (
                                <span className="img-thumbnail xl-avatar-initials border-0 span-initials rounded-circle mr-3 list-thumbnail align-self-center xsmall">
                                  {getInitialsName(
                                    item?.student?.user
                                      ? item?.student?.user?.name +
                                          ' ' +
                                          item?.student?.user?.lastName
                                      : 'N N',
                                  )}
                                </span>
                              )}
                              <span>
                                {item?.student?.user?.name} {item?.student?.user?.lastName}
                              </span>
                            </div>
                          </td>
                          <td className="text-center vertical-middle">
                            {currentMenu?.updateAction ? (
                              <Input
                                type="number"
                                onInput={(e) => {
                                  return getPerformanceLevel(e, item);
                                }}
                                onKeyPress={(event: any) => {
                                  return saveNote(event, item);
                                }}
                                {...item?.assessment}
                                defaultValue={item?.assessment}
                                className="form-control"
                              />
                            ) : (
                              <span>{item?.assessment}</span>
                            )}
                          </td>
                          <td className="text-center vertical-middle">
                            {currentMenu?.updateAction ? (
                              <Input
                                type="textarea"
                                rows="2"
                                onKeyPress={(event: any) => {
                                  return saveObservations(event, item);
                                }}
                                {...item?.observations}
                                defaultValue={item?.observations}
                                className="form-control"
                              />
                            ) : (
                              <span>{item?.observations}</span>
                            )}
                          </td>
                          <td className="text-center vertical-middle">
                            <Badge color="primary" className="font-0-8rem">
                              {item?.performance}
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
  ...experienceLearningSelfAssessmentValuationActions,
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceLearningSelfAssessmentValuationList);
