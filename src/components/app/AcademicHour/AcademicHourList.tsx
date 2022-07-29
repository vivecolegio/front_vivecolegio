import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { COLUMN_LIST } from '../../../constants/AcademicHour/academicHourConstants';
import { createNotification } from '../../../helpers/Notification';
import * as academicHourActions from '../../../stores/actions/AcademicHourActions';
import { Colxx } from '../../common/CustomBootstrap';
import DataList from '../../common/Data/DataList';
import { Loader } from '../../common/Loader';
import AcademicHourCreateEdit from './AcademicHourCreateEdit';

const AcademicHourList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const academicDayId = params.get('academicDayId');
  const academicDayName = params.get('academicDayName');

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllAcademicHour(props?.loginReducer?.campusId, academicDayId).then((listData: any) => {
      setDataTable(listData);
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllAcademicHour(props?.loginReducer?.campusId, academicDayId).then((listData: any) => {
      setDataTable(listData);
    });
  };

  const refreshDataTable = async () => {
    setDataTable(null);
    await getDataTable();
  };

  const onSubmit = async (dataForm: any) => {
    if (data === null) {
      await props.saveNewAcademicHour(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateAcademicHour(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataAcademicHour(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveAcademicHour(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteAcademicHour(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteAcademicHour(item.id, false).then(
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
      await props.changeActiveAcademicHour(!item.active, item.id, false).then(
        () => { },
        () => {
          createNotification('error', 'error', '');
        },
      );
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const goTo = async (url: string) => {
    navigate(url);
  };

  return (
    <>
      {' '}
      {dataTable !== null ? (
        <>
          <>
            <div className="mt-0">
              <div className="d-flex flex-row">
                <span className="mb-0 text-muted border-b-warning">
                  Jornada: <h2 className="text-warning font-bold">{academicDayName}</h2>
                </span>
              </div>
              <p className="text-muted mt-2 d-flex align-items-center cursor-pointer" onClick={() => { return goTo('/academicDay') }}>
                <i className="simple-icon-arrow-left-circle mr-2"></i>
                Regresar a Jornadas
              </p>
            </div>
          </>
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
            refreshDataTable={refreshDataTable}
          />
          <AcademicHourCreateEdit
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
const mapDispatchToProps = { ...academicHourActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcademicHourList);
