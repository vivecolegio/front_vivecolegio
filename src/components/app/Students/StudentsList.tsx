import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { COLUMN_LIST } from '../../../constants/Student/studentConstants';
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
    await props.changeActiveStudent(active, id).then((formData: any) => {
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
            <StudentCreateEdit data={data} />
          </AddNewModal>
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
