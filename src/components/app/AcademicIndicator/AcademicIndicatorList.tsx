import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { COLUMN_LIST } from '../../../constants/AcademicIndicator/AcademicIndicatorConstants';
import * as academicIndicatorActions from '../../../stores/actions/AcademicIndicatorActions';
import AddNewModal from '../../common/Data/AddNewModal';
import DataList from '../../common/Data/DataList';
import AcademicIndicatorCreateEdit from './AcademicIndicatorCreateEdit';

const AcademicIndicatorList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllAcademicIndicator().then((listData: any) => {
      setDataTable(listData);
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllAcademicIndicator().then((listData: any) => {
      setDataTable(listData);
    });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    console.log(dataForm)
    if (data === null) {
      await props.saveNewAcademicIndicator(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateAcademicIndicator(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataAcademicIndicator(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveAcademicIndicator(active, id).then((formData: any) => {
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
            <AcademicIndicatorCreateEdit data={data} />
          </AddNewModal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapDispatchToProps = { ...academicIndicatorActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicIndicatorList);
