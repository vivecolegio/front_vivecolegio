import React from 'react';
import { Row } from 'reactstrap';
import ContextMenuContainer from './List/ContextMenuContainer';
import DataListView from './List/DataListView';
import ImageListView from './List/ImageListView';
import Pagination from './List/Pagination';
import ThumbListView from './List/ThumbListView';

function collect(props: any) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  columns,
  viewEditData,
  changeActiveData,
  deleteData,
  withChildren,
  goToChildren,
}: any) => {
  return (
    <Row>
      {items.map((item: any) => {
        if (displayMode === 'imagelist') {
          return (
            <ImageListView
              key={item.node.id}
              item={item.node}
              isSelect={selectedItems.find((c:any)=>{return (c.id === item.node.id)})}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
        if (displayMode === 'thumblist') {
          return (
            <ThumbListView
              key={item.node.id}
              item={item.node}
              isSelect={selectedItems.find((c:any)=>{return (c.id === item.node.id)})}
              collect={collect}
              onCheckItem={onCheckItem}
            />
          );
        }
        return (
          <DataListView
            key={item.node.id}
            item={item.node}
            isSelect={selectedItems.find((c:any)=>{return (c.id === item.node.id)})}
            onCheckItem={onCheckItem}
            collect={collect}
            columns={columns}
            viewEditData={viewEditData}
            changeActiveData={changeActiveData}
            deleteData={deleteData}
            withChildren={withChildren}
            goToChildren={goToChildren}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i: any) => {
          return onChangePage(i);
        }}
      />
      <ContextMenuContainer onContextMenuClick={onContextMenuClick} onContextMenu={onContextMenu} />
    </Row>
  );
};

export default React.memo(ListPageListing);
