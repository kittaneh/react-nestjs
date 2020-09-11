import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";

import * as columnFormatters from "./column-formatters";
import * as actions from "../_redux/bookingActions";

export const BookingTable = (props) => {

    const { currentState } = useSelector(
        (state) => ({ currentState: state.booking }),
        shallowEqual
    );
    const { entities } = currentState;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchBookings({activity:props.activityId,status:props.status}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const openBookDialog = ()=>{}
    const openCancelDialog = ()=>{}

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
            },
            classes: "text-right pr-0",
            headerClasses: "text-right pr-3",
            style: {
                minWidth: "100px",
            },
        },
    ];

    return (
        <BootstrapTable
            wrapperClasses="table-responsive"
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bootstrap4
            bordered={false}
            remote
            keyField="id"
            data={entities === null ? [] : entities}
            columns={columns}
            noDataIndication={ () => <div className="text-center">No data</div> }
        // defaultSorted={uiHelpers.defaultSorted}
        // onTableChange={getHandlerTableChange(
        //   productsUIProps.setQueryParams
        // )}
        // selectRow={getSelectRow({
        //   entities,
        //   ids: productsUIProps.ids,
        //   setIds: productsUIProps.setIds,
        // })}
        // {...paginationTableProps}
        >
            {/* <PleaseWaitMessage entities={entities} />*/}
        </BootstrapTable>
    );
}