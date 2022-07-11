import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { Badge, Button, Input, Progress } from 'reactstrap';
import { compare, comparePerformanceLevelsTopScore } from '../../../helpers/DataTransformations';
import IntlMessages from '../../../helpers/IntlMessages';
import { createNotification } from '../../../helpers/Notification';
import { getInitialsName } from '../../../helpers/Utils';
import * as performanceLevelActions from '../../../stores/actions/Academic/PerformanceLevelActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import * as experienceLearningTraditionalValuationlActions from '../../../stores/actions/ExperienceLearningTraditionalValuationActions';
import { urlImages } from '../../../stores/graphql';
import { Colxx } from '../../common/CustomBootstrap';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';
import { Loader } from '../../common/Loader';
import ThumbnailImage from '../Aplications/AplicationsComponents/ThumbnailImage';

const ExperienceLearningTraditionalValuationList = (props: any) => {
  const [students, setStudents] = useState(null);
  const [performanceLevels, setPerformanceLevels] = useState(null);
  const [performanceLevelsList, setPerformanceLevelsList] = useState(null);
  const [performanceSelected, setPerformanceSelected] = useState(null);
  const [assesstmentSelected, setAssesstmentSelected] = useState(null);
  const [valuations, setValuations] = useState([]);
  const [valuationsBase, setValuationsBase] = useState([]);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [average, setAverage] = useState(null);
  const [progress, setProgress] = useState(0);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const academicAsignatureCourseId = params.get('academicAsignatureCourseId');
  const learningId = params.get('learningId');
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  useEffect(() => {
    props.generateExperienceLearningTraditionalValuation(learningId).then((response: any) => {
      props
        .getListAllExperienceLearningTraditionalValuation(learningId)
        .then(async (listData: any) => {
          await props
            .getListAllPerformanceLevelAsignatureCourse(academicAsignatureCourseId)
            .then((levels: any) => {
              setPerformanceLevels(levels);
              let levelsOrderDesc = levels.sort(comparePerformanceLevelsTopScore);
              setMax(levelsOrderDesc[levelsOrderDesc.length - 1]?.node?.topScore);
              setMin(levelsOrderDesc[0]?.node?.minimumScore);
              setPerformanceLevelsList(
                levels.map((c: any) => {
                  return { label: c.node.name, value: c.node.id, key: c.node.id };
                }),
              );
            });
          let progress = 0;
          let average = 0;
          listData.forEach((element: any) => {
            if (element?.node?.assessment) {
              progress++;
              average += element?.node?.assessment;
            }
          });
          setProgress(progress);
          setAverage(average / listData.length);
          setValuations([...listData.sort(compare)]);
          setValuationsBase(JSON.parse(JSON.stringify(listData)));
        });
    });
    setLoading(false);
  }, []);

  const refreshDataTable = async () => {
    await props
      .getListAllExperienceLearningTraditionalValuation(learningId)
      .then((listData: any) => {
        let progress = 0;
        let average = 0;
        listData.forEach((element: any) => {
          if (element?.node?.assessment) {
            progress++;
            average += element?.node?.assessment;
          }
        });
        setProgress(progress);
        setAverage(average / listData.length);
        setValuations([...listData.sort(compare)]);
        setValuationsBase(JSON.parse(JSON.stringify(listData)))
      });
  };

  const getPerformanceLevelAverage = (average: any) => {
    let perf = null;
    if (average) {
      if (average > 0) {
        perf = performanceLevels?.find((c: any) => {
          return average < c.node.topScore && average >= c.node.minimumScore;
        });
        if (perf === undefined) {
          perf = performanceLevels?.find((c: any) => {
            return average <= c.node.topScore && average > c.node.minimumScore;
          });
        }
      }
      return perf
    }
  }

  const getPerformanceLevel = async (e: any, valuation: any) => {
    let perf = null;
    if (e.target.value.length > 0) {
      perf = performanceLevels?.find((c: any) => {
        return e.target.value < c.node.topScore && e.target.value >= c.node.minimumScore;
      });
      if (perf === undefined) {
        perf = performanceLevels?.find((c: any) => {
          return e.target.value <= c.node.topScore && e.target.value > c.node.minimumScore;
        });
      }
    }
    const elementIndex = valuations.findIndex((obj) => {
      return obj.node.id === valuation.node.id;
    });
    if (perf) {
      valuations[elementIndex].node.performanceLevel = perf.node;
    } else {
      valuations[elementIndex].node.performanceLevel = null;
    }
    valuations[elementIndex].node.assessment = e.target.value;
    const arr = Object.assign([], valuations);
    setValuations(arr);
  };

  const saveBlur = async (item: any) => {
    const elementIndex = valuationsBase.findIndex((obj) => {
      return obj.node.id === item.node.id;
    });
    if (valuationsBase[elementIndex].node.assessment !== item?.node?.assessment) {
      let obj = {
        assessment: item?.node?.assessment,
        performanceLevelId: item?.node?.performanceLevel ? item?.node?.performanceLevel?.id : null
      };
      await props.updateExperienceLearningTraditionalValuation(obj, item.node.id).then(
        () => {
          createNotification('success', 'success', '');
          refreshDataTable();
        },
        () => {
          createNotification('error', 'error', '');
        },
      );
    }
  };

  const setAll = async () => {
    setLoading(true);
    let perf;
    if (assesstmentSelected) {
      perf = performanceLevels?.find((c: any) => {
        return assesstmentSelected <= c.node.topScore && assesstmentSelected >= c.node.minimumScore;
      });
    }
    let obj = {
      assessment: assesstmentSelected || 0,
      performanceLevelId: performanceSelected ? performanceSelected?.value : perf?.node?.id
    };
    for (const item of valuations) {
      await props.updateExperienceLearningTraditionalValuation(obj, item.node.id).then(
        () => {
        },
        () => {
          createNotification('error', 'error', '');
        },
      );
    }
    createNotification('success', 'success', '');
    setValuations([])
    refreshDataTable();
    setAssesstmentSelected(null);
    setPerformanceSelected(null);
    setLoading(false);
  }

  return (
    <>
      <div className="mt-4 d-flex justify-content-center align-items-center">
        <h1 className="font-bold">Valoración tradicional</h1>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center mb-2">
        <HeaderInfoAcademic
          asignature
          grade
          course
          modality
          experienceLearnig
          goTitle="Regresar a experiencias de aprendizaje"
          experienceLearnigId={learningId}
          academicAsignatureCourseId={academicAsignatureCourseId}
        />
        <div className="w-30">
          <table className="table table-striped mb-0">
            <tbody>
              <tr>
                <td>
                  <strong>Nivel de desempeño</strong>
                </td>
                <td>
                  <strong>Minimo</strong>
                </td>
                <td>
                  <strong>Maximo</strong>
                </td>
              </tr>
              {performanceLevels?.map((e: any) => {
                return (
                  <tr>
                    <td> {`${e?.node?.name}`}</td>
                    <td> {`${e?.node?.minimumScore}`} </td>
                    <td> {`${e?.node?.topScore}`} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex justify-content-start align-items-center" >
        <div className="d-flex justify-content-start align-items-center mb-3 w-30">
          {
            valuations[0]?.node?.performanceLevel?.type == 'QUANTITATIVE' ?
              <Input
                type="number"
                placeholder='Nota...'
                className="form-control w-30"
                onInput={(e: any) => {
                  if (e.target.value < min || e.target.value > max) {
                    e.target.value = null;
                  }
                  setAssesstmentSelected(e.target.value);
                }}
                step="0.1"
              />
              :
              <Select
                isClearable
                placeholder='Nota...'
                className="react-select"
                classNamePrefix="react-select"
                options={performanceLevelsList}
                onChange={(selectedOption: any) => {
                  setPerformanceSelected(selectedOption);
                }}
              />}
          <Button
            className="ml-2 btn-outline-info"
            size="xs"
            onClick={() => {
              setAll();
            }}
          >
            Aplicar a todos
          </Button>

        </div>
        <div className="d-flex justify-content-center align-items-center mb-3 w-40">
          <div className="text-center mr-1">
            Valoración Promedio:
          </div>
          <CountUp
            start={0}
            preserveValue={true}
            end={valuations?.length > 0 ? average : 0}
            decimals={1}
            decimal={","}
            className="font-weight-bold"
          />
          <Badge color="primary" className="font-0-8rem ml-2">
            {getPerformanceLevelAverage(average) ? getPerformanceLevelAverage(average)?.node.name : ""}
          </Badge>
        </div>
        <div className="d-flex justify-content-start align-items-center mb-3 w-30">
          <div className="text-center mr-1">
            Progreso de Valoración:
          </div>
          <Progress
            bar
            color="primary"
            value={valuations?.length > 0 ? ((progress / valuations?.length) * 100) : 0}
          > ({progress}/{valuations?.length}) {valuations?.length > 0 ? ((progress / valuations?.length) * 100).toFixed(2) : 0}%</Progress>
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
                    <th className="text-center">Código</th>
                    <th className="text-center">Estudiante</th>
                    <th className="text-center">Valoración</th>
                    {
                      valuations[0]?.performanceLevel?.type == 'QUALITATIVE' ?
                        ''
                        : <th className="text-center">Nivel de desempeño</th>
                    }
                  </tr>
                </thead>
                <tbody>
                  {valuations.map((item: any, index: any) => {
                    return (
                      <>
                        <tr key={index}>
                          <td className="text-center vertical-middle">
                            <span className="font-bold">{item?.node?.student?.code}</span>
                          </td>
                          <td className="text-center">
                            <div className="d-flex align-items-center justify-content-start">
                              {item?.node?.student?.user?.profilePhoto ? (
                                <ThumbnailImage
                                  rounded
                                  src={urlImages + item?.node?.student?.user?.profilePhoto}
                                  alt="profile"
                                  className="xsmall mr-3"
                                />
                              ) : (
                                <span className="img-thumbnail md-avatar-initials border-0 span-initials rounded-circle mr-3 list-thumbnail align-self-center xsmall">
                                  {getInitialsName(
                                    item?.node?.student?.user
                                      ? item?.node?.student?.user?.lastName +
                                      ' ' +
                                      item?.node?.student?.user?.name
                                      : 'N N',
                                  )}
                                </span>
                              )}
                              <span>
                                {item?.node?.student?.user?.lastName} {item?.node?.student?.user?.name}
                              </span>
                            </div>
                          </td>
                          <td className="text-center vertical-middle">
                            {
                              valuations[0]?.performanceLevel?.type == 'QUALITATIVE' ?
                                <Select
                                  isClearable
                                  placeholder={<IntlMessages id="forms.select" />}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  options={performanceLevelsList}
                                  value={{ label: item?.performanceLevel?.name, key: item?.performanceLevel?.id, value: item?.performanceLevel?.id }}
                                  onChange={(selectedOption: any) => {
                                    item.assessment = 0;
                                    saveBlur(item);
                                  }}
                                /> :
                                <Input
                                  type="number"
                                  onBlur={(event: any) => {
                                    return saveBlur(item);
                                  }}
                                  onInput={(e: any) => {
                                    if (e.target.value < min || e.target.value > max) {
                                      e.target.value = null;
                                    }
                                    return getPerformanceLevel(e, item);
                                  }}
                                  {...item?.node?.assessment}
                                  defaultValue={item?.node?.assessment}
                                  className={item?.node?.assessment ? 'border-green form-control' : 'form-control'}
                                />
                            }
                          </td>
                          {
                            valuations[0]?.performanceLevel?.type == 'QUALITATIVE' ?
                              '' :
                              <td className="text-center vertical-middle">
                                <Badge color="primary" className="font-0-8rem">
                                  {item?.node?.performanceLevel?.name}
                                </Badge>
                              </td>
                          }
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
  ...experienceLearningTraditionalValuationlActions,
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceLearningTraditionalValuationList);
