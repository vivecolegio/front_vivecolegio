import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Badge, Input } from 'reactstrap';
import { createNotification } from '../../../helpers/Notification';
import { getInitialsName } from '../../../helpers/Utils';
import * as performanceLevelActions from '../../../stores/actions/Academic/PerformanceLevelActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import * as experienceLearningTraditionalValuationlActions from '../../../stores/actions/ExperienceLearningTraditionalValuationActions';
import { Colxx } from '../../common/CustomBootstrap';
import { Loader } from '../../common/Loader';
import ThumbnailImage from '../Aplications/AplicationsComponents/ThumbnailImage';

const ExperienceLearningTraditionalValuationList = (props: any) => {
  const [students, setStudents] = useState(null);
  const [performanceLevels, setPerformanceLevels] = useState(null);
  const [valuations, setValuations] = useState([]);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const courseId = params.get('courseId');
  const learningId = params.get('learningId');
  const learningName = params.get('learningName');
  const asignatureName = params.get('asignatureName');
  const gradeName = params.get('gradeName');
  const courseName = params.get('courseName');
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  useEffect(() => {
    props
      .getListAllExperienceLearningTraditionalValuation(learningId)
      .then(async (listData: any) => {
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
                  l?.node?.assessment <= c.node.topScore &&
                  l?.node?.assessment >= c.node.minimumScore
                );
              });
              l.node.performance = perf?.node?.name;
              return l.node;
            });
          });
        setValuations(valuationsArr);
        // get students of course and find the valuation for each one, but,if it doesn't exist, create it.
        props.dataCourse(courseId).then((course: any) => {
          setStudents(course?.data?.students);
          course?.data?.students.map(async (c: any, index: number) => {
            if (
              !valuationsArr.find((d: any) => {
                return d.studentId === c.id;
              })
            ) {
              let obj: any = {
                studentId: c.id,
                experienceLearningId: learningId,
                assessment: null,
                campusId: props?.loginReducer?.campusId,
              };
              await props.saveNewExperienceLearningTraditionalValuation(obj, false).then(
                (newValuation: any) => {
                  valuationsArr.push(newValuation?.data?.create);
                  setValuations(valuationsArr);
                },
                () => {
                  createNotification('error', 'error', '');
                },
              );
            }
          });
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

  const goTo = async () => {
    navigate(-1);
  };

  const save = async () => {
    setLoading(true);
    valuations.map(async (item: any) => {
      let obj = {
        assessment: item.assessment,
      };
      await props.updateExperienceLearningTraditionalValuation(obj, item.id).then(
        () => {
          setLoading(false);
        },
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  return (
    <>
      <div className="mt-4 d-flex justify-content-center align-items-center">
      <h1 className="font-bold">Valoración tradicional</h1>
      </div>
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
              <span className='text-muted'>Experiencia de aprendizaje:</span> <h4 className="font-bold text-blue">{learningName}</h4>
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
        <div>
          <button className="btn btn-blue" type="button" onClick={save}>
            Guardar valoración
          </button>
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
                            <Input
                              type="number"
                              onInput={(e) => {
                                return getPerformanceLevel(e, item);
                              }}
                              {...item?.assessment}
                              defaultValue={item.assessment}
                              className="form-control"
                            />
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
  ...experienceLearningTraditionalValuationlActions,
};

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceLearningTraditionalValuationList);
