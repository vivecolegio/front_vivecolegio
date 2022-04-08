import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Badge, Input } from 'reactstrap';
import { COLUMN_LIST } from '../../../constants/AcademicAsignatureCourse/AcademicAsignatureCourseConstants';
import { getInitialsName } from '../../../helpers/Utils';
import * as performanceLevelActions from '../../../stores/actions/Academic/PerformanceLevelActions';
import * as courseActions from '../../../stores/actions/CourseActions';
import ThumbnailImage from '../Aplications/AplicationsComponents/ThumbnailImage';

const AcademicAsignatureCourseList = (props: any) => {
  const [students, setStudents] = useState(null);
  const [performanceLevels, setPerformanceLevels] = useState(null);
  const [valuations, setValuations] = useState([]);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const courseId = params.get('courseId');

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
    const arr = Object.assign([], valuations);
    setValuations(arr);
  };

  // const onSubmit = async (dataForm: any) => {
  //   console.log(dataForm);
  //   if (data === null) {
  //     await props.saveNewAcademicAsignatureCourse(dataForm).then((id: any) => {
  //       if (id !== undefined) {
  //         setModalOpen(false);
  //         refreshDataTable();
  //       }
  //     });
  //   } else {
  //     await props.updateAcademicAsignatureCourse(dataForm, data.id).then((id: any) => {
  //       if (id !== undefined) {
  //         setModalOpen(false);
  //         setData(null);
  //         refreshDataTable();
  //       }
  //     });
  //   }
  // };

  // const viewEditData = async (id: any) => {
  //   await props.dataAcademicAsignatureCourse(id).then((formData: any) => {
  //     setData(formData.data);
  //     setModalOpen(true);
  //   });
  // };

  // const changeActiveData = async (active: any, id: any) => {
  //   await props.changeActiveAcademicAsignatureCourse(active, id, true).then((formData: any) => {
  //     refreshDataTable();
  //   });
  // };

  // const deleteData = async (id: any) => {
  //   await props.deleteAcademicAsignatureCourse(id, true).then((formData: any) => {
  //     refreshDataTable();
  //   });
  // };

  // const deleteAll = async (items: any) => {
  //   items.map(async (item: any) => {
  //     await props.deleteUser(item.id, false).then(
  //       () => {},
  //       () => {
  //         createNotification('error', 'error', '');
  //       },
  //     );
  //   });
  //   refreshDataTable();
  //   createNotification('success', 'success', '');
  // };

  // const changeActiveDataAll = async (items: any) => {
  //   items.map(async (item: any) => {
  //     await props.changeActiveUser(!item.active, item.id, false).then(
  //       () => {},
  //       () => {
  //         createNotification('error', 'error', '');
  //       },
  //     );
  //   });
  //   refreshDataTable();
  //   createNotification('success', 'success', '');
  // };

  // const additionalFunction = async (item: any, type: string) => {
  //   switch (type) {
  //     case 'goToChildrenExperience':
  //       goToChildren(
  //         `/experienceLearning?gradeId=${item?.course?.academicGradeId}&gradeName=${item?.course?.name}&asignatureId=${item.academicAsignatureId}&asignatureName=${item.academicAsignature?.name}&academicAsignatureCourseId=${item?.id}`,
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const goToChildren = async (url: string) => {
  //   navigate(url);
  // };

  const goTo = async () => {
    navigate(-1);
  };

  return (
    <>
      <div className="mt-4">
        <h2 className="mb-0">
          <span className="text-green font-bold">Valoración tradicional</span>
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
      </div>{' '}
      {valuations !== null ? (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center">Estudiantes</th>
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
const mapDispatchToProps = { ...courseActions, ...performanceLevelActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicAsignatureCourseList);
