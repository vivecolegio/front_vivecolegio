import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { COLUMN_LIST } from '../../../constants/GradeAssignment/gradeAssignmentConstants';
import { createNotification } from '../../../helpers/Notification';
import * as academicIndicatorActions from '../../../stores/actions/GradeAssignmentActions';
import DataList from '../../common/Data/DataList';
import HeaderInfoAcademic from '../../common/Data/HeaderInfoAcademic';
import GradeAssignmentCreateEdit from './GradeAssignmentCreateEdit';

const GradeAssignmentList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let [params] = useSearchParams();
  const academicGradeId = params.get('academicGradeId');
  const gradeName = params.get('gradeName');

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllGradeAssignment(props?.loginReducer?.schoolId, academicGradeId).then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.grade_format = c.node.academicGrade ? c.node.academicGrade.name : '';
          c.node.asignature_format = c.node.academicAsignature
            ? c.node.academicAsignature.name
            : '';
          return c;
        }),
      );
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllGradeAssignment(props?.loginReducer?.schoolId, academicGradeId).then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.grade_format = c.node.academicGrade ? c.node.academicGrade.name : '';
          c.node.asignature_format = c.node.academicAsignature
            ? c.node.academicAsignature.name
            : '';
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
    //console.log(dataForm);
    if (data === null) {
      await props.saveNewGradeAssignment(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateGradeAssignment(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataGradeAssignment(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveGradeAssignment(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteGradeAssignment(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteUser(item.id, false).then(
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
      await props.changeActiveUser(!item.active, item.id, false).then(
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
          <HeaderInfoAcademic generic={{ title: 'Grado', value: gradeName }} goTitle="Regresar a grados" />
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
          <GradeAssignmentCreateEdit
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
const mapDispatchToProps = { ...academicIndicatorActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeAssignmentList);
