import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import ProfileImg from '../../../assets/img/profiles/l-1.jpg';
import { loaderColor, loaderIcon } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import * as notificationActions from '../../../stores/actions/NotificationAction';
import { Colxx } from '../../common/CustomBootstrap';
import NotificationCreate from './NotificationCreate';

const Notification = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);  

  // const methods = useFormContext();

  useEffect(() => {
    props.getListAllNotification(props?.loginReducer?.userId).then((listData: any) => {
      setNotifications(
        listData.map((c: any) => {
          return c.node;
        }),
      );
    });
    setLoading(false);
  }, []);

  const getNotifications = async () => {
    props.getListAllNotification(props?.loginReducer?.userId).then((listData: any) => {
      setNotifications(
        listData.map((c: any) => {
          return c.node;
        }),
      );
    });
  };

  const markAsRead = async (item: any) => {
    props.updateNotification({ dateRead: new Date() }, item.id).then((listData: any) => {
      getNotifications();
    });
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
          <div className="row mb-3 mr-2 d-flex justify-content-end">
          <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => {
                return setModalOpen(!modalOpen);
              }}
            >
              <IntlMessages id="pages.newMessage" />
            </Button>
          </div>        
          <div className="row">
            <div className="col-12 chat-app">
              <div className="scroll">
                <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false }}>
                  {notifications.map((item: any) => {
                    return (
                      <>
                        <div className="clearfix"></div>
                        <div className="card d-inline-block mb-3 float-left mr-2 w-100">
                          <div className="position-absolute pt-1 pr-2 r-0">
                            <span className="text-extra-small text-muted">
                              {moment(item?.dateSend).format('YYYY-MM-DD h:mm a')}
                            </span>
                          </div>
                          <div className="card-body">
                            <div className="d-flex flex-row">
                              <a className="d-flex" href="#">
                                <img
                                  alt="Profile Picture"
                                  src={ProfileImg}
                                  className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                                />
                              </a>
                              <div className=" d-flex flex-grow-1 min-width-zero">
                                <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                  <div className="min-width-zero">
                                    <p
                                      className={`mb-0 truncate list-item-heading ${
                                        item.dateRead ? '' : 'font-bold'
                                      }`}
                                    >
                                      <span>
                                        {item?.user?.name} {item?.user?.lastName}
                                      </span>
                                    </p>
                                  </div>
                                  {!item.dateRead ? (
                                    <span
                                      className="ml-2 badge badge-info cursor-pointer"
                                      onClick={() => markAsRead(item)}
                                    >
                                      <IntlMessages id="info.markAsRead" />
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="chat-text-left">
                              <p
                                className={`mb-0 text-semi-muted ${
                                  item.dateRead ? '' : 'font-bold'
                                }`}
                              >
                                {item.title} : {item?.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </PerfectScrollbar>
              </div>
            </div>
          </div>
          <NotificationCreate
             modalOpen={modalOpen}
             toggleModal={() => {
               return setModalOpen(!modalOpen);
             }}
             props={props}
          />
        </>
      )}
    </>
  );
};

const mapDispatchToProps = { ...notificationActions };

const mapStateToProps = ({ loginReducer }: any) => {
  return { loginReducer };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
