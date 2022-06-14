import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Badge, Input } from 'reactstrap';
import { compare, comparePerformanceLevelsTopScore } from '../../../helpers/DataTransformations';
import { createNotification } from '../../../helpers/Notification';
import { getInitialsName } from '../../../helpers/Utils';
import * as performanceLevelActions from '../../../stores/actions/Academic/PerformanceLevelActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import * as experienceLearningTraditionalValuationlActions from '../../../stores/actions/ExperienceLearningTraditionalValuationActions';
import { Colxx } from '../../common/CustomBootstrap';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';
import { Loader } from '../../common/Loader';
import ThumbnailImage from '../Aplications/AplicationsComponents/ThumbnailImage';

const ExperienceLearningTraditionalValuationList = (props: any) => {
  const [students, setStudents] = useState(null);
  const [performanceLevels, setPerformanceLevels] = useState(null);
  const [performanceLevelsList, setPerformanceLevelsList] = useState(null);
  const [performanceSelected, setPerformanceSelected] = useState({});
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
    setValuations(null);
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

  const save = async () => {
    setLoading(true);
    for (const item of valuations) {
      let obj = {
        assessment: item?.assessment,
        performanceLevelId: item?.performance?.node?.id,
      };
      console.log(obj);
      await props.updateExperienceLearningTraditionalValuation(obj, item.id).then(
        () => {
          setLoading(false);
        },
        () => {
          createNotification('error', 'error', '');
        },
      );
    }
    refreshDataTable();
    createNotification('success', 'success', '');
  };

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
        <div className="mt-4 w-25">
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
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-blue" type="button" onClick={save}>
          Guardar valoración
        </button>
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
                    {/* {
                      valuations[0]?.performance?.node?.type == 'QUANTITATIVE' ? */}
                    <th className="text-center">Nivel de desempeño</th>
                    {/* : ''
                    } */}
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
                            {/* {
                              item?.performance?.node?.type == 'QUANTITATIVE' ? */}
                            <Input
                              type="number"
                              onInput={(e: any) => {
                                if (e.target.value < min || e.target.value > max) {
                                  e.target.value = null;
                                }
                                return getPerformanceLevel(e, item);
                              }}
                              {...item?.assessment}
                              defaultValue={item?.assessment}
                              className="form-control"
                            />
                            {/* :
                                <Select
                                  isClearable
                                  placeholder={<IntlMessages id="forms.select" />}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  options={performanceLevelsList}
                                  value={{ label: item?.performance?.node?.name, key: item?.performance?.node?.id, value: item?.performance?.node?.id }}
                                  onChange={(selectedOption) => {
                                    item.performance = selectedOption;
                                  }}
                                />} */}
                          </td>
                          {/* {
                            item?.performance?.node?.type == 'QUANTITATIVE' ? */}
                          <td className="text-center vertical-middle">
                            <Badge color="primary" className="font-0-8rem">
                              {item?.performance?.node?.name}
                            </Badge>
                          </td>
                          {/* : ''
                          } */}
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
