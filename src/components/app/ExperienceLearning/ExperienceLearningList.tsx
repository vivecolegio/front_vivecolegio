import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { COLUMN_LIST } from '../../../constants/ExperienceLearning/experienceLearningConstants';
import { createNotification } from '../../../helpers/Notification';
import * as experienceLearningActions from '../../../stores/actions/ExperienceLearningActions';
import DataList from '../../common/Data/DataList';
import ExperienceLearningCreateEdit from './ExperienceLearningCreateEdit';

const ExperienceLearningList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);
  const [academicPeriods, setAcademicPeriods] = useState(null);
  const [academicPeriod, setAcademicPeriod] = useState(null);
  const [role, setRole] = useState(null);
  const [experienceTypes, setExperienceTypes] = useState([
    { label: 'Coevaluación', key: 'COEVALUATION' },
    { label: 'Autoevaluación', key: 'SELFAPPRAISAL' },
    { label: 'Valoración tradicional', key: 'TRADITIONALVALUATION' },
    { label: 'Rúbrica de valoración', key: 'VALUATIONRUBRIC' },
    { label: 'Prueba en Línea', key: 'ONLINETEST' },
  ]);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const academicAsignatureCourseId = params.get('academicAsignatureCourseId');
  const asignatureName = params.get('asignatureName');
  const gradeName = params.get('gradeName');

  const [data, setData] = useState(null);
  useEffect(() => {
    setRole(props?.loginReducer?.role?.name);
    props
      .getListAllExperienceLearning(props?.loginReducer?.campusId, academicAsignatureCourseId)
      .then((listData: any) => {
        setDataTable(listData);
      });
      props.getDropdownsExperienceLearning(props?.loginReducer?.schoolId).then((listData: any) => {
        setAcademicPeriods(listData.dataAcademicPeriods.edges);  
      });
  }, []);

  const getDataTable = async (idAcademicPeriod: any = null) => {
    props
      .getListAllExperienceLearning(
        props?.loginReducer?.campusId,
        academicAsignatureCourseId,
        idAcademicPeriod ? idAcademicPeriod : undefined,
      )
      .then((listData: any) => {
        console.log(listData)
        setDataTable(listData);
      });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    if (data === null) {
      await props.saveNewExperienceLearning(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateExperienceLearning(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataExperienceLearning(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveExperienceLearning(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteExperienceLearning(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteExperienceLearning(item.id, false).then(
        () => {},
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const changeActiveDataAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.changeActiveExperienceLearning(!item.active, item.id, false).then(
        () => {},
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const filterByPeriod = async (item: any) => {
    setAcademicPeriod(item?.node?.id === academicPeriod?.node?.id ? null : item);
    setDataTable(null);
    await getDataTable(item?.node?.id);
  };

  const goTo = async (url: string) => {
    navigate(url);
  };

  const goToChildren = async (url: string) => {
    navigate(url);
  };

  const additionalFunction = async (item: any, btn: any) => {
    console.log(item);
    switch (btn?.action) {
      case 'TRADITIONALVALUATION':
        goToChildren(
          `/traditionalValuation?courseId=${item?.academicAsignatureCourse?.courseId}&learningId=${item?.id}&learningName=${item?.title}&asignatureName=${item?.academicAsignatureCourse?.academicAsignature?.name}&courseName=${item?.academicAsignatureCourse?.course?.name}&gradeName=${item?.academicAsignatureCourse?.course?.academicGrade?.name}`,
        );
        break;
      case 'SELFAPPRAISAL':
        goToChildren(
          `/selfValuation?courseId=${item?.academicAsignatureCourse?.courseId}&learningId=${item?.id}&learningName=${item?.title}&asignatureName=${item?.academicAsignatureCourse?.academicAsignature?.name}&courseName=${item?.academicAsignatureCourse?.course?.name}&gradeName=${item?.academicAsignatureCourse?.course?.academicGrade?.name}`,
        );
        break;
      case 'VALUATIONRUBRIC':
        if(btn.type === 'CRITERIA'){          
          goToChildren(
            `/rubricCriteria?courseId=${item?.academicAsignatureCourse?.courseId}&learningId=${item?.id}&learningName=${item?.title}&asignatureName=${item?.academicAsignatureCourse?.academicAsignature?.name}&courseName=${item?.academicAsignatureCourse?.course?.name}&gradeName=${item?.academicAsignatureCourse?.course?.academicGrade?.name}`,
          );
        } else {
          goToChildren(
            `/rubricValuation?courseId=${item?.academicAsignatureCourse?.courseId}&learningId=${item?.id}&learningName=${item?.title}&asignatureName=${item?.academicAsignatureCourse?.academicAsignature?.name}&courseName=${item?.academicAsignatureCourse?.course?.name}&gradeName=${item?.academicAsignatureCourse?.course?.academicGrade?.name}`,
          );
        }
        break;
      case 'COEVALUATION':
        goToChildren(
          role !== 'ESTUDIANTE' ? 
          `/coEvaluation?courseId=${item?.academicAsignatureCourse?.courseId}&learningId=${item?.id}&learningName=${item?.title}&asignatureName=${item?.academicAsignatureCourse?.academicAsignature?.name}&courseName=${item?.academicAsignatureCourse?.course?.name}&gradeName=${item?.academicAsignatureCourse?.course?.academicGrade?.name}`
          :  `/coEvaluationStudents?courseId=${item?.academicAsignatureCourse?.courseId}&learningId=${item?.id}&learningName=${item?.title}&asignatureName=${item?.academicAsignatureCourse?.academicAsignature?.name}&courseName=${item?.academicAsignatureCourse?.course?.name}&gradeName=${item?.academicAsignatureCourse?.course?.academicGrade?.name}`,
        ); 
        break;
      default:
        break;
    }
  };

  return (
    <>
      {' '}
      {dataTable !== null ? (
        <>
          <DataList
            data={dataTable}
            columns={columns}
            match={props?.match}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            viewEditData={viewEditData}
            deleteData={deleteData}
            changeActiveData={changeActiveData}
            deleteAll={deleteAll}
            changeActiveDataAll={changeActiveDataAll}
            additionalFunction={additionalFunction}
            childrenButtons={[
              {
                id: 0,
                label: 'Coevaluación',
                color: 'info',
                icon: 'iconsminds-pen-2',
                action: 'COEVALUATION',
              },            
              {
                id: 1,
                label: 'Autoevaluación',
                color: 'info',
                icon: 'iconsminds-pen-2',
                action: 'SELFAPPRAISAL',
              },
              {
                id: 2,
                label: 'Valoración tradicional',
                color: 'info',
                icon: 'iconsminds-pen-2',
                action: 'TRADITIONALVALUATION',
              },
              {
                id: 3,
                label: 'Rúbrica de valoración',
                color: 'info',
                icon: 'iconsminds-pen-2',
                action: 'VALUATIONRUBRIC',
                type: 'RUBRIC',
              },
              {
                id: 4,
                label: 'Criterios de rúbrica',
                color: 'warning',
                icon: 'iconsminds-pen-2',
                action: 'VALUATIONRUBRIC',
                type: 'CRITERIA',
              },
              {
                id: 5,
                label: 'Prueba en Línea',
                color: 'info',
                icon: 'iconsminds-pen-2',
                action: 'ONLINETEST',
              },
            ]}
            withChildren={true}
            filterChildren={'experienceType'}
            header={
              <>
                <div className="d-flex justify-content-between mt-4 align-items-center">
                <div className="mt-4">
                  <div className="d-flex flex-row">
                    <span className="mb-0 text-muted mr-4 border-b-info">
                      <span>Asignatura:</span>{' '}
                      <h2 className="text-info font-bold">{asignatureName}</h2>
                    </span>
                    <span className="mb-0 text-muted border-b-green">
                      Grado: <h2 className="text-green font-bold">{gradeName}</h2>
                    </span>
                  </div>
                  <p
                    className="text-muted mt-2 d-flex align-items-center cursor-pointer"
                    onClick={() => {
                      return goTo('/myClasses');
                    }}
                  >
                    <i className="simple-icon-arrow-left-circle mr-2"></i>
                    Regresar a mis clases
                  </p>
                </div>
                  <div>
                    {academicPeriods
                      ? academicPeriods.map((item: any) => {
                          return (
                            <>
                              <button
                                onClick={() => {
                                  return filterByPeriod(item);
                                }}
                                key={item?.node?.id}
                                className={`btn ${
                                  academicPeriod?.node?.id === item?.node?.id
                                    ? 'btn-info'
                                    : 'btn-outline-info'
                                }`}
                                type="button"
                              >
                                <i className="iconsminds-pen-2"></i> {item?.node?.name}
                              </button>{' '}
                            </>
                          );
                        })
                      : ''}
                  </div>
                </div>
              </>
            }
          />
          <ExperienceLearningCreateEdit
            data={data}
            isLg={true}
            modalOpen={modalOpen}
            toggleModal={() => {
              setData(null);
              return setModalOpen(!modalOpen);
            }}
            onSubmit={onSubmit}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapDispatchToProps = { ...experienceLearningActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceLearningList);
