/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Input } from 'reactstrap';
import { createNotification } from '../../../helpers/Notification';
import * as performanceLevelActions from '../../../stores/actions/Academic/PerformanceLevelActions';
import * as experienceLearningRubricCriteriaActions from '../../../stores/actions/ExperienceLearningRubricCriteriaActions';
import * as experienceLearningSelfAssessmentValuationActions from '../../../stores/actions/ExperienceLearningSelfAssessmentValuationActions';
import { Colxx } from '../../common/CustomBootstrap';
import { Loader } from '../../common/Loader';

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
    // generate notes
    props.generateExperienceLearningSelfAssessmentValuation(learningId).then((response: any) => {
      // get list valuations CAMBIAR POR EL GET DE LOS QUE SON
      props
        .getListAllExperienceLearningRubricCriteria(learningId)
        .then(async (listData: any) => {
          setValuations(listData.map((c:any)=>{return c?.node}));
        //   console.log(listData);
        //   let valuationsArr: any = [];
        //   // get performance levels
        //   await props
        //     .getListAllPerformanceLevel(props?.loginReducer?.schoolId)
        //     .then((levels: any) => {
              
        //     });
        //   setValuations(valuationsArr.sort(compare));
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
        // let valuationsArr = listData.map((l: any) => {
        //   const perf = performanceLevels?.find((c: any) => {
        //     return (
        //       l?.node?.assessment <= c.node.topScore && l?.node?.assessment >= c.node.minimumScore
        //     );
        //   });
        //   l.node.performance = perf?.node?.name;
        //   return l.node;
        // });
        setValuations(listData);
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


  return (
    <>
      <div className="mt-4 d-flex justify-content-center align-items-center">
        <h1 className="font-bold">Valoración de criterios de rúbrica</h1>
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
        <div className='mt-4'>
        <div className="d-flex flex-row">           
            <span className="mb-0 text-muted mr-4 border-b-green">
              Nota: <h2 className="text-green font-bold">{gradeName}</h2>
            </span>
            <span className="mb-0 text-muted border-b-orange">
              Observación: <h2 className="text-orange font-bold">{courseName}</h2>
            </span>
          </div>                    
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
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center">Criterio</th>
                    {
                      valuations[0]?.experienceLearningRubricCriteriaPerformanceLevel?.map((v:any)=>{
                        return <>
                        <th>{v?.performanceLevel?.name}</th>
                        </>
                      })
                    }
                    <th className="text-center">Valoración</th>
                  </tr>
                </thead>
                <tbody>
                  {valuations.map((item: any, index: any) => {
                    return (
                      <>
                        <tr key={index}>
                          <td className="text-center vertical-middle">
                            <div className="d-flex align-items-center justify-content-center">                            
                              <span>
                                {item?.criteria}
                              </span>
                            </div>
                          </td>
                          {
                            item.experienceLearningRubricCriteriaPerformanceLevel?.map((v:any)=>{
                              return <>
                              <td>{v?.criteria}</td>
                              </>
                            })
                          }
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
  ...performanceLevelActions,
  ...experienceLearningSelfAssessmentValuationActions,
  ...experienceLearningRubricCriteriaActions,
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceLearningSelfAssessmentValuationList);
