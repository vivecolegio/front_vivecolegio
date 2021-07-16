import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import {
  Button,
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
import { Colxx } from '../../common/CustomBootstrap';
import CreateEditAuditInformation from '../../common/Data/CreateEditAuditInformation';
import Icons from '../../common/Data/Icon/Icons';

const MenuCreateEdit = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [modulesList, setModulesList] = useState(null);
  const [modalOpen, setModalIcon] = useState(false);

  const methods = useFormContext();

  useEffect(() => {
    getModuleList();
    if (props?.data?.id) {
      console.log(props?.data);
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
  };

  const auditInfo = {
    createdAt: props?.data?.id ? props?.data?.createdAt : null,
    updatedAt: props?.data?.id ? props?.data?.createdAt : null,
    createdByUser: props?.data?.id ? props?.data?.createdByUser : null,
    updatedByUser: props?.data?.id ? props?.data?.updatedByUser : null,
    version: props?.data?.id ? props?.data?.version : null,
  };

  const handleChange = (selected: any, name: any) => {
    methods.setValue(name, selected.value);
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
                <IntlMessages id="forms.icon" />
              </Label>
              <InputGroup>
                <Input
                  {...methods.register('icon', { required: true })}
                  name="icon"
                  defaultValue={data.icon}
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
                toggleModal={() => {
                  return setModalIcon(!modalOpen);
                }}
              />
            </div>
            <div className="form-group">
              <Label>
                <IntlMessages id="forms.sorting" />
              </Label>
              <Input
                onChange={(e) => {
                  return handleChangeNumber(e, 'sorting');
                }}
                name="sorting"
                defaultValue={data.sorting}
              />
            </div>
            <div className="form-group">
              <Table borderless>
                <thead>
                  <tr>                   
                    <th scope="col">
                      <IntlMessages id="forms.submenus" />
                      <hr className="m-0"/>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {modulesList ? (
                    modulesList.map((c: any) => {
                      return (
                        <>
                          <tr>                                                    
                            <th key={c.name}>
                            <i className="font-20 text-info iconsminds-network mr-2" />  
                              {c.label}
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

const mapDispatchToProps = { ...menuActions, ...moduleActions };

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuCreateEdit);
