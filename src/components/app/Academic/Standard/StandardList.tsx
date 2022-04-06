import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { COLUMN_LIST } from '../../../../constants/Standard/standardConstants';
import { createNotification } from '../../../../helpers/Notification';
import * as standardActions from '../../../../stores/actions/Academic/StandardActions';
import DataList from '../../../common/Data/DataList';
import StandardCreateEdit from './StandardCreateEdit';

const StandardList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let [params] = useSearchParams();
  const  asignatureId  = params.get('asignatureId');
  const  gradeId  = params.get('gradeId');

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllAcademicStandard(props?.loginReducer?.schoolId, asignatureId ? asignatureId : '', gradeId ? gradeId : '').then((listData: any) => {
      setDataTable(listData);
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllAcademicStandard(props?.loginReducer?.schoolId, asignatureId ? asignatureId : '', gradeId ? gradeId : '').then((listData: any) => {
      setDataTable(listData);
    });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    console.log(dataForm);
    if (data === null) {
      await props.saveNewStandard(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateStandard(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataStandard(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveStandard(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteStandard(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteStandard(item.id, false).then(
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
      await props.changeActiveStandard(!item.active, item.id, false).then(
        () => {},
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
          />
          <StandardCreateEdit
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
const mapDispatchToProps = { ...standardActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(StandardList);
