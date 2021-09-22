import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
  Button,
  CustomInput,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as menuActions from '../../../stores/actions/MenuModelActions';
import * as roleActions from '../../../stores/actions/RoleActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';

const RoleCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [menuList, setMenuList] = useState(null);
  const [menuSelected, setMenuSelected] = useState(null);
  const [rolesMenus, setRolesMenus] = useState([]);

  const methods = useFormContext();

  useEffect(() => {
    getMenuList();
    if (props?.data?.id) {
      if (props?.data?.roleMenus !== undefined && props?.data?.roleMenus != null) {
        setRolesMenus(props?.data?.roleMenus);
      }
    } else {
      methods.reset();
    }
    setLoading(false);
  }, [props?.data]);

  const getMenuList = async () => {
    props.getListAllMenu().then((listData: any) => {
      console.log(listData);
      setMenuList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id, icon: c.node.icon };
        }),
      );
    });
  };

  const data = {
    name:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const handleCheckChange = (item: any, field: string) => {
    const newItem: any = {};
    newItem[field] = !item[field];
    updateRoleMenuRow(newItem, item.id);
  };

  const handleAddRoleMenu = (item: any) => {
    const dataNewRoleMenu = {
      menuId: item.key,
      roleId: props?.data?.id,
    };
    saveRoleMenuRow(dataNewRoleMenu);
  };

  const updateRoleMenuRow = async (dataRoleMenu: any, idRolMenu: any) => {
    await props.updateRoleMenu(dataRoleMenu, idRolMenu).then((id: any) => {
      if (id !== undefined) {
        getMenuList();
      }
    });
  };

  const saveRoleMenuRow = async (dataRoleMenu: any) => {
    await props.saveNewRoleMenu(dataRoleMenu).then((id: any) => {
      if (id !== undefined) {
        viewEditData(props?.data?.id);
      }
    });
  };

  const viewEditData = async (id: any) => {
    await props.dataRole(id).then((formData: any) => {
      setRolesMenus(formData?.data?.roleMenus);
    });
  };

  return (
    <>
      {loading ? (
        <>
          <Colxx sm={12} className="d-flex justify-content-center">
            <Loader type={loaderIcon} color={loaderColor} height={30} width={30} />
          </Colxx>
        </>
      ) : (
        <>
          <ModalBody>
            <div className="form-group col-md-6 p-0">
              <Label>
                <IntlMessages id="forms.name" />
              </Label>
              <Input
                {...methods.register('name', { required: true })}
                name="name"
                defaultValue={data.name}
              />
            </div>
            <div className="form-group col-md-6 p-0">
              <Label>
                <IntlMessages id="forms.menu" />
              </Label>
              <InputGroup>
                <div style={{ width: '85%' }}>
                  <Select
                    placeholder={<IntlMessages id="forms.select" />}
                    className="react-select"
                    classNamePrefix="react-select"
                    options={menuList}
                    name="menuId"
                    onChange={(e) => {
                      return setMenuSelected(e);
                    }}
                  />
                </div>
                <InputGroupAddon addonType="prepend">
                  <Button
                    onClick={() => {
                      return handleAddRoleMenu(menuSelected);
                    }}
                    color="primary"
                    size="xs">
                    <IntlMessages id="forms.add" />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="form-group col-md-12 p-0">
              <Table basic>
                <thead>
                  <tr>
                    <th scope="col">
                      <IntlMessages id="forms.menu" />
                    </th>
                    <th scope="col" className="text-center">
                      <i className="font-20 text-info simple-icon-eye mr-2" />
                    </th>
                    <th scope="col" className="text-center">
                      <i className="font-20 text-success simple-icon-plus mr-2" />
                    </th>
                    <th scope="col" className="text-center">
                      <i className="font-20 text-primary simple-icon-pencil mr-2" />
                    </th>
                    <th scope="col" className="text-center">
                      <i className="font-20 text-danger simple-icon-trash mr-2" />
                    </th>
                    <th scope="col" className="text-center">
                      <i className="font-20 text-success simple-icon-check mr-2" />
                    </th>
                    <th scope="col" className="text-center">
                      <i className="font-20 text-dark simple-icon-close mr-2" />
                    </th>
                    <th scope="col" className="text-center">
                      <i className="font-20 text-warning iconsminds-gear mr-2" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rolesMenus ? (
                    rolesMenus.map((c: any) => {
                      return (
                        <>
                          <tr>
                            <th key={c?.menu?.id}>
                              <i className={` font-20 text-info mr-2 ${c?.menu?.icon}`} />
                              {c?.menu?.name}
                            </th>
                            <th className="text-center" key={`check_read${c?.menu?.id}`}>
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_read${c?.menu?.id}`}
                                defaultChecked={c.readAction}
                                onChange={() => {
                                  return handleCheckChange(c, 'readAction');
                                }}
                                label=""
                              />                              
                            </th>
                            <th className="text-center" key={`check_create${c?.menu?.id}`}>
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_create${c?.menu?.id}`}
                                defaultChecked={c.createAction}
                                onChange={() => {
                                  return handleCheckChange(c, 'createAction');
                                }}
                                label=""
                              />
                            </th>
                            <th className="text-center" key={`check_update${c?.menu?.id}`}>
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_update${c?.menu?.id}`}
                                defaultChecked={c.updateAction}
                                onChange={() => {
                                  return handleCheckChange(c, 'updateAction');
                                }}
                                label=""
                              />
                            </th>
                            <th className="text-center" key={`check_delete${c?.menu?.id}`}>
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_delete${c?.menu?.id}`}
                                defaultChecked={c.deleteAction}
                                onChange={() => {
                                  return handleCheckChange(c, 'deleteAction');
                                }}
                                label=""
                              />
                            </th>
                            <th className="text-center" key={`check_activate${c?.menu?.id}`}>
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_activate${c?.menu?.id}`}
                                defaultChecked={c.activateAction}
                                onChange={() => {
                                  return handleCheckChange(c, 'activateAction');
                                }}
                                label=""
                              />
                            </th>
                            <th className="text-center" key={`check_inactive${c?.menu?.id}`}>
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_inactive${c?.menu?.id}`}
                                defaultChecked={c.inactiveAction}
                                onChange={() => {
                                  return handleCheckChange(c, 'inactiveAction');
                                }}
                                label=""
                              />
                            </th>
                            <th className="text-center" key={`check_fullAccess${c?.menu?.id}`}>
                              <CustomInput
                                className="itemCheck mb-0"
                                type="checkbox"
                                id={`check_fullAccess${c?.menu?.id}`}
                                defaultChecked={c.fullAccess}
                                onChange={() => {
                                  return handleCheckChange(c, 'fullAccess');
                                }}
                                label=""
                              />
                            </th>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr />
                  )}
                </tbody>
              </Table>
            </div>
          </ModalBody>
          {props?.data?.id ? (
            <ModalFooter className="p-3">
              <CreateEditAuditInformation loading={loading} auditInfo={auditInfo} />
            </ModalFooter>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

const mapDispatchToProps = { ...roleActions, ...menuActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleCreateEdit);
