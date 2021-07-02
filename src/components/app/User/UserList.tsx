// import React, { useEffect, useState } from 'react';
// import Loader from 'react-loader-spinner';
// import { connect } from 'react-redux';
// import { Card, Row } from 'reactstrap';

// import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
// import * as userActions from '../../../stores/actions/UserActions';
// import { Colxx } from '../../common/CustomBootstrap';
// import DataListView from '../../common/list/DataListView';
// import ListHeading from '../../common/list/ListHeading';
// import ListPagination from '../../common/list/ListPagination';

// const UserList = (props: any) => {
//   useEffect(() => {
//     // falta validar lo del token para redireccionar
//     dataListRender();
//   }, []);

//   const [userListState, setUserListState] = useState({
//     displayMode: 'list',
//     selectedPageSize: 10,
//     orderOptions: [
//       { column: 'name', label: 'Name' },
//       { column: 'lastName', label: 'Last Name' },
//       { column: 'username', label: 'Username' },
//       { column: 'email', label: 'Email' },
//       { column: 'gender', label: 'Gender' },
//       { column: 'role.name', label: 'Role' },
//     ],
//     sortOptions: [{ label: 'Asc' }, { label: 'Desc' }],
//     pageSizes: [10, 20, 30, 50, 100],
//     selectedOrderOption: {},
//     selectedSortOption: { label: 'Asc' },
//     currentPage: 1,
//     totalItemCount: 0,
//     totalPage: 1,
//     search: '',
//     selectedItems: [],
//     lastChecked: null,
//     isLoading: true,
//     items: [],
//     itemsWithoutSearch: [],
//   });

//   const { match } = props;

//   const startIndex =
//     (userListState.currentPage - 1) * userListState.selectedPageSize;

//   const endIndex = userListState.currentPage * userListState.selectedPageSize;

//   const toggleNew = () => {
//     props.history.push('/administration/users/new');
//   };

//   function compareValues(column: any, order: any) {
//     const key = column.column;
//     return function innerSort(a: any, b: any) {
//       if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
//         return 0;
//       }
//       const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
//       const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
//       let comparison = 0;
//       if (varA > varB) {
//         comparison = 1;
//       } else if (varA < varB) {
//         comparison = -1;
//       }
//       return order === 'Desc' ? comparison * -1 : comparison;
//     };
//   }

//   const changeOrderBy = (column: any) => {
//     const selectedOrderOption = userListState.orderOptions.find(
//       (x) => {return x.column === column},
//     );
//     setUserListState({
//       ...userListState,
//       selectedOrderOption,
//     });
//     let listData = userListState.items;
//     listData = listData.sort(
//       compareValues(selectedOrderOption, selectedOrderOption.label),
//     );
//   };

//   const changeSortBy = (sort: any) => {
//     const selectedSortOption = userListState.sortOptions.find(
//       (x) => {return x.label === sort},
//     );
//     setUserListState({
//       ...userListState,
//       selectedSortOption,
//     });
//     if (userListState.selectedOrderOption != null) {
//       let listData = userListState.items;
//       listData = listData.sort(
//         compareValues(
//           userListState.selectedOrderOption,
//           selectedSortOption.label,
//         ),
//       );
//     }
//   };

//   const changePageSize = (size: any) => {
//     setUserListState({
//       ...userListState,
//       selectedPageSize: size,
//       currentPage: 1,
//     });
//   };

//   const changeDisplayMode = (mode: any) => {
//     setUserListState({
//       ...userListState,
//       displayMode: mode,
//     });
//     return false;
//   };

//   const onChangePage = (page: any) => {
//     setUserListState({
//       ...userListState,
//       currentPage: page,
//     });
//     dataListRender();
//   };

//   const onSearchKey = (e: any) => {
//     if (e.key === 'Enter') {
//       const search = e.target.value.toLowerCase();
//       setUserListState({
//         ...userListState,
//         search,
//       });
//       const list =
//         userListState.itemsWithoutSearch.length > 0
//           ? userListState.itemsWithoutSearch
//           : userListState.items;
//       const list2 = list.filter((item) => {
//         let searched = false;
//         userListState.orderOptions.map((order: any) => {
//           if (item[`${order.column}`]?.toLowerCase().includes(search))
//             searched = true;
//         });
//         if (searched) return search;
//       });
//       setUserListState({
//         ...userListState,
//         items: list2,
//         itemsWithoutSearch: list,
//       });
//     }
//   };

//   const onViewItem = (e: any, id: any) => {
//     props.history.push(`/administration/users/${  id  }/edit`);
//   };

//   const onChangeActiveItem = (e: any, id: any, active: any) => {
//     props.changeActiveItem(id, active).then(() => {
//       setUserListState({
//         ...userListState,
//         items: [],
//         isLoading: true,
//       });
//       dataListRender();
//     });
//   };

//   const onCheckItem = (event: any, id: any) => {
//     if (
//       event.target.tagName === 'A' ||
//       (event.target.parentElement && event.target.parentElement.tagName === 'A')
//     ) {
//       return true;
//     }
//     if (userListState.lastChecked === null) {
//       setUserListState({
//         ...userListState,
//         lastChecked: id,
//       });
//     }
//     let { selectedItems } = userListState;
//     if (selectedItems.includes(id)) {
//       selectedItems = selectedItems.filter((x) => {return x !== id});
//     } else {
//       selectedItems.push(id);
//     }
//     setUserListState({
//       ...userListState,
//       selectedItems,
//     });
//     if (event.shiftKey) {
//       let { items } = userListState;
//       const start = getIndex(id, items, 'id');
//       const end = getIndex(userListState.lastChecked, items, 'id');
//       items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
//       selectedItems.push(
//         ...items.map((item: any) => {
//           return item.id;
//         }),
//       );
//       selectedItems = Array.from(new Set(selectedItems));
//       setUserListState({
//         ...userListState,
//         selectedItems,
//       });
//     }
//     (document.activeElement as HTMLElement).blur();
//   };

//   const getIndex = (value: any, arr: any, prop: any) => {
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i][prop] === value) {
//         return i;
//       }
//     }
//     return -1;
//   };

//   const handleChangeSelectAll = (isToggle: any) => {
//     if (userListState.selectedItems.length >= userListState.items.length) {
//       if (isToggle) {
//         setUserListState({
//           ...userListState,
//           selectedItems: [],
//         });
//       }
//     } else {
//       setUserListState({
//         ...userListState,
//         selectedItems: userListState.items.map((x: any) => {return x.id}),
//       });
//     }
//     (document.activeElement as HTMLElement).blur();
//     return false;
//   };

//   const dataListRender = () => {
//     const {
//       selectedPageSize,
//       currentPage,
//       selectedOrderOption,
//       search,
//     } = userListState;
//     props.getListAllUser().then((listData: any) => {
//       const totalPage = Math.round(listData.length / selectedPageSize);
//       setUserListState({
//         ...userListState,
//         totalPage,
//         items: [...listData],
//         selectedItems: [],
//         totalItemCount: listData.length,
//         isLoading: false,
//       });
//     });
//   };

//   const collect = (propsCollect: any) => {
//     return { data: propsCollect.data };
//   };

//   return (
//     <>
//       <div className="disable-text-selection">
//         <ListHeading
//           heading="menu.data-list"
//           displayMode={userListState.displayMode}
//           changeDisplayMode={changeDisplayMode}
//           handleChangeSelectAll={handleChangeSelectAll}
//           changeOrderBy={changeOrderBy}
//           changeSortBy={changeSortBy}
//           changePageSize={changePageSize}
//           selectedPageSize={userListState.selectedPageSize}
//           totalItemCount={userListState.totalItemCount}
//           selectedOrderOption={userListState.selectedOrderOption}
//           selectedSortOption={userListState.selectedSortOption}
//           match={match}
//           startIndex={startIndex}
//           endIndex={endIndex}
//           selectedItemsLength={
//             userListState.selectedItems ? userListState.selectedItems.length : 0
//           }
//           itemsLength={userListState.items ? userListState.items.length : 0}
//           onSearchKey={onSearchKey}
//           orderOptions={userListState.orderOptions}
//           sortOptions={userListState.sortOptions}
//           pageSizes={userListState.pageSizes}
//           toggleNew={toggleNew}
//         />
//         <Row>
//           {userListState.isLoading ? (
//             <Colxx xxs="12" className="mb-3">
//               <Card>
//                 <div className="pl-2 d-flex flex-grow-1 min-width-zero">
//                   <div className="p-3 card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
//                     <div className="mb-1 text-muted text-small w-100 w-sm-100 d-flex justify-content-center">
//                       <Loader
//                         type={loaderIcon}
//                         color={loaderColor}
//                         height={30}
//                         width={30}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             </Colxx>
//           ) : (
//             userListState.items.map((product) => {
//               if (userListState.displayMode === 'imagelist') {
//                 return (
//                   // <ImageListView
//                   //   key={product.id}
//                   //   product={product}
//                   //   isSelect={userListState.selectedItems.includes(product.id)}
//                   //   collect={collect}
//                   //   onCheckItem={onCheckItem}
//                   // />
//                   <></>
//                 );
//               } if (userListState.displayMode === 'thumblist') {
//                 return (
//                   // <ThumbListView
//                   //   key={product.id}
//                   //   product={product}
//                   //   isSelect={userListState.selectedItems.includes(product.id)}
//                   //   collect={collect}
//                   //   onCheckItem={onCheckItem}
//                   // />
//                   <></>
//                 );
//               } 
//                 return (
//                   <DataListView
//                     key={product.id}
//                     product={product}
//                     isSelect={userListState.selectedItems.includes(product.id)}
//                     onCheckItem={onCheckItem}
//                     collect={collect}
//                     orderOptions={userListState.orderOptions}
//                     onViewItem={onViewItem}
//                     onChangeActiveItem={onChangeActiveItem}
//                   />
//                 );
              
//             })
//           )}{' '}
//           <ListPagination
//             currentPage={userListState.currentPage}
//             totalPage={userListState.totalPage}
//             onChangePage={(i: any) => {return onChangePage(i)}}
//           />
//         </Row>
//       </div>
//     </>
//   );
// };

// const mapDispatchToProps = { ...userActions };

// const mapStateToProps = ({ LocaleReducer, LoginReducer, UserReducer }: any) => {
//   return { LoginReducer, LocaleReducer, UserReducer };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserList);
