import React, { useMemo } from "react";

import { useBookingUIContext } from "../context/BookingUIContext";


export const BookingTableGroupButttons = (props) => {

  const bookingUIContext = useBookingUIContext();
  const bookingUIProps = useMemo(() => {
    return {
      ids: bookingUIContext.ids,
      showUpdateGroupBookingDialog: bookingUIContext.showUpdateGroupBookingDialog,
      setShowUpdateGroupBookingDialog: bookingUIContext.setShowUpdateGroupBookingDialog,
      showAttendanceGroupBookingDialog: bookingUIContext.showAttendanceGroupBookingDialog,
      setShowAttendanceGroupBookingDialog: bookingUIContext.setShowAttendanceGroupBookingDialog
    };
  }, [bookingUIContext]);


  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{bookingUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              {props.filteredStatus === 'BOOKED' && <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={() => bookingUIProps.setShowAttendanceGroupBookingDialog(true)}
              >
                <i className="fa fa-clock"></i> Attendance
              </button>}
              &nbsp;
              {props.filteredStatus === 'PENDING' && <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={() => bookingUIProps.setShowUpdateGroupBookingDialog(true)}
              >
                <i className="fa fa-check-circle"></i> Update Status
              </button>}
              {/* {props.filteredStatus === 'BOOKED' && <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={null}
              >
                <i className="fa fa-trash"></i> Cancel All
              </button>} */}
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
