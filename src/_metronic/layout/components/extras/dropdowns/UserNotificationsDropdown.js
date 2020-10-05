/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useMemo } from "react";
import { Nav, Tab, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import SVG from "react-inlinesvg";
import objectPath from "object-path";
import Moment from 'moment';
import { connect } from 'getstream';

import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

export function UserNotificationsDropdown() {

  const [key, setKey] = useState("Alerts");
  const bgImage = toAbsoluteUrl("/media/misc/bg-1.jpg");
  const [acts, setActs] = useState([]);
  const [unSeen, setUnseen] = useState(false);

  const client = connect('p4cngkg4cj9t', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMSJ9.FgtDeycqHhsMRx-9uQ9mQeDB50LkUVOEeY8Z81GJLb4', '93560');

  const notificationFeed = client.feed('activitiesFeed', '1');

  const callback = data => {
    setActs(data.new);
    setUnseen(true);
  };

  const successCallback = () => {
    console.log('now listening to changes in realtime');
  };

  const failCallback = data => {
    alert('something went wrong, check the console logs');
    console.log(data);
  };

  const handleDropdown = () => {
    setUnseen(false);
  }

  notificationFeed.subscribe(callback).then(successCallback, failCallback);

  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.notifications.layout") ===
        "offcanvas",
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.offcanvas && (
        <div className="topbar-item">
          <div
            className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-primary"
            id="kt_quick_notifications_toggle"
          >
            <span className="svg-icon svg-icon-xl svg-icon-primary">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Compiling.svg")} />
            </span>
            <span className="pulse-ring"></span>
          </div>
        </div>
      )}
      {!layoutProps.offcanvas && (
        <Dropdown drop="down" onToggle={() => setUnseen(false)} alignRight>
          <Dropdown.Toggle
            as={DropdownTopbarItemToggler}
            id="kt_quick_notifications_toggle"
          >
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="user-notification-tooltip">
                  User Notifications
                </Tooltip>
              }
            >
              <div
                className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-primary"
                id="kt_quick_notifications_toggle"
              >
                <span className="svg-icon svg-icon-xl svg-icon-primary">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Code/Compiling.svg")}
                  />
                </span>
                {unSeen && <span className="pulse-ring"></span>}
                {unSeen && <span className="pulse-ring" />}
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
            <form>
              {/** Head */}
              <div
                className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <h4 className="d-flex flex-center rounded-top">
                  <span className="text-white">User Notifications</span>
                  <span className="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">
                    {acts.length} new
                  </span>
                </h4>

                <Tab.Container defaultActiveKey={key}>
                  <Nav
                    as="ul"
                    className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                    onSelect={(_key) => setKey(_key)}
                  >
                    <Nav.Item className="nav-item" as="li">
                      <Nav.Link
                        eventKey="Alerts"
                        className={`nav-link show ${key === "Alerts" ? "active" : ""
                          }`}
                      >
                        Alerts
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link
                        eventKey="Events"
                        className={`nav-link show ${key === "Events" ? "active" : ""
                          }`}
                      >
                        Events
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link
                        eventKey="Logs"
                        className={`nav-link show ${key === "Logs" ? "active" : ""
                          }`}
                      >
                        Logs
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content className="tab-content">
                    <Tab.Pane eventKey="Alerts" className="p-8">
                      {acts.length > 0 ? (<PerfectScrollbar
                        options={perfectScrollbarOptions}
                        className="scroll pr-7 mr-n7"
                        style={{ maxHeight: "300px", position: "relative" }}
                      >
                        <div className="d-flex align-items-center mb-6">
                          <div className="symbol symbol-40 symbol-light-primary mr-5">
                            <span className="symbol-label">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Home/Library.svg"
                                )}
                                className="svg-icon-lg svg-icon-primary"
                              ></SVG>
                            </span>
                          </div>
                          <div className="d-flex flex-column font-weight-bold">
                            <Link
                              to={`/activities/activity/${acts[0].foreign_id}`}
                              className="text-dark text-hover-primary mb-1 font-size-lg"
                              onClick={() => setInterval(setActs([]),10000)}
                            >
                              New Booking has been received for {acts.length > 0 && acts[0].object}
                            </Link>
                            <span className="text-muted">
                              {acts.length && Moment(acts[0].time).fromNow()}
                            </span>
                          </div>
                        </div>
                        {/* <div className="d-flex align-items-center mb-6">
                          <div className="symbol symbol-40 symbol-light-warning mr-5">
                            <span className="symbol-label">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Communication/Write.svg"
                                )}
                                className="svg-icon-lg svg-icon-warning"
                              ></SVG>
                            </span>
                          </div>
                          <div className="d-flex flex-column font-weight-bold">
                            <a
                              href="#"
                              className="text-dark-75 text-hover-primary mb-1 font-size-lg"
                            >
                              New customer has registered
                            </a>
                            <span className="text-muted">
                              3 hrs ago
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-6">
                          <div className="symbol symbol-40 symbol-light-success mr-5">
                            <span className="symbol-label">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Communication/Group-chat.svg"
                                )}
                                className="svg-icon-lg svg-icon-success"
                              ></SVG>
                            </span>
                          </div>
                          <div className="d-flex flex-column font-weight-bold">
                            <a
                              href="#"
                              className="text-dark text-hover-primary mb-1 font-size-lg"
                            >
                              Application has been approved
                            </a>
                            <span className="text-muted">
                              3 hrs ago
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-6">
                          <div className="symbol symbol-40 symbol-light-danger mr-5">
                            <span className="symbol-label">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/General/Attachment2.svg"
                                )}
                                className="svg-icon-lg svg-icon-danger"
                              ></SVG>
                            </span>
                          </div>
                          <div className="d-flex flex-column font-weight-bold">
                            <a
                              href="#"
                              className="text-dark text-hover-primary mb-1 font-size-lg"
                            >
                              New user feedback received
                            </a>
                            <span className="text-muted">
                              8 hrs ago
                            </span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <div className="symbol symbol-40 symbol-light-info mr-5">
                            <span className="symbol-label">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/General/Attachment2.svg"
                                )}
                                className="svg-icon-lg svg-icon-info"
                              ></SVG>
                            </span>
                          </div>
                          <div className="d-flex flex-column font-weight-bold">
                            <a
                              href="#"
                              className="text-dark text-hover-primary mb-1 font-size-lg"
                            >
                              New booking has been received
                            </a>
                            <span className="text-muted">
                              5 hrs ago
                            </span>
                          </div>
                        </div> */}
                      </PerfectScrollbar>) : (<div className="d-flex flex-center text-center text-muted min-h-200px">
                        All caught up!
                        <br />
                        No new notifications.
                      </div>)}
                    </Tab.Pane>
                    <Tab.Pane
                      eventKey="Events"
                      id="topbar_notifications_events"
                    >
                      {/* <PerfectScrollbar
                        options={perfectScrollbarOptions}
                        className="navi navi-hover scroll my-4"
                        style={{ maxHeight: "300px", position: "relative" }}
                      >
                  
                      </PerfectScrollbar> */}
                      <div className="d-flex flex-center text-center text-muted min-h-200px">
                        All caught up!
                        <br />
                        No new notifications.
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Logs" id="topbar_notifications_logs">
                      <div className="d-flex flex-center text-center text-muted min-h-200px">
                        All caught up!
                        <br />
                        No new notifications.
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </form>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}
