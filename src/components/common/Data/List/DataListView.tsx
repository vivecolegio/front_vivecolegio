import classnames from 'classnames';
import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Button, Card, CustomInput } from 'reactstrap';
import { Colxx } from '../../CustomBootstrap';

const DataListView = ({
  item,
  isSelect,
  collect,
  onCheckItem,
  columns,
  viewEditData,
  changeActiveData,
  withChildren,
  childrenButtons,
  deleteData,
  additionalFunction,
  currentMenu,
}: any) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="context_menu" collect={collect}>
        <Card
          onClick={(event) => {
            return onCheckItem(event, item);
          }}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="p-3 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              {columns.map((column: any) => {
                return (
                  <p key={column.column} className="mb-1 text-muted text-small w-10 w-sm-100">
                    {item[`${column.column}`]}
                  </p>
                );
              })}
              <p className={withChildren === true ? "w-35 mb-0 text-center text-muted text-small w-sm-100" : "w-25 mb-0 text-center text-muted text-small w-sm-100"}>
                <Button
                  color="blue"
                  // disabled={!currentMenu.updateAction}
                  size="xs"
                  onClick={() => {
                    return viewEditData(item.id);
                  }}
                >
                  <i className="simple-icon-eye font-1rem mr-2" />
                  Detalle
                </Button>{' '}
                <Button
                  color="orange"
                  disabled={!currentMenu.deleteAction}
                  size="xs"
                  onClick={() => {
                    return deleteData(item.id);
                  }}
                >
                  <i className="simple-icon-trash font-1rem mr-2" />
                  Eliminar
                </Button>{' '}
                <Button
                  color={item.active ? 'danger' : 'green'}
                  disabled={item.active ? !currentMenu.inactiveAction : !currentMenu.activateAction}
                  size="xs"
                  onClick={() => {
                    return changeActiveData(!item.active, item.id);
                  }}
                >
                  <i className={item.active ? 'simple-icon-close font-1rem mr-2' : 'simple-icon-check font-1rem mr-2'} />
                  {item.active ? 'Inactivar' : 'Activar'}
                </Button>{' '}                
                {withChildren === true ? (
                  childrenButtons.map((button:any) => {
                    return <Button
                      key={button.id}
                      color={button.color}
                      size="xs"
                      onClick={() => {
                         return additionalFunction(item.id, button.action);
                      }}>
                      <i className={button.icon + ' font-1rem mr-2'} />
                      {button.label}
                    </Button>
                  })
                ) : (
                  ''
                )}
              </p>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${item.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(DataListView); 


