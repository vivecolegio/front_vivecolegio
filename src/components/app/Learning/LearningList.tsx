import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { COLUMN_LIST } from '../../../constants/Learning/LearningConstants';
import { createNotification } from '../../../helpers/Notification';
import * as learningActions from '../../../stores/actions/LearningActions';
import DataList from '../../common/Data/DataList';
import LearningCreateEdit from './LearningCreateEdit';

const Learning = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let [params] = useSearchParams();
  const  asignatureId  = params.get('asignatureId');
  const  gradeId  = params.get('gradeId');

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
  }, []);

  const getDataTable = async () => {
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
        goToChildren(`/evidenceLearning`);
        break;
    }
  };

  const goToChildren = async (url: string) => {
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
const mapDispatchToProps = { ...learningActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
