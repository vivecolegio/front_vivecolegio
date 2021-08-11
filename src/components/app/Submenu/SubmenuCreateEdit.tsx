import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Button, Input, InputGroup, InputGroupAddon, Label, ModalBody, ModalFooter } from 'reactstrap';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as menuItemActions from '../../../stores/actions/MenuItemActions';
import * as menuActions from '../../../stores/actions/MenuModelActions';
import * as moduleActions from '../../../stores/actions/ModuleActions';
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import Icons from '../../common/Data/Icon/Icons';

const MenuItemCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [modulesList, setModulesList] = useState(null);
  const [menuList, setMenuList] = useState(null);
  const [modalOpen, setModalIcon] = useState(false);
  const [icon, setIcon] = useState();

  const methods = useFormContext();

  useEffect(() => {
    getModuleList();
    getMenuList();
    if (props?.data?.id) {     
      if (props?.data?.module !== undefined && props?.data?.module != null) {
        setModule({
          key: props?.data?.module?.id,
          label: props?.data?.module?.name,
          value: props?.data?.module?.id,
        });
      }
      if (props?.data?.menu !== undefined && props?.data?.menu != null) {
        setMenu({
          key: props?.data?.menu?.id,
          label: props?.data?.menu?.name,
          value: props?.data?.menu?.id,
        });
      }
    } else {
      methods.reset();
    }
    setLoading(false);
  }, [props?.data]);

  const getModuleList = async () => {
    props.getListAllModule().then((listData: any) => {
      setModulesList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const getMenuList = async () => {
    props.getListAllMenu().then((listData: any) => {
      setMenuList(
        listData.map((c: any) => {
          return { label: c.node.name, value: c.node.id, key: c.node.id };
        }),
      );
    });
  };

  const data = {
    name:
      props?.data?.id || props?.data?.name === methods.getValues('name')
        ? props?.data?.name
        : methods.getValues('name'),
    icon:
      props?.data?.id || props?.data?.icon === methods.getValues('icon')
        ? props?.data?.icon
        : methods.getValues('icon'),
    sorting:
      props?.data?.id || props?.data?.sorting === methods.getValues('sorting')
        ? props?.data?.sorting
        : methods.getValues('sorting'),
    module:
      props?.data?.id || props?.data?.module === methods.getValues('module')
        ? { value: props?.data?.module?.id, label: props?.data?.module?.name }
        : methods.getValues('module'),
    menu:
      props?.data?.id || props?.data?.menu === methods.getValues('menu')
        ? { value: props?.data?.menu?.id, label: props?.data?.menu?.name }
        : methods.getValues('menu'),
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const [module, setModule] = useState(null);

  const [menu, setMenu] = useState(null);

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
                <IntlMessages id="forms.sorting" />
              </Label>
              <Input
                type="number"
                onChange={(e) => {
                  return handleChangeNumber(e, 'sorting');
                }}
                name="sorting"
                defaultValue={data.sorting}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.module" />
              </Label>
              <Select
                placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('moduleId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={modulesList}
                value={module}
                onChange={(selectedOption) => {
                  methods.setValue('moduleId', selectedOption?.key);
                  setModule(selectedOption);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.menuParent" />
              </Label>
              <Select
                 placeholder={<IntlMessages id="forms.select" />}    
                {...methods.register('menuId', { required: true })}
                className="react-select"
                classNamePrefix="react-select"
                options={menuList}
                value={menu}
                onChange={(selectedOption) => {
                  methods.setValue('menuId', selectedOption?.key);
                  setMenu(selectedOption);
                }}
              />
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

const mapDispatchToProps = { ...menuItemActions, ...moduleActions, ...menuActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemCreateEdit);
