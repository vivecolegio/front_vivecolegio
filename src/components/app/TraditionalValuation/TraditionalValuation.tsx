import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Badge, Input } from 'reactstrap';
import { createNotification } from '../../../helpers/Notification';
import { getInitialsName } from '../../../helpers/Utils';
import * as performanceLevelActions from '../../../stores/actions/Academic/PerformanceLevelActions';
import * as experienceLearningTraditionalValuationlActions from '../../../stores/actions/ExperienceLearningTraditionalValuationActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import ThumbnailImage from '../Aplications/AplicationsComponents/ThumbnailImage';

const AcademicAsignatureCourseList = (props: any) => {
  const [students, setStudents] = useState(null);
  const [performanceLevels, setPerformanceLevels] = useState(null);
  const [valuations, setValuations] = useState([]);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const courseId = params.get('courseId');
  const learningId = params.get('learningId');

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllPerformanceLevel(props?.loginReducer?.schoolId).then((listData: any) => {
      setPerformanceLevels(listData);
    });
    props.dataCourse(courseId).then((listData: any) => {
      // setStudents(listData.students);
      let arr: any = [];
      [
        {
          cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
          node: {
            id: '624fc7d68859be44cce28481',
            active: true,
            school: [],
            campus: [],
            user: {
              id: '624fc7d68859be44cce28480',
              name: 'Helen Marianne',
              lastName: 'Echeverria Gamboa',
              phone: '3016307176',
              email: 'nataligamboa610@gmail.com',
              __typename: 'User',
            },
            __typename: 'Student',
          },
          __typename: 'StudentEdge',
        },
        {
          cursor: 'YXJyYXljb25uZWN0aW9uOjE=',
          node: {
            id: '61fae6936770295e7c3775b0',
            active: true,
            school: [],
            campus: [],
            user: {
              id: '61fae6936770295e7c3775af',
              name: 'Claudia Natali ',
              lastName: 'Gamboa Ojeda',
              urlPhoto:
                'https://i2.wp.com/agebh.org/wp-content/uploads/2016/02/FOTO-CARNET.jpg?fit=314%2C357',
              phone: '3016307176',
              email: 'claudianataligo@domingosabio.com',
              __typename: 'User',
            },
            __typename: 'Student',
          },
          __typename: 'StudentEdge',
        },
      ].map((c: any, index: number) => {
        arr.push({ student: c.node, valoration: 0, performance: '--', id: index });
      });
      setValuations(arr);
    });
  }, []);

  const getStudents = async () => {
    props.dataCourse(courseId).then((listData: any) => {
      setStudents(listData.students);
    });
  };

  const refreshDataTable = async () => {
    setStudents(null);
    await getStudents();
  };

  const getPerformanceLevel = async (e: any, valuation: any) => {
    const perf = performanceLevels.find((c: any) => {
      return e.target.value <= c.node.topScore && e.target.value >= c.node.minimumScore;
    });
    const elementIndex = valuations.findIndex((obj) => {
      return obj.id === valuation.id;
    });
    valuations[elementIndex].performance = perf?.node?.name;
    valuations[elementIndex].valoration = e.target.value;
    const arr = Object.assign([], valuations);
    setValuations(arr);
  };

  const goTo = async () => {
    navigate(-1);
  };

  const save = async () => {
    valuations.map(async (item: any) => {
      let obj = {
        studentId: item?.student?.id,
        experienceLearningId: learningId,
        campusId: props?.loginReducer?.campusId,
        assessment: item.valoration,
      };
      console.log(obj)
          await props.saveNewExperienceLearningTraditionalValuationActions(obj, false).then(
            () => {},
            () => {
              createNotification('error', 'error', '');
            },
          );
        });
        createNotification('success', 'success', '');
  };

  return (
    <>
    <div className="mt-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-0">
            <span className="text-blue font-bold">Valoración tradicional</span>
          </h2>
          <p
            className="text-muted d-flex align-items-center cursor-pointer"
            onClick={() => {
              return goTo();
            }}
          >
            <i className="simple-icon-arrow-left-circle mr-2"></i>
            Regresar a experiencias de aprendizaje
          </p>
        </div>
        <div>
          <button className="btn btn-blue"
                  type="button"
                  onClick={save}
                >
                  Guardar
              </button>
        </div>
      </div>
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
              {valuations.map((item: any) => {
                return (
                  <>
                    <tr>
                      <td className="text-center">
                        {item?.student?.user?.code}
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
                              {getInitialsName(item?.student?.user?.name)}
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
                          {...item?.valoration}
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
  );
};
const mapDispatchToProps = { ...courseActions, ...performanceLevelActions, ...experienceLearningTraditionalValuationlActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicAsignatureCourseList);
