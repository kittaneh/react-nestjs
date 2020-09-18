import React, { useEffect, useState, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";


import Spinner from '../../../../_metronic/_partials/controls/Spinner/Spinner';
import { UpdateBookingDialog } from './UpdateBookingDialog';
import { UpdateGroupBookingDialog } from './UpdateGroupBookingDialog';
import { CancelBookingDialog } from './CancelBookingDialog';
import { AttendanceGroupBookingDialog } from './AttendanceGroupBookingDialog';
import * as columnFormatters from "./column-formatters";
import * as actions from "../_redux/bookingActions";
import { getSelectRow } from "../../../../_metronic/_helpers";
import { useBookingUIContext } from "../context//BookingUIContext";
import { BookingTableGroupButttons } from './BookingTableGroupButttons';


export const BookingTable = (props) => {

    const bookingUIContext = useBookingUIContext();
    const bookingUIProps = useMemo(() => {
        return {
            ids: bookingUIContext.ids,
            setIds: bookingUIContext.setIds,
            showUpdateGroupBookingDialog: bookingUIContext.showUpdateGroupBookingDialog,
            setShowUpdateGroupBookingDialog: bookingUIContext.setShowUpdateGroupBookingDialog,
            showAttendanceGroupBookingDialog: bookingUIContext.showAttendanceGroupBookingDialog,
            setShowAttendanceGroupBookingDialog: bookingUIContext.setShowAttendanceGroupBookingDialog
        };
    }, [bookingUIContext]);

    const [showUpdateBookingDialog, setShowUpdateBookingDialog] = useState(false);
    const [showCancelBookingDialog, setShowCancelBookingDialog] = useState(false);

    const [selectedId, setSelectedId] = useState();

    const { currentState } = useSelector(
        (state) => ({ currentState: state.booking }),
        shallowEqual
    );
    const { entities } = currentState;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchBookings({ activity: props.activityId, status: props.status }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const openBookDialog = (id) => {
        setSelectedId(id);
        setShowUpdateBookingDialog(true)
    }
    const openCancelDialog = (id) => {
        setSelectedId(id);
        setShowCancelBookingDialog(true)
    }

    const openAttendanceDialog = (id) => {
        setSelectedId(id);
        bookingUIProps.setShowAttendanceGroupBookingDialog(true);
    }

    const columns = [
        {
            dataField: "id",
            text: "ID",
            //sort: true,
            //sortCaret: sortCaret,
        },
        {
            dataField: "kid_name",
            text: "Kid Name",
            //sort: true,
            //sortCaret: sortCaret,
        },
        {
            dataField: "full_name",
            text: "Parent Name",
            //sort: true,
            //sortCaret: sortCaret,
        },
        {
            dataField: "phone_number",
            text: "Phone Number",
            //sort: true,
            //sortCaret: sortCaret,
        },
        {
            dataField: "status",
            text: "Status",
            //sort: true,
            //sortCaret: sortCaret,
            formatter: columnFormatters.StatusColumnFormatter,
        },
        {
            dataField: "action",
            text: "Actions",
            isDummyField: true,
            formatter: columnFormatters.ActionsColumnFormatter,
            formatExtraData: {
                openBookDialog: openBookDialog,
                openCancelDialog: openCancelDialog,
                openAttendanceDialog: openAttendanceDialog,
                filteredStatus: props.status
            },
            classes: "text-right pr-0",
            headerClasses: "text-right pr-3",
            style: {
                minWidth: "100px",
            },
        },
    ];

    return (
        <>
            <UpdateBookingDialog
                showUpdateBookingDialog={showUpdateBookingDialog}
                setShowUpdateBookingDialog={setShowUpdateBookingDialog}
                activityId={props.activityId}
                id={selectedId}
            />
            <CancelBookingDialog
                showCancelBookingDialog={showCancelBookingDialog}
                setShowCancelBookingDialog={setShowCancelBookingDialog}
                activityId={props.activityId}
                id={selectedId}
            />
            <UpdateGroupBookingDialog
                showUpdateGroupBookingDialog={bookingUIProps.showUpdateGroupBookingDialog}
                setShowUpdateGroupBookingDialog={bookingUIProps.setShowUpdateGroupBookingDialog}
                activityId={props.activityId}
                ids={bookingUIProps.ids}
            />
            <AttendanceGroupBookingDialog
                showAttendanceGroupBookingDialog={bookingUIProps.showAttendanceGroupBookingDialog}
                setShowAttendanceGroupBookingDialog={bookingUIProps.setShowAttendanceGroupBookingDialog}
                activityId={props.activityId}
                ids={bookingUIProps.ids}
            />
            {(bookingUIProps.ids.length > 0 && (
                <>
                    <BookingTableGroupButttons
                        filteredStatus={props.status}
                    />
                </>
            ))}
            {entities === null ? <Spinner /> : <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                noDataIndication={() => <div className="text-center">No data</div>}
                //overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(255, 0, 0, 0.5)'}) } }) }
                // defaultSorted={uiHelpers.defaultSorted}
                // onTableChange={getHandlerTableChange(
                //   productsUIProps.setQueryParams
                // )}
                selectRow={getSelectRow({
                    entities,
                    ids: bookingUIProps.ids,
                    setIds: bookingUIProps.setIds,
                })}
            // {...paginationTableProps}
            >
                {/* <PleaseWaitMessage enti ties={entities} />*/}
            </BootstrapTable>
            }
        </>
    );
}