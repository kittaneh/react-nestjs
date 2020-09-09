/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*Dashbaord*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*Activities*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/activities", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/activities">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Settings-1.svg")} />
            </span>
            <span className="menu-text">Activities</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*Calendar*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/calendar", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/calendar">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Compass.svg")} />
            </span>
            <span className="menu-text">Calendar</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*Payments*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/builder", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/builder">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Box.svg")} />
            </span>
            <span className="menu-text">Payments</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*Reports*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/builder", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/builder">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")} />
            </span>
            <span className="menu-text">Reports</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*Settings*/}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/builder", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/builder">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Settings-2.svg")} />
            </span>
            <span className="menu-text">Settings</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* Components */}
        {/* begin::section */}
        {/* <li className="menu-section ">
            <h4 className="menu-text">Components</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li> */}
        {/* end:: section */}

        {/* Applications */}
        {/* begin::section */}
        {/* <li className="menu-section ">
            <h4 className="menu-text">Applications</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li> */}
        {/* end:: section */}

      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
