import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { COLUMN_LIST } from '../../../constants/ExperienceLearningRubricCriteria/experienceLearningRubricCriteriaConstants';
import { createNotification } from '../../../helpers/Notification';
import * as academicPeriodActions from '../../../stores/actions/AcademicPeriodActions';
import * as experienceLearningRubricCriteriaActions from '../../../stores/actions/ExperienceLearningRubricCriteriaActions';
import DataList from '../../common/Data/DataList';
import ExperienceLearningRubricCriteriaCreateEdit from './RubricCriteriaCreateEdit';

const ExperienceLearningRubricCriteriaList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);
  const [total, setTotal] = useState(0);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const courseId = params.get('courseId');
  const learningId = params.get('learningId');
  const learningName = params.get('learningName');
  const asignatureName = params.get('asignatureName');
  const gradeName = params.get('gradeName');
  const courseName = params.get('courseName');

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllExperienceLearningRubricCriteria(learningId).then((listData: any) => {
      setDataTable(listData);
      let count = 0;
      listData?.map((d:any)=>{
        count += d?.node?.weight;
      })
      setTotal(count);
    });
  }, []);

  const getDataTable = async (idAcademicPeriod: any = null) => {
    props.getListAllExperienceLearningRubricCriteria(learningId).then(async (listData: any) => {
      await setDataTable(listData);
      getCantTotal(listData);
    });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    if (data === null) {
      await props.saveNewExperienceLearningRubricCriteria(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateExperienceLearningRubricCriteria(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataExperienceLearningRubricCriteria(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props
      .changeActiveExperienceLearningRubricCriteria(active, id, true)
      .then((formData: any) => {
        refreshDataTable();
      });
  };

  const deleteData = async (id: any) => {
    await props.deleteExperienceLearningRubricCriteria(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteExperienceLearningRubricCriteria(item.id, false).then(
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
      await props.changeActiveExperienceLearningRubricCriteria(!item.active, item.id, false).then(
        () => {},
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const goTo = async () => {
    navigate(-1);
  };

  const goToChildren = async (url: string) => {
    navigate(url);
  };

  const getCantTotal = async (dataList: any[]) => {
    let count = 0;
    dataList?.map((d:any)=>{
      count += d?.node?.weight;
    })
    setTotal(count);
  };

  const additionalFunction = async (item: any, btn: any) => {
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
        goToChildren(
          `/rubricValuation?courseId=${item?.academicAsignatureCourse?.courseId}&learningId=${item?.id}&learningName=${item?.title}&asignatureName=${item?.academicAsignatureCourse?.academicAsignature?.name}&courseName=${item?.academicAsignatureCourse?.course?.name}&gradeName=${item?.academicAsignatureCourse?.course?.academicGrade?.name}`,
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
            createActionDisabled={total >=100 ? true : false}
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
              },
              {
                id: 4,
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
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mt-4">
                      <div className="d-flex flex-row">
                        <span className="mb-0 text-muted mr-4 border-b-info">
                          <span>Asignatura:</span>{' '}
                          <h2 className="text-info font-bold">{asignatureName}</h2>
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
                  </div>  
                  <div className='d-flex text-right flex-column'>
                    <span>Peso total:</span>{' '}
                    <h1 className="text-info font-bold">{total}</h1>                      
                  </div>              
                </div>
              </>
            }
          />
          <ExperienceLearningRubricCriteriaCreateEdit
            data={data}
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
const mapDispatchToProps = { ...experienceLearningRubricCriteriaActions, ...academicPeriodActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceLearningRubricCriteriaList);
