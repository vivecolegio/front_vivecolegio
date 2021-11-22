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
import * as moduleActions from '../../../stores/actions/ModuleActions';
import * as roleActions from '../../../stores/actions/RoleActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import Icons from '../../common/Data/Icon/Icons';

const MenuCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState(null);
  const [modalOpen, setModalIcon] = useState(false);
  const [icon, setIcon] = useState();
  const [rolesList, setRolesList] = useState([]);
  const [role, setRole] = useState([]);

  const methods = useFormContext();

  useEffect(() => {
    getRolesList();
    if (props?.data?.id) {
      if (props?.data?.icon !== undefined && props?.data?.icon != null) {
        setIcon(props?.data?.icon);
      }
      if (props?.data?.menuItems !== undefined && props?.data?.menuItems != null) {
        setMenuItems(props?.data?.menuItems);
      }
      if (props?.data?.roles !== undefined && props?.data?.roles != null) {
        setRole(props?.data?.roles.map((c: any) => {
          return { label: c.name, value: c.id, key: c.id };
        }));
      }  
    }
    setLoading(false);
  }, [props?.data]);

  const getRolesList = async () => {
    props.getListAllRole().then((listData: any) => {
      setRolesList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const data: any = {
    name:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),
    icon:
      props?.data?.id || props?.data?.icon === methods.getValues('icon')
        ? props?.data?.icon
        : methods.getValues('icon'),
    module:
      props?.data?.id || props?.data?.module === methods.getValues('module')
        ? { value: props?.data?.module?.id, label: props?.data?.module?.name }
        : methods.getValues('module'),
    order:
        props?.data?.id || props?.data?.order === methods.getValues('order')
          ? props?.data?.order
          : methods.getValues('order'),
    readAction:
      props?.data?.id || props?.data?.readAction === methods.getValues('readAction')
        ? props?.data?.readAction
        : methods.getValues('readAction'),
    createAction:
      props?.data?.id || props?.data?.createAction === methods.getValues('createAction')
        ? props?.data?.createAction
        : methods.getValues('createAction'),
    deleteAction:
      props?.data?.id || props?.data?.deleteAction === methods.getValues('deleteAction')
        ? props?.data?.deleteAction
        : methods.getValues('deleteAction'),
    updateAction:
      props?.data?.id || props?.data?.updateAction === methods.getValues('updateAction')
        ? props?.data?.updateAction
        : methods.getValues('updateAction'),
    fullAccess:
      props?.data?.id || props?.data?.fullAccess === methods.getValues('fullAccess')
        ? props?.data?.fullAccess
        : methods.getValues('fullAccess'),
    activateAction:
      props?.data?.id || props?.data?.activateAction === methods.getValues('activateAction')
        ? props?.data?.activateAction
        : methods.getValues('activateAction'),
    inactiveAction:
      props?.data?.id || props?.data?.inactiveAction === methods.getValues('inactiveAction')
        ? props?.data?.inactiveAction
        : methods.getValues('inactiveAction'),
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const handleChangeNumber = (event: any, name: any) => {
    methods.setValue(name, parseFloat(event.target.value));
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
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.name" />
              </Label>
              <Input
                {...methods.register('name', { required: true })}
                name="name"
                defaultValue={data.name}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.sorting" />
              </Label>
              <Input
                onChange={(e) => {
                  return handleChangeNumber(e, 'order');
                }}
                name="order"
                defaultValue={data.order}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.icon" />
              </Label>
              <InputGroup>
                <Input
                  {...methods.register('icon', { required: true })}
                  name="icon"
                  defaultValue={data.icon}
                  value={icon}
                />
                <InputGroupAddon addonType="prepend">
                  <Button
                    onClick={() => {
                      return setModalIcon(true);
                    }}
                    color="primary"
                    size="xs"
                  >
                    <IntlMessages id="forms.seeIcons" />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <Icons
                modalOpen={modalOpen}
                icon={icon}
                toggleModal={() => {
                  return setModalIcon(!modalOpen);
                }}
                setIcon={(i: any) => {
                  methods.setValue('icon', i);
                  setIcon(i);
                  setModalIcon(!modalOpen);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="menu.roles" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />} 
                isMulti   
                {...methods.register('rolesId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"              
                options={rolesList}
                value={role}
                onChange={(selectedOption: any) => {
                  methods.setValue('rolesId', selectedOption.map((c:any)=>{return c.key}));
                  setRole(selectedOption);
                }}
              />
            </div>
            <div className="form-group col-md-12 p-0">
              <Table basic>
                <thead>
                <tr>
                    <th scope="col" className="text-center">
                      <div className="d-flex align-items-center flex-column">
                        <i className="font-20 text-info simple-icon-eye" />
                        <small className="mt-1">Ver</small>
                      </div>
                    </th>
                    <th scope="col" className="text-center">
                      <div className="d-flex align-items-center flex-column">
                        <i className="font-20 text-success simple-icon-plus" />
                        <small className="mt-1">Crear</small>
                      </div>
                    </th>
                    <th scope="col" className="text-center">
                      <div className="d-flex align-items-center flex-column">
                        <i className="font-20 text-primary simple-icon-pencil" />
                        <small className="mt-1">Editar</small>
                      </div>
                    </th>
                    <th scope="col" className="text-center">
                      <div className="d-flex align-items-center flex-column">
                        <i className="font-20 text-danger simple-icon-trash" />
                        <small className="mt-1">Eliminar</small>
                      </div>
                    </th>
                    <th scope="col" className="text-center">
                      <div className="d-flex align-items-center flex-column">
                        <i className="font-20 text-success simple-icon-check" />
                        <small className="mt-1">Activar</small>
                      </div>
                    </th>
                    <th scope="col" className="text-center">
                      <div className="d-flex align-items-center flex-column">
                        <i className="font-20 text-dark simple-icon-close" />
                        <small className="mt-1">Inactivar</small>
                      </div>
                    </th>
                    <th scope="col" className="text-center">
                      <div className="d-flex align-items-center flex-column">
                        <i className="font-20 text-warning iconsminds-gear" />
                        <small className="mt-1">Full Acceso</small>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    <tr>
                      <th className="text-center" key={`check_read`}>
                        <CustomInput
                          className="itemCheck mb-0"
                          type="checkbox"
                          id={`check_read`}
                          defaultChecked={data.readAction}
                          onChange={() => {
                            methods.setValue('readAction', !data.readAction);
                          }}
                          label=""
                        />
                      </th>
                      <th className="text-center" key={`check_create`}>
                        <CustomInput
                          className="itemCheck mb-0"
                          type="checkbox"
                          id={`check_create`}
                          defaultChecked={data.createAction}
                          onChange={() => {
                            methods.setValue('createAction', !data.createAction);
                          }}
                          label=""
                        />
                      </th>
                      <th className="text-center" key={`check_update`}>
                        <CustomInput
                          className="itemCheck mb-0"
                          type="checkbox"
                          id={`check_update`}
                          defaultChecked={data.updateAction}
                          onChange={() => {
                            methods.setValue('updateAction', !data.updateAction);
                          }}
                          label=""
                        />
                      </th>
                      <th className="text-center" key={`check_delete`}>
                        <CustomInput
                          className="itemCheck mb-0"
                          type="checkbox"
                          id={`check_delete`}
                          defaultChecked={data.deleteAction}
                          onChange={() => {
                            methods.setValue('deleteAction', !data.deleteAction);
                          }}
                          label=""
                        />
                      </th>
                      <th className="text-center" key={`check_activate`}>
                        <CustomInput
                          className="itemCheck mb-0"
                          type="checkbox"
                          id={`check_activate`}
                          defaultChecked={data.activateAction}
                          onChange={() => {
                            methods.setValue('activateAction', !data.activateAction);
                          }}
                          label=""
                        />
                      </th>
                      <th className="text-center" key={`check_inactive`}>
                        <CustomInput
                          className="itemCheck mb-0"
                          type="checkbox"
                          id={`check_inactive`}
                          defaultChecked={data.inactiveAction}
                          onChange={() => {
                            methods.setValue('inactiveAction', !data.inactiveAction);
                          }}
                          label=""
                        />
                      </th>
                      <th className="text-center" key={`check_fullAccess}`}>
                        <CustomInput
                          className="itemCheck mb-0"
                          type="checkbox"
                          id={`check_fullAccess`}
                          defaultChecked={data.fullAccess}
                          onChange={() => {
                            methods.setValue('fullAccess', !data.fullAccess);
                          }}
                          label=""
                        />
                      </th>
                    </tr>
                  </>
                </tbody>
              </Table>
            </div>
            <div className="form-group">
              <Table borderless>
                <thead>
                  <tr>
                    <th scope="col">
                      <IntlMessages id="forms.submenus" />
                      <hr className="m-0" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems ? (
                    menuItems.map((c: any) => {
                      return (
                        <>
                          <tr>
                            <th key={c.name}>
                              <i className={`font-20 text-info mr-2 ${c.icon}`} />
                              {c.name}
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

const mapDispatchToProps = { ...menuActions, ...moduleActions, ...roleActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuCreateEdit);
