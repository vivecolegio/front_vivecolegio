import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, ButtonDropdown, Card, Collapse, CustomInput, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';

import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../CustomBootstrap';
import BreadcrumbContainer from '../navs/Breadcrumb';
import DataListIcon from './Icon/DataListIcon';
import ImageListIcon from './Icon/ImageListIcon';
import ThumbListIcon from './Icon/ThumbListIcon';

const ListPageHeading = ({
  items,
  intl,
  displayMode,
  changeDisplayMode,
  handleChangeSelectAll,
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  selectedOrderOption,
  match,
  startIndex,
  endIndex,
  selectedItemsLength,
  itemsLength,
  onSearchKey,
  orderOptions,
  pageSizes,
  toggleModal,
  heading,
  columns,
  deleteAll,
  changeActiveDataAll,
  currentMenu,
  withChildren,
}: any) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const { messages } = intl;

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id={heading} />
          </h1>

          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              disabled={!currentMenu.createAction}
              className="top-right-button"
              onClick={() => {
                return toggleModal();
              }}
            >
              <IntlMessages id="pages.add-new" />
            </Button>
            {'  '}
            <ButtonDropdown
              isOpen={dropdownSplitOpen}              
              toggle={() => {
                return setDropdownSplitOpen(!dropdownSplitOpen);
              }}
            >
              <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItemsLength >= itemsLength}
                  onChange={() => {
                    return handleChangeSelectAll(true);
                  }}
                  label={
                    <span
                      className={`custom-control-label ${
                        selectedItemsLength > 0 && selectedItemsLength < itemsLength
                          ? 'indeterminate'
                          : ''
                      }`}
                    />
                  }
                />
              </div>
              <DropdownToggle caret color="primary" className="dropdown-toggle-split btn-lg" />
              <DropdownMenu right>
                <DropdownItem 
                disabled={!currentMenu.deleteAction}
                onClick={() => {
                    return deleteAll();
                  }}>
                  <IntlMessages id="pages.delete" />
                </DropdownItem>               
                <DropdownItem 
                disabled={!currentMenu.activateAction || !currentMenu.inactiveAction}
                onClick={() => {
                    return changeActiveDataAll();
                  }}>
                  <IntlMessages id="pages.activateInactivate" />
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <BreadcrumbContainer match={match} heading={null} />
        </div>

        <div className="mb-2">
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => {
              return setDisplayOptionsIsOpen(!displayOptionsIsOpen);
            }}
          >
            <IntlMessages id="pages.display-options" />{' '}
            <i className="simple-icon-arrow-down align-middle" />
          </Button>
          <Collapse isOpen={displayOptionsIsOpen} className="d-md-block" id="displayOptions">
            <span className="mr-3 d-inline-block float-md-left">
              <a
                className={`mr-2 view-icon ${displayMode === 'list' ? 'active' : ''}`}
                onClick={() => {
                  return changeDisplayMode('list');
                }}
              >
                <DataListIcon />
              </a>
              <a
                className={`mr-2 view-icon ${displayMode === 'thumblist' ? 'active' : ''}`}
                onClick={() => {
                  return changeDisplayMode('thumblist');
                }}
              >
                <ThumbListIcon />
              </a>
              <a                              
                className={`mr-2 view-icon ${displayMode === 'imagelist' ? 'active' : ''}`}
                onClick={() => {
                  return changeDisplayMode('imagelist');
                }}
              >
                <ImageListIcon />
              </a>
            </span>

            <div className="d-block d-md-inline-block pt-1">             
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder={messages['menu.search']}
                  onKeyPress={(e) => {
                    return onSearchKey(e);
                  }}
                />
              </div>
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} de ${totalItemCount} `}</span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {selectedPageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size: any, index: any) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => {
                          return changePageSize(size);
                        }}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Collapse>
        </div>
        {displayMode === 'list' ?
        <>
        <Separator className="pt-2 mb-2" />
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="p-3 card-body align-self-center d-flex flex-colum flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              {columns?.map((item: any) => {
                return (
                  <p key={item.label} 
                  className="w-10 mb-1 text-muted text-small w-sm-100"
                  >
                    <IntlMessages id={item.label}/>
                  </p>
                );
              })}
              <p className={withChildren === true ? "w-35 mb-1 text-muted text-small w-sm-100 text-center" : "w-25 mb-1 text-muted text-small w-sm-100 text-center"}><IntlMessages id="pages.actions"/></p>
            </div>
          </div>
        </Card>
        <Separator className="pt-2 mb-3" />
        </>
        : ''}
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeading);
