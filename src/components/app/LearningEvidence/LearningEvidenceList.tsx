import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { COLUMN_LIST } from '../../../constants/LearningEvidence/learningEvidenceConstants';
import { createNotification } from '../../../helpers/Notification';
import * as learningEvidenceActions from '../../../stores/actions/LearningEvidenceActions';
import DataList from '../../common/Data/DataList';
import LearningEvidenceCreateEdit from './LearningEvidenceCreateEdit';

const LearningEvidenceList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);  

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const  learningId  = params.get('learningId');
  const  learningName  = params.get('learningName');

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllLearningEvidence(props?.loginReducer?.schoolId, learningId).then((listData: any) => {
      setDataTable(listData);
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllLearningEvidence(props?.loginReducer?.schoolId, learningId).then((listData: any) => {
      setDataTable(listData);
    });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    if (data === null) {
      await props.saveNewLearningEvidence(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateLearningEvidence(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataLearningEvidence(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveLearningEvidence(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteLearningEvidence(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteLearningEvidence(item.id, false).then(
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
      await props.changeActiveLearningEvidence(!item.active, item.id, false).then(
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
            header={
              <>
                <div className='mt-4'>
                  <h2 className='mb-0'>
                    <span className='text-green font-bold'>{learningName}</span>
                  </h2>
                  <p className='text-muted d-flex align-items-center cursor-pointer' onClick={() => {return goTo()}}>
                    <i className='simple-icon-arrow-left-circle mr-2'></i>
                    Regresar a aprendizajes
                  </p>
                </div>
              </>
            }
          />
          <LearningEvidenceCreateEdit
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
const mapDispatchToProps = { ...learningEvidenceActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningEvidenceList);
