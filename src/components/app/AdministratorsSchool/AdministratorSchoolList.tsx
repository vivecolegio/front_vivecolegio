import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { COLUMN_LIST } from '../../../constants/AdministratorSchool/administratorSchoolConstants';
import * as administratorSchoolActions from '../../../stores/actions/AdministratorSchoolActions';
import AddNewModal from '../../common/Data/AddNewModal';
import DataList from '../../common/Data/DataList';
import AdministratorCreateEdit from './AdministratorSchoolCreateEdit';

const AdministratorSchoolList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllAdministrator().then((listData: any) => {
      setDataTable(listData.map((c:any)=>{
        c.node.name = c.node.user ? c.node.user.name : ''; 
        c.node.lastName = c.node.user ? c.node.user.lastName : ''; 
        c.node.phone = c.node.user ? c.node.user.phone : ''; 
        c.node.email = c.node.user ? c.node.user.email : '';               
        return c;
      }));
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllAdministrator().then((listData: any) => {     
      setDataTable(listData.map((c:any)=>{
        c.node.name = c.node.user ? c.node.user.name : ''; 
        c.node.lastName = c.node.user ? c.node.user.lastName : ''; 
        c.node.phone = c.node.user ? c.node.user.phone : ''; 
        c.node.email = c.node.user ? c.node.user.email : '';               
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
      await props.saveNewAdministrator(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateAdministrator(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataAdministrator(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveAdministrator(active, id).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteAdministrator(id).then((formData: any) => {
      refreshDataTable();
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
            deleteData={deleteData}
            changeActiveData={changeActiveData}
          />
          <AddNewModal
            modalOpen={modalOpen}
            toggleModal={() => {
              setData(null);
              return setModalOpen(!modalOpen);
            }}
            onSubmit={onSubmit}
          >
            <AdministratorCreateEdit data={data} />
          </AddNewModal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapDispatchToProps = { ...administratorSchoolActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdministratorSchoolList);
