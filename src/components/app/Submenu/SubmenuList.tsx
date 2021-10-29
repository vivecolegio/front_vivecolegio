import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { COLUMN_LIST } from '../../../constants/Menu/menuConstants';
import * as menuItemActions from '../../../stores/actions/MenuItemActions';
import * as loginActions from '../../../stores/actions/LoginActions';
import AddNewModal from '../../common/Data/AddNewModal';
import DataList from '../../common/Data/DataList';
import MenuItemCreateEdit from './SubmenuCreateEdit';

const MenuItemList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState(null);
  useEffect(() => {
    const { idMenu } = props.match.params;
    if(idMenu) {
      console.log('servicio de consulta submenus por id');
    } else {
      props.getListAllMenuItem().then((listData: any) => {
        setDataTable(listData);
      });
    }  
  }, []);

  const getDataTable = async () => {
    props.getListAllMenuItem().then((listData: any) => {
      setDataTable(listData);
    });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {   
    if (data === null) {
      await props.saveNewMenuItem(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
          me();
        }
      });
    } else {
      await props.updateMenuItem(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
          me();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataMenuItem(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveMenuItem(active, id).then((formData: any) => {
      refreshDataTable();
    });
  };

  const me = async () => {
    await props.me().then((dataResp: any) => {
      window.location.reload();
    });
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
            changeActiveData={changeActiveData}
          />
          <AddNewModal
            isLg={true}
            modalOpen={modalOpen}
            toggleModal={() => { 
              setData(null);      
              return setModalOpen(!modalOpen);
            }}
            onSubmit={onSubmit}
          >
            <MenuItemCreateEdit data={data} />
          </AddNewModal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapDispatchToProps = { ...menuItemActions, ...loginActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemList);
