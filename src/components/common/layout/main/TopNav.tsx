import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import NavImg2 from '../../../../assets/img/logos/gobernacion.png';
import NavImg1 from '../../../../assets/img/logos/ufps.png';
import ProfileImg from '../../../../assets/img/profiles/l-1.jpg';
import {
  isDarkSwitchActive,
  localeOptions,
  menuHiddenBreakpoint
} from '../../../../constants/defaultValues';
import IntlMessages from '../../../../helpers/IntlMessages';
import { getDirection, setDirection } from '../../../../helpers/Utils';
import * as LoginActions from '../../../../stores/actions/LoginActions';
import * as MenuActions from '../../../../stores/actions/MenuActions';
import * as LocaleActions from '../../../../stores/actions/TranslateActions';
import MenuIcon from './topNav/MenuIcon';
import MobileMenuIcon from './topNav/MobileMenuIcon';
import TopnavDarkSwitch from './topNav/TopnavDarkSwitch';
import TopnavNotifications from './topNav/TopnavNotifications';

const TopNav = (props: any) => {
  const [topNavState, setTopNavState] = useState({
    isInFullScreen: false,
    searchKeyword: '',
  });
  let navigate = useNavigate();

  const { messages } = props.intl;

  const handleChangeLocale = (locale: any, direction: any) => {
    props.changeLocale(locale);
    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const isInFullScreen = () => {
    return (
      document.fullscreenElement && document.fullscreenElement !== null
      // ||
      // (document.webkitFullscreenElement &&
      //   document.webkitFullscreenElement !== null) ||
      // (document.mozFullScreenElement &&
      //   document.mozFullScreenElement !== null) ||
      // (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const handleSearchIconClick = (e: any) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement;
        } else if (e.target.parentElement.parentElement.classList.contains('search')) {
          elem = e.target.parentElement.parentElement;
        }
      }
      if (elem.classList.contains('mobile-view')) {
        search();
        elem.classList.remove('mobile-view');
        removeEventsSearch();
      } else {
        elem.classList.add('mobile-view');
        addEventsSearch();
      }
    } else {
      search();
    }
  };

  const addEventsSearch = () => {
    document.addEventListener('click', handleDocumentClickSearch, true);
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  const handleDocumentClickSearch = (e: any) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setTopNavState({
        ...topNavState,
        searchKeyword: '',
      });
    }
  };

  const handleSearchInputChange = (e: any) => {
    setTopNavState({
      ...topNavState,
      searchKeyword: e.target.value,
    });
  };

  const handleSearchInputKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const search = () => {
    // this.props.history.push(searchPath + '/' + this.state.searchKeyword);
    setTopNavState({
      ...topNavState,
      searchKeyword: '',
    });
  };

  const toggleFullScreen = () => {
    const isFullScreen = isInFullScreen();
    const docElm = document.documentElement;
    if (!isFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setTopNavState({
      ...topNavState,
      isInFullScreen: !isFullScreen,
    });
  };

  const handleLogout = () => {
    props.logout({}).then(navigate('/login'));
  };

  const menuButtonClick = (e: any, menuClickCount: any, containerClassnames: any) => {
    e.preventDefault();
    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    props.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      props.menuReducer.selectedMenuHasSubItems,
    );
  };

  const mobileMenuButtonClick = (e: any, containerClassnames: any) => {
    e.preventDefault();
    props.clickOnMobileMenu(containerClassnames);
  };

  return (
    <>
      <nav className="navbar fixed-top">
        <div className="d-flex align-items-center navbar-left">
          <NavLink
            to="#"
            className="menu-button d-none d-md-block"
            onClick={(e) => {
              return menuButtonClick(
                e,
                props.menuReducer.menuClickCount,
                props.menuReducer.containerClassnames,
              );
            }}
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={(e) => {
              return mobileMenuButtonClick(e, props.menuReducer.containerClassnames);
            }}
          >
            <MobileMenuIcon />
          </NavLink>
          {/* <div className="search">
            <Input
              name="searchKeyword"
              id="searchKeyword"
              placeholder={messages['menu.search']}
              value={topNavState.searchKeyword}
              onChange={(e) => {return handleSearchInputChange(e)}}
              onKeyPress={(e) => {return handleSearchInputKeyPress(e)}}
            />
            <span
              className="search-icon"
              onClick={(e) => {return handleSearchIconClick(e)}}
            >
              <i className="simple-icon-magnifier" />
            </span>
          </div> */}
          <div className="d-inline-block">
            <UncontrolledDropdown className="ml-2">
              <DropdownToggle caret color="light" size="sm" className="language-button">
                <span className="name">{props.translateReducer.locale.toUpperCase()}</span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" end>
                {localeOptions.map((l) => {
                  return (
                    <DropdownItem
                      onClick={() => {
                        return handleChangeLocale(l.id, l.direction);
                      }}
                      key={l.id}
                    >
                      {l.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className="navbar-logo m-0 ml-4 position-relative d-none d-none d-lg-inline-block">
            <span className="logo d-none d-sm-block" />
            <span className="logo-mobile d-block d-sm-none" />
          </div>
          {/* <a className="navbar-logo" href="/home">
            <span className="logo d-none d-sm-block" />
            <span className="logo-mobile d-block d-sm-none" />
          </a>          */}
        </div>
        <div className="navbar-right">      
            <img className="mr-3" alt="LOGO" src={NavImg1} />
             <img className="mr-3" alt="LOGO" src={NavImg2} />
          {isDarkSwitchActive && <TopnavDarkSwitch />}
          <div className="header-icons d-inline-block align-middle">
            {/* <TopnavEasyAccess/> */}
            <TopnavNotifications />          
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={toggleFullScreen}
            >
              {topNavState.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
          <div className="mr-2 border-separator-right align-middle pr-2 d-inline-block">
            <p className="text-muted text-small mb-1">{props?.loginReducer?.school}</p>
            {props?.loginReducer?.campus ? (
              <p className="text-muted text-small mb-0">{props?.loginReducer?.campus}</p>
            ) : null}
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                <span className="name mr-1 text-primary">{props?.loginReducer?.name}</span>
                <span>
                  <img className="border-yellow" alt="Profile" src={ProfileImg} />
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" end>
                <NavLink to="/profile">
                  <DropdownItem>
                    <IntlMessages id="layouts.profile" />
                  </DropdownItem>
                </NavLink>                
                <NavLink to="/messages">
                  <DropdownItem>
                    <IntlMessages id="layouts.messages" />
                  </DropdownItem>
                </NavLink>                
                <NavLink to="/chat">
                  <DropdownItem>
                    <IntlMessages id="layouts.chat" />
                  </DropdownItem>
                </NavLink>                                           
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    return handleLogout();
                  }}
                >
                  <IntlMessages id="layouts.signout" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>
    </>
  );
};

const mapDispatchToProps = {
  ...LocaleActions,
  ...LoginActions,
  ...MenuActions,
};

const mapStateToProps = ({ translateReducer, loginReducer, menuReducer }: any) => {
  return { loginReducer, translateReducer, menuReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
