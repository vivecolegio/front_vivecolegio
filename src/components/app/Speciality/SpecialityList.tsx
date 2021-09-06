import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { COLUMN_LIST } from '../../../constants/Speciality/SpecialityConstants';
import * as specialityActions from '../../../stores/actions/SpecialityActions';
import AddNewModal from '../../common/Data/AddNewModal';
import DataList from '../../common/Data/DataList';
import SpecialityCreateEdit from './SpecialityCreateEdit';

const SpecialityList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllSpeciality().then((listData: any) => {
      setDataTable(listData);
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllSpeciality().then((listData: any) => {
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
      await props.saveNewSpeciality(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateSpeciality(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataSpeciality(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveSpeciality(active, id).then((formData: any) => {
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
            <SpecialityCreateEdit data={data} />
          </AddNewModal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapDispatchToProps = { ...specialityActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialityList);
