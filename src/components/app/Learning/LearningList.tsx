import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { COLUMN_LIST } from '../../../constants/Learning/LearningConstants';
import { createNotification } from '../../../helpers/Notification';
import * as learningActions from '../../../stores/actions/LearningActions';
import * as academicPeriodActions from '../../../stores/actions/AcademicPeriodActions';
import DataList from '../../common/Data/DataList';
import LearningCreateEdit from './LearningCreateEdit';

const Learning = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [academicPeriods, setAcademicPeriods] = useState(null);
  let [academicPeriod, setAcademicPeriod] = useState([]);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let [params] = useSearchParams();
  const  asignatureId  = params.get('asignatureId');
  const  asignatureName  = params.get('asignatureName');
  const  gradeId  = params.get('gradeId');
  const  gradeName  = params.get('gradeName');

  let navigate = useNavigate();

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllLearning(props?.loginReducer?.schoolId, asignatureId ? asignatureId : '', gradeId ? gradeId : '').then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.grade_format = c.node.academicGrade ? c.node.academicGrade.name : '';
          c.node.asignature_format = c.node.academicAsignature
            ? c.node.academicAsignature.name
            : '';
          return c;
        }),
      );
    });
    props.getListAllAcademicPeriod(props?.loginReducer?.schoolId).then((listData: any) => {
      setAcademicPeriods(listData);  
    });
  }, []);

  const getDataTable = async (idAcademicPeriod:any = []) => {
    props.getListAllLearning(props?.loginReducer?.schoolId, asignatureId ? asignatureId : '', gradeId ? gradeId : '', idAcademicPeriod.length > 0 ?idAcademicPeriod : undefined ).then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.grade_format = c.node.academicGrade ? c.node.academicGrade.name : '';
          c.node.asignature_format = c.node.academicAsignature
            ? c.node.academicAsignature.name
            : '';
          return c;
        }),
      );
    });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    console.log(dataForm);
    if (data === null) {
      await props.saveNewLearning(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateLearning(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataLearning(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveLearning(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteLearning(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteLearning(item.id, false).then(
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
      await props.changeActiveLearning(!item.active, item.id, false).then(
        () => {},
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const additionalFunction = async (item: any, type: string) => {
    switch (type) {
      case 'goToChildrenLearning':
        goToChildren(`/evidenceLearning?learningId=${item.id}&learningName=${item.statement}`);
        break;
    }
  };

  const filterByPeriod = async (item: any) => {
    if(academicPeriod.find((c:any)=>{return (c === item?.node?.id)})){
      academicPeriod = academicPeriod.filter((c:any)=>{return (c !== item?.node?.id)});
    } else {
      academicPeriod.push(item?.node?.id)
    }
    setAcademicPeriod(academicPeriod);
    setDataTable(null);
    getDataTable(academicPeriod);
  };

  const goToChildren = async (url: string) => {
    navigate(url);
  };

  const goTo = async (url: string) => {
    navigate(url);
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
            header={
              <>
              <div className='d-flex justify-content-between align-items-center mt-4'>
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
                      return goTo('/academicAsignatureCourse');
                    }}
                  >
                    <i className="simple-icon-arrow-left-circle mr-2"></i>
                    Regresar a carga académica
                  </p>
                </div>
                <div>
                {academicPeriods ? 
                   academicPeriods.map((item: any) => {
                    return (
                      <>
                      <button onClick={() => {return filterByPeriod(item);}} key={item?.node?.id} className={`btn ${academicPeriod.find((c:any)=>{return (c === item?.node?.id)}) ? "btn-info" : "btn-outline-info"}`}
                          type="button"
                        >
                          <i className='iconsminds-pen-2'></i>{' '}
                          {item?.node?.name}
                      </button>{' '}
                      </>
                    )})
                :''}
                </div>
                </div>
              </>
            }
            changeActiveDataAll={changeActiveDataAll}
            additionalFunction={additionalFunction}
            childrenButtons={[
              {
                id: 0,
                label: 'Evidencias de aprendizaje',
                color: 'secondary',
                icon: 'iconsminds-library',
                action: 'goToChildrenLearning',
              },             
            ]}
            withChildren={true}
          />
          <LearningCreateEdit
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
const mapDispatchToProps = { ...learningActions, ...academicPeriodActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
