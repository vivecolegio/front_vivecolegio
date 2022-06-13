/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Input } from 'reactstrap';
import { createNotification } from '../../../helpers/Notification';
import * as performanceLevelActions from '../../../stores/actions/Academic/PerformanceLevelActions';
import * as experienceLearningRubricCriteriaValuationActions from '../../../stores/actions/ExperienceLearningRubricCriteriaValuationActions';
import * as experienceLearningRubricValuationActions from '../../../stores/actions/ExperienceLearningRubricValuationActions';
import { Colxx } from '../../common/CustomBootstrap';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';
import { Loader } from '../../common/Loader';

const ExperienceLearningRubricCriteriaValuationList = (props: any) => {
  const [rubricValuation, setRubricValuation] = useState(null);
  const [valuations, setValuations] = useState([]);
  const [total, setTotal] = useState(0);

  let navigate = useNavigate();
  const location = useLocation();
  const history = useNavigate();
  const currentUrl = location.pathname;

  let [params] = useSearchParams();
  const studentId = params.get('studentId');
  const academicAsignatureCourseId = params.get('academicAsignatureCourseId');
  const learningId = params.get('learningId');
  const rubricValuationId = params.get('rubricValuationId');
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
      return currentUrl.includes(c?.module?.url);
    });
    if (cm && cm.readAction) {
      setCurrentMenu(cm);
    } else {
      history(`/home`);
      createNotification('warning', 'notPermissions', '');
    }
    props
      .dataExperienceLearningRubricValuation(rubricValuationId)
      .then(async (dataRubricValuation: any) => {
        setRubricValuation(dataRubricValuation.data);
      });
    props
      .getListAllExperienceLearningRubricCriteriaValuation(learningId, studentId)
      .then(async (listData: any) => {
        setValuations(listData.map((c: any) => { return c?.node }));
        let count = 0;
        listData?.map((d: any) => {
          count += d?.node?.experienceLearningRubricCriteria?.weight;
        })
        setTotal(count);
      });
    setLoading(false);
  }, []);

  const refreshDataTable = async () => {
    setValuations(null);
    props
      .getListAllExperienceLearningRubricCriteriaValuation(
        learningId,
        studentId,
      )
      .then(async (listData: any) => {
        setValuations(listData.map((c: any) => { return c?.node }));
        props
          .dataExperienceLearningRubricValuation(rubricValuationId)
          .then(async (dataRubricValuation: any) => {
            setRubricValuation(dataRubricValuation.data);
          });
      });
  };

  const goTo = async () => {
    navigate(-1);
  };

  const saveNote = async (event: any, item: any) => {
    if (event.key === 'Enter') {
      let obj = {
        assessment: event.target.value,
      };
      await props.updateExperienceLearningRubricCriteriaValuation(obj, item.id, true).then();
      await props.updateExperienceLearningRubricValuationFromCriteria(rubricValuationId, false).then();
      await refreshDataTable();
    }
  };

  const saveObservationRubricValuation = async (event: any, item: any) => {
    if (event.key === 'Enter') {
      let obj = {
        observations: event.target.value,
      };
      await props.updateExperienceLearningRubricValuation(obj, rubricValuationId, true).then();
    }
  };


  return (
    <>
      <div className="mt-4 d-flex justify-content-center align-items-center">
        <h1 className="font-bold">Valoración de criterios de rúbrica</h1>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <HeaderInfoAcademic asignature grade course student modality experienceLearnig goTitle="Regresar a experiencias de aprendizaje" studentId={studentId} experienceLearnigId={learningId} academicAsignatureCourseId={academicAsignatureCourseId} />
        <div className='mt-4'>
          <div className="d-flex flex-row justify-content-end">
            <span className="mb-0 text-muted mr-4">
              Nota: <h2 className="text-muted font-bold">{rubricValuation?.assessment}</h2>
            </span>
            <span className="mb-0 text-muted">
              Observación:  <Input type='textarea' onKeyPress={(event: any) => {
                return saveObservationRubricValuation(event, rubricValuation);
              }} defaultValue={rubricValuation?.observations} rows="2" className="form-control" />
            </span>
          </div>
          <div className="d-flex flex-row mt-2">
            <p className='font-bold text-danger'>{total < 100 ? 'Los criterios no cumplen con el peso de 100%' : ''}</p>
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
                    <th className="text-center">Peso</th>
                    <th className="text-center">Evidencia de aprendizaje</th>
                    {
                      valuations[0]?.experienceLearningRubricCriteria?.experienceLearningRubricCriteriaPerformanceLevel?.map((v: any) => {
                        return <>
                          <th>
                            <div>{v?.performanceLevel?.name}</div>
                            <div>{`${v?.performanceLevel?.minimumScore} - ${v?.performanceLevel?.topScore}`}</div>
                          </th>
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
                                {item?.experienceLearningRubricCriteria?.criteria}
                              </span>
                            </div>
                          </td>
                          <td className="text-center vertical-middle">
                            <div className="d-flex align-items-center justify-content-center">
                              <span>
                                {item?.experienceLearningRubricCriteria?.weight}
                              </span>
                            </div>
                          </td>
                          <td className="text-center vertical-middle">
                            <div className="d-flex align-items-center justify-content-center">
                              <span>
                                {item?.experienceLearningRubricCriteria?.evidenceLearnig?.statement}
                              </span>
                            </div>
                          </td>
                          {
                            item?.experienceLearningRubricCriteria?.experienceLearningRubricCriteriaPerformanceLevel?.map((v: any) => {
                              return <>
                                <td className={(item?.assessment <= v?.performanceLevel?.topScore && item?.assessment >= v?.performanceLevel?.minimumScore) ? 'bg-warning-light' : ''}>{v?.criteria}</td>
                              </>
                            })
                          }
                          <td className="text-center vertical-middle">
                            {currentMenu?.updateAction ? (
                              <Input
                                type="number"
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
  ...experienceLearningRubricCriteriaValuationActions,
  ...experienceLearningRubricValuationActions,
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceLearningRubricCriteriaValuationList);
