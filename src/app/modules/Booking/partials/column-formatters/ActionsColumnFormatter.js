/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openBookDialog, openCancelDialog, openAttendanceDialog, filteredStatus }
) => (
    <>
      {
        filteredStatus === 'PENDING' && <OverlayTrigger
          overlay={<Tooltip id="booking-confirm-tooltip">Confirm</Tooltip>}
        >
          <a
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => openBookDialog(row.id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Others/tick.svg")}
              />
            </span>
          </a>
        </OverlayTrigger>
      }
      <></>
      {
        filteredStatus === 'BOOKED' && <OverlayTrigger
          overlay={<Tooltip id="booking-attend-tooltip">Attend</Tooltip>}
        >
          <a
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => openAttendanceDialog(row.id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Clock.svg")} />
            </span>
          </a>
        </OverlayTrigger>
      }
      <> </>
      {
        filteredStatus === 'BOOKED' && <OverlayTrigger
          overlay={<Tooltip id="booking-cancel-tooltip">Cancel</Tooltip>}
        >
          <a
            className="btn btn-icon btn-light btn-hover-danger btn-sm"
            onClick={() => openCancelDialog(row.id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Others/cancel.svg")} />
            </span>
          </a>
        </OverlayTrigger>
      }
    </>
  );
