/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { adminRoot } from '../../../../../constants/defaultValues';

const NotificationItem = ({ img, title, date }:any) => {
  return (
    <div className="d-flex flex-row mb-3 pb-3 border-bottom">
      <NavLink to={`${adminRoot}/pages/product/details`}>
        <img
          src={img}
          alt={title}
          className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
        />
      </NavLink>
      <div className="pl-3 pr-2">
        <NavLink to={`${adminRoot}/pages/product/details`}>
          <p className="font-weight-medium mb-1">{title}</p>
          <p className="text-muted mb-0 text-small">{date}</p>
        </NavLink>
      </div>
    </div>
  );
};

const TopnavNotifications = () => {
  const notifications = [
    {
      img: '/assets/img/profiles/l-2.jpg',
      title: 'Joisse Kaycee just sent a new comment!',
      date: '09.04.2018 - 12:45',
      id: 1,
    },
    {
      img: '/assets/img/notifications/thumb-1.jpg',
      title: '1 item is out of stock!',
      date: '09.04.2018 - 12:45',
      id: 2,
    },
    {
      img: '/assets/img/notifications/thumb-2.jpg',
      title: 'New order received! It is total $147,20.',
      date: '09.04.2018 - 12:45',
      id: 3,
    },
    {
      img: '/assets/img/notifications/thumb-3.jpg',
      title: '3 items just added to wish list by a user!',
      date: '09.04.2018 - 12:45',
      id: 4,
    },
  ]
  return (
    <div className="position-relative d-inline-block">
      <UncontrolledDropdown className="dropdown-menu-right">
        <DropdownToggle
          className="header-icon notificationButton"
          color="empty"
        >
          <i className="simple-icon-bell" />
          <span className="count">3</span>
        </DropdownToggle>
        <DropdownMenu
          className="position-absolute mt-3 scroll"
          end
          id="notificationDropdown"
        >
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {notifications.map((notification, index) => {
              return <NotificationItem key={index} {...notification} />;
            })}
          </PerfectScrollbar>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default TopnavNotifications;
