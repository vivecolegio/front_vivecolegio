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
  const [experienceTypes, setExperienceTypes] = useState([
    { label: 'Coevaluación', key: 'COEVALUATION' },
    { label: 'Autoevaluación', key: 'SELFAPPRAISAL' },
    { label: 'Valoración tradicional', key: 'TRADITIONALVALUATION' },
    { label: 'Rúbrica de valoración', key: 'VALUATIONRUBRIC' },
    { label: 'Prueba en Línea', key: 'ONLINETEST' },
  ]);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const  academicAsignatureCourseId   = params.get('academicAsignatureCourseId');
  const  asignatureName  = params.get('asignatureName');
  const  gradeName  = params.get('gradeName');

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllExperienceLearning(props?.loginReducer?.campusId, academicAsignatureCourseId ).then((listData: any) => {
      setDataTable(listData);
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllExperienceLearning(props?.loginReducer?.campusId, academicAsignatureCourseId ).then((listData: any) => {
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

  const getChildrenButtons = async (type: string) => {
    const buttons = [
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
    ];
    // let btn = buttons.find((c:any)=>{return (c.action === type)});
    // console.log(btn)
    // return btn ? [btn] : [];
    console.log(buttons)
    return buttons;
  };

  const goTo = async (url: string) => {
    navigate(url);
  };

  const goToChildren = async (url: string) => {
    navigate(url);
  };

  const additionalFunction = async (item: any, type: string) => {
    console.log(item);
    switch (type) {
      case 'TRADITIONALVALUATION':
        goToChildren(`/traditionalValuation?courseId=${item?.academicAsignatureCourse?.courseId}`);
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
                <div className='mt-4'>
                  <h2 className='mb-0'>
                    <span className='text-info font-bold'>{asignatureName}</span> - <span className='text-green font-bold'>{gradeName}</span>
                  </h2>
                  <p className='text-muted d-flex align-items-center cursor-pointer' onClick={() => {return goTo('/myClasses')}}>
                    <i className='simple-icon-arrow-left-circle mr-2'></i>
                    Regresar a mis clases
                  </p>
                </div>
              </>
            }
          />
          <ExperienceLearningCreateEdit
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
const mapDispatchToProps = { ...experienceLearningActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceLearningList);
