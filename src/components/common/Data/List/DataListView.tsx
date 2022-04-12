import classnames from 'classnames';
import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Button, Card, Input } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
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
  filterChildren,
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
              {columns.filter((c:any)=>{return (c.label)}).map((column: any) => {
                return (
                  <p key={column.column} style={{ 'width':column.width }} className="mb-1 text-muted text-small">
                    {item[`${column.column}`]}
                  </p>
                );
              })}
              <p className={"mb-0 flex-gap text-muted text-small"} style={{ 'width':columns[columns.length - 1].width }}>
                { currentMenu.updateAction ? 
                <Button
                  color="blue"
                  size="xs"
                  onClick={() => {
                    return viewEditData(item.id);
                  }}
                >
                  <i className="simple-icon-eye font-1rem mr-2" />
                  <IntlMessages id="pages.detail" />
                </Button> : ''}
                {' '}
                { currentMenu.deleteAction ? 
                <Button
                  color="orange"
                  size="xs"
                  onClick={() => {
                    return deleteData(item.id);
                  }}
                >
                  <i className="simple-icon-trash font-1rem mr-2" />
                  <IntlMessages id="pages.delete" />
                </Button> : '' }{' '}
                {currentMenu.inactiveAction ? 
                <Button
                  color={item.active ? 'danger' : 'green'}
                  size="xs"
                  onClick={() => {
                    return changeActiveData(!item.active, item.id);
                  }}
                >
                  <i className={item.active ? 'simple-icon-close font-1rem mr-2' : 'simple-icon-check font-1rem mr-2'} />
                  {item.active ? <IntlMessages id="pages.inactivate" /> : <IntlMessages id="pages.activate" />}
                </Button> : '' }{' '}          
                {withChildren === true ? (
                  (filterChildren ? childrenButtons.filter((c:any)=>{return (c.action === item[filterChildren])}) : childrenButtons).map((button:any) => {
                    return<> 
                    <Button
                      key={button.id}
                      color={button.color}
                      size="xs"
                      onClick={() => {
                         return additionalFunction(item, button.action);
                      }}>
                      <i className={button.icon + ' font-1rem mr-2'} />
                      {button.label}
                    </Button> {' '}</>
                  })
                ) : (
                  ''
                )}
              </p>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <Input
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


