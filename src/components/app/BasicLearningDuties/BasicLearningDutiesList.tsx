import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { COLUMN_LIST } from '../../../constants/BasicLearningDuties/BasicLearningDutiesConstants';
import { createNotification } from '../../../helpers/Notification';
import * as generalBasicLearningRightActions from '../../../stores/actions/BasicLearningDutiesActions';
import DataList from '../../common/Data/DataList';
import GeneralBasicLearningRightCreateEdit from './BasicLearningDutiesCreateEdit';

const GeneralBasicLearningRightList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);

  let navigate = useNavigate();

  let [params] = useSearchParams();
  const asignatureId = params.get('asignatureId');
  const asignatureName = params.get('asignatureName');
  const gradeId = params.get('gradeId');
  const gradeName = params.get('gradeName');

  const [data, setData] = useState(null);
  useEffect(() => {
    props.getListAllGeneralBasicLearningRight(asignatureId, gradeId).then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.grade_format = c.node.generalAcademicGrade ? c.node.generalAcademicGrade.name : '';
          c.node.asignature_format = c.node.generalAcademicAsignature
            ? c.node.generalAcademicAsignature.name
            : '';
          return c;
        }),
      );
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllGeneralBasicLearningRight(asignatureId, gradeId).then((listData: any) => {
      setDataTable(
        listData.map((c: any) => {
          c.node.grade_format = c.node.generalAcademicGrade ? c.node.generalAcademicGrade.name : '';
          c.node.asignature_format = c.node.generalAcademicAsignature
            ? c.node.generalAcademicAsignature.name
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
    console.log(dataForm);
    if (data === null) {
      await props.saveNewGeneralBasicLearningRight(dataForm).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          refreshDataTable();
        }
      });
    } else {
      await props.updateGeneralBasicLearningRight(dataForm, data.id).then((id: any) => {
        if (id !== undefined) {
          setModalOpen(false);
          setData(null);
          refreshDataTable();
        }
      });
    }
  };

  const viewEditData = async (id: any) => {
    await props.dataGeneralBasicLearningRight(id).then((formData: any) => {
      setData(formData.data);
      setModalOpen(true);
    });
  };

  const changeActiveData = async (active: any, id: any) => {
    await props.changeActiveGeneralBasicLearningRight(active, id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteData = async (id: any) => {
    await props.deleteGeneralBasicLearningRight(id, true).then((formData: any) => {
      refreshDataTable();
    });
  };

  const deleteAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.deleteGeneralBasicLearningRight(item.id, false).then(
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
      await props.changeActiveGeneralBasicLearningRight(!item.active, item.id, false).then(
        () => {},
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
            header={
              <>
                <div className="mt-4">
                  <div className="d-flex flex-row">
                    <span className="mb-0 text-muted mr-4 border-b-info">
                      <span>Asignatura:</span>{' '}
                      <h2 className="text-info font-bold">{asignatureName}</h2>
                    </span>
                    <span className="mb-0 text-muted border-b-green">
                      Grado: <h2 className="text-green font-bold">{gradeName}</h2>
                    </span>
                  </div>
                  <p
                    className="text-muted mt-2 d-flex align-items-center cursor-pointer"
                    onClick={() => {
                      return goTo('/academicAsignatureCourse');
                    }}
                  >
                    <i className="simple-icon-arrow-left-circle mr-2"></i>
                    Regresar a carga académica
                  </p>
                </div>
              </>
            }
          />
          <GeneralBasicLearningRightCreateEdit
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
const mapDispatchToProps = { ...generalBasicLearningRightActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralBasicLearningRightList);
