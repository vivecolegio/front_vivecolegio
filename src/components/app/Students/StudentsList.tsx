/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { COLUMN_LIST } from '../../../constants/Student/studentConstants';
import { createNotification } from '../../../helpers/Notification';
import * as studentActions from '../../../stores/actions/StudentActions';
import AddNewModal from '../../common/Data/AddNewModal';
import DataList from '../../common/Data/DataList';
import StudentCreateEdit from './StudentsCreateEdit';

const StudentList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllStudent().then((listData: any) => {
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
    props.getListAllStudent().then((listData: any) => {     
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
    console.log(dataForm)
    if (data === null) {
      await props.saveNewStudent(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      delete dataForm.newUser.id;
      delete dataForm.newUser.role;
      delete dataForm.newUser.gender;
      delete dataForm.newUser.documentType;
      await props.updateStudent(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataStudent(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveStudent(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteStudent(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item:any)=>{
      await props.deleteStudent(item.id, false).then(() => {},() =>{ createNotification('error', 'error', '');});
    });
    refreshDataTable(); 
    createNotification('success', 'success', '');
  };

  const changeActiveDataAll = async (items: any) => {
    items.map(async (item:any)=>{
      await props.changeActiveStudent(!item.active, item.id, false).then(() => {},() =>{ createNotification('error', 'error', '');});
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
          <StudentCreateEdit
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
const mapDispatchToProps = { ...studentActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
