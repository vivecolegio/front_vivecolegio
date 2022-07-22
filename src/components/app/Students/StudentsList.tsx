/* eslint-disable no-await-in-loop */
import { Loader } from '../../common/Loader';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { COLUMN_LIST } from '../../../constants/Student/studentConstants';
import * as userActions from '../../../stores/actions/UserActions';
import { createNotification } from '../../../helpers/Notification';
import * as studentActions from '../../../stores/actions/StudentActions';
import { Colxx } from '../../common/CustomBootstrap';
import DataList from '../../common/Data/DataList';
import StudentCreateEdit from './StudentsCreateEdit';


const StudentList = (props: any) => {
  const [dataTable, setDataTable] = useState(null);
  const [columns, setColumns] = useState(COLUMN_LIST);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);

  const [data, setData] = useState(null);
  useEffect(() => {
    let { roleMenus } = props.loginReducer;
    let submenus: any = [];
    roleMenus.map((c: any) => {
      return submenus = submenus.concat(c.menuItemsLogin);
    });
    setCurrentMenu(submenus.find((c: any) => { return (c?.module?.url == 'reset_password_permit') }));

    props.getListAllStudent(props?.loginReducer?.campusId, props?.loginReducer?.schoolId).then((listData: any) => {
      setDataTable(listData.map((c: any) => {
        c.node.name = c.node.user ? c.node.user.name : '';
        c.node.lastName = c.node.user ? c.node.user.lastName : '';
        c.node.documentType_format = c?.node?.user ? c?.node?.user?.documentType?.name : '';
        c.node.documentNumber = c?.node?.user ? c?.node?.user?.documentNumber : '';
        c.node.gender_format = c?.node?.user ? c?.node?.user?.gender?.name : '';
        return c;
      }));
    });
  }, []);

  const getDataTable = async () => {
    props.getListAllStudent(props?.loginReducer?.campusId, props?.loginReducer?.schoolId).then((listData: any) => {
      setDataTable(listData.map((c: any) => {
        c.node.name = c.node.user ? c.node.user.name : '';
        c.node.lastName = c.node.user ? c.node.user.lastName : '';
        c.node.documentType_format = c?.node?.user ? c?.node?.user?.documentType?.name : '';
        c.node.documentNumber = c?.node?.user ? c?.node?.user?.documentNumber : '';
        c.node.gender_format = c?.node?.user ? c?.node?.user?.gender?.name : '';
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
      delete dataForm.newUser.password;
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
    items.map(async (item: any) => {
      await props.deleteStudent(item.id, false).then(() => { }, () => { createNotification('error', 'error', ''); });
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const changeActiveDataAll = async (items: any) => {
    items.map(async (item: any) => {
      await props.changeActiveStudent(!item.active, item.id, false).then(() => { }, () => { createNotification('error', 'error', ''); });
    });
    refreshDataTable();
    createNotification('success', 'success', '');
  };

  const resetPassword = async (item: any) => {
    await props.resetPasswordUser(item?.user?.id).then(() => {
      refreshDataTable();
    });
  };

  const additionalFunction = async (item: any, btn: any) => {
    switch (btn?.action) {
      case 'goToChildrenResetPass':
        resetPassword(item);
        break;
      default:
        break;
    }
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
            additionalFunction={additionalFunction}
            childrenButtons={[
              {
                id: 0,
                label: 'Resetear contraseña',
                color: 'warning',
                icon: 'iconsminds-unlock-2',
                action: 'goToChildrenResetPass',
                hide: currentMenu?.readAction ? false : true
              },
            ]}
            withChildren={true}
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
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader />
          </Colxx>
        </>
      )}
    </>
  );
};
const mapDispatchToProps = { ...studentActions, ...userActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
