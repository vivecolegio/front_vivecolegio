import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { COLUMN_LIST } from '../../../../constants/AcademicGrade/AcademicGradeConstants';
import { createNotification } from '../../../../helpers/Notification';
import * as gradeActions from '../../../../stores/actions/Academic/GradeActions';
import AddNewModal from '../../../common/Data/AddNewModal';
import DataList from '../../../common/Data/DataList';
import GradeCreateEdit from './GradeCreateEdit';

const GradeList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllGrade().then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.cycle_format = c.node.generalAcademicCycle ? c.node.generalAcademicCycle.name : '';
          c.node.speciality_format = c.node.specialty ? c.node.specialty.name : '';
          c.node.school_format = c.node.school ? c.node.school.name : '';
          c.node.education_level_format = c.node.educationLevel ? c.node.educationLevel.name : '';
          return c;
        }),
      );
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllGrade().then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.cycle_format = c.node.generalAcademicCycle ? c.node.generalAcademicCycle.name : '';
          c.node.speciality_format = c.node.specialty ? c.node.specialty.name : '';
          c.node.school_format = c.node.school ? c.node.school.name : '';
          c.node.education_level_format = c.node.educationLevel ? c.node.educationLevel.name : '';
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
      await props.saveNewGrade(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateGrade(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataGrade(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveGrade(active, id).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteGrade(id).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteGrade(item.id, false).then(
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
      await props.changeActiveGrade(!item.active, item.id, false).then(
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
          <AddNewModal
            modalOpen={modalOpen}
            toggleModal={() => {
              setData(null);
              return setModalOpen(!modalOpen);
            }}
            onSubmit={onSubmit}
          >
            <GradeCreateEdit data={data} />
          </AddNewModal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const mapDispatchToProps = { ...gradeActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeList);
