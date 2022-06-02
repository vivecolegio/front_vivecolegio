import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { COLUMN_LIST } from '../../../../constants/Asignature/asignatureConstants';
import { createNotification } from '../../../../helpers/Notification';
import * as asignatureActions from '../../../../stores/actions/Academic/AsignatureActions';
import DataList from '../../../common/Data/DataList';
import HeaderInfoAcademic from '../../../common/Data/HeaderInfoAcademic';
import AsignatureCreateEdit from './AsignatureCreateEdit';

const AsignatureList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let [params] = useSearchParams();
  const areaName = params.get('areaName');

  const [data, setData] = useState(null);
  useEffect(() => {
    const areaId = params.get('id');
    props.getListAllAcademicAsignature(props?.loginReducer?.schoolId, areaId ? areaId : '').then((listData: any) => {
      setDataTable(listData.map((c: any) => {
        c.node.generalAsignature_format = c.node.generalAcademicAsignature ? c.node.generalAcademicAsignature.name : '';
        return c;
      }));
    });
  }, []);

  const getDataTable = async () => {
    const areaId = params.get('id');
    props.getListAllAcademicAsignature(props?.loginReducer?.schoolId, areaId ? areaId : '').then((listData: any) => {
      setDataTable(listData.map((c: any) => {
        c.node.generalAsignature_format = c.node.generalAcademicAsignature ? c.node.generalAcademicAsignature.name : '';
        return c;
      }));
    });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    //console.log(dataForm);
    if (data === null) {
      await props.saveNewAsignature(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateAsignature(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataAsignature(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveAsignature(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteAsignature(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteAsignature(item.id, false).then(
        () => { },
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
      await props.changeActiveAsignature(!item.active, item.id, false).then(
        () => { },
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
          <HeaderInfoAcademic generic={{ title: 'Área', value: areaName }} goTitle="Regresar a áreas" />
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
          <AsignatureCreateEdit
            data={data}
            modalOpen={modalOpen}
            toggleModal={() => {
              setData(null);
              return setModalOpen(!modalOpen);
            }}
            onSubmit={onSubmit}
          >
          </AsignatureCreateEdit>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapDispatchToProps = { ...asignatureActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AsignatureList);
