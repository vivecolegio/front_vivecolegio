import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

import { COLUMN_LIST } from '../../../../constants/Area/areaConstants';
import { createNotification } from '../../../../helpers/Notification';
import * as areaActions from '../../../../stores/actions/Academic/AreaActions';
import { Colxx } from '../../../common/CustomBootstrap';
import DataList from '../../../common/Data/DataList';
import { Loader } from '../../../common/Loader';
import AreaCreateEdit from './AreaCreateEdit';

const AreaList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let navigate = useNavigate();

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllAcademicArea(props?.loginReducer?.schoolId).then((listData: any) => {
      setDataTable(listData.map((c: any) => {
        c.node.generalArea_format = c.node.generalAcademicArea ? c.node.generalAcademicArea.name : '';
        return c;
      }));
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllAcademicArea(props?.loginReducer?.schoolId).then((listData: any) => {
      setDataTable(listData.map((c: any) => {
        c.node.generalArea_format = c.node.generalAcademicArea ? c.node.generalAcademicArea.name : '';
        return c;
      }));
    });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    if (data === null) {
      await props.saveNewArea(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateArea(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataArea(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveArea(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteArea(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteArea(item.id, false).then(
        () => { },
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const additionalFunction = async (item: any, btn: any) => {
    switch (btn?.action) {
      case 'goToChildren':
        goToChildren(item);
        break;
      default:
        break;
    }
  };

  const goToChildren = async (item: any) => {
    navigate(`/asignatures?id=${item?.id}&areaName=${item?.name}&areaGeneralId=${item.generalAcademicAreaId}`);
  };

  const changeActiveDataAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.changeActiveArea(!item.active, item.id, false).then(
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
                label: 'Asignaturas',
                color: 'secondary',
                icon: 'simple-icon-link',
                action: 'goToChildren',
              },
            ]}
            withChildren={true}
            refreshDataTable={refreshDataTable}
          />
          <AreaCreateEdit
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
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader />
          </Colxx>
        </>
      )}
    </>
  );
};
const mapDispatchToProps = { ...areaActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaList);
