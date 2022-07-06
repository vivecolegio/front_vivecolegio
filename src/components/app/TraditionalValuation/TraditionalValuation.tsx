import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { Badge, Button, Input } from 'reactstrap';
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
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

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
          let valuationsArr: any = [];
          // get performance levels
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
              // set valuations list and get the performance level for each one
              valuationsArr = listData.map((l: any) => {
                const perf = levels?.find((c: any) => {
                  return (
                    l?.node.assessment &&
                    l?.node?.assessment <= c.node.topScore &&
                    l?.node?.assessment >= c.node.minimumScore
                  );
                });
                l.node.performance = perf;
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
    setValuations([]);
    props
      .getListAllExperienceLearningTraditionalValuation(learningId)
      .then(async (listData: any) => {
        let valuationsArr = listData.map((l: any) => {
          const perf = performanceLevels?.find((c: any) => {
            return (
              l?.node?.assessment <= c.node.topScore && l?.node?.assessment >= c.node.minimumScore
            );
          });
          l.node.performance = perf;
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
    valuations[elementIndex].performance = perf;
    valuations[elementIndex].assessment = e.target.value;
    const arr = Object.assign([], valuations);
    setValuations(arr);
  };

  const goTo = async () => {
    navigate(-1);
  };

  const save = async (event: any, item: any, performanceId: string) => {
    if (event.key === 'Enter') {
      let obj = {
        assessment: item?.assessment,
        performanceLevelId: performanceId,
      };
      await props.updateExperienceLearningTraditionalValuation(obj, item.id).then(
        () => {
          refreshDataTable();
          createNotification('success', 'success', '');
        },
        () => {
          createNotification('error', 'error', '');
        },
      );
    }
  };

  const saveBlur = async (item: any, performanceId: string) => {
    let obj = {
      assessment: item?.assessment,
      performanceLevelId: performanceId,
    };
    await props.updateExperienceLearningTraditionalValuation(obj, item.id).then(
      () => {
        createNotification('success', 'success', '');
        refreshDataTable();
      },
      () => {
        createNotification('error', 'error', '');
      },
    );
  };

  const setAll = async () => {
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
      await props.updateExperienceLearningTraditionalValuation(obj, item.id).then(
        () => {
        },
        () => {
          createNotification('error', 'error', '');
        },
      );
    }
    createNotification('success', 'success', '');
    refreshDataTable();
    setAssesstmentSelected(null);
    setPerformanceSelected(null);
  }

  return (
    <>
      <div className="mt-4 d-flex justify-content-center align-items-center">
        <h1 className="font-bold">Valoración tradicional</h1>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
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
        <div className="mt-4 w-30">
          <table className="table table-striped table-bordered">
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
      <div className="d-flex justify-content-start align-items-center mb-3 w-30">
        {
          valuations[0]?.performanceLevel?.type == 'QUANTITATIVE' ?
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
                            <span className="font-bold">{item?.student?.code}</span>
                          </td>
                          <td className="text-center">
                            <div className="d-flex align-items-center justify-content-start">
                              {item?.student?.user?.profilePhoto ? (
                                <ThumbnailImage
                                  rounded
                                  src={urlImages + item?.student?.user?.profilePhoto}
                                  alt="profile"
                                  className="xsmall mr-3"
                                />
                              ) : (
                                <span className="img-thumbnail md-avatar-initials border-0 span-initials rounded-circle mr-3 list-thumbnail align-self-center xsmall">
                                  {getInitialsName(
                                    item?.student?.user
                                      ? item?.student?.user?.lastName +
                                      ' ' +
                                      item?.student?.user?.name
                                      : 'N N',
                                  )}
                                </span>
                              )}
                              <span>
                                {item?.student?.user?.lastName} {item?.student?.user?.name}
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
                                    saveBlur(item, selectedOption?.value);
                                  }}
                                /> :
                                <Input
                                  type="number"
                                  onKeyPress={(event: any) => {
                                    return save(event, item, item?.performance?.node?.id);
                                  }}
                                  onBlur={(event: any) => {
                                    return saveBlur(item, item?.performance?.node?.id);
                                  }}
                                  onInput={(e: any) => {
                                    if (e.target.value < min || e.target.value > max) {
                                      e.target.value = null;
                                    }
                                    return getPerformanceLevel(e, item);
                                  }}
                                  {...item?.assessment}
                                  defaultValue={item?.assessment}
                                  className={item?.assessment ? 'border-green form-control' : 'form-control'}
                                />
                            }
                          </td>
                          {
                            valuations[0]?.performanceLevel?.type == 'QUALITATIVE' ?
                              '' :
                              <td className="text-center vertical-middle">
                                <Badge color="primary" className="font-0-8rem">
                                  {item?.performance?.node?.name}
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
