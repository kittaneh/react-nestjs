import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import StaticSubHeader from '../../../../_metronic/layout/components/subheader/StaticSubHeader';
import Spinner from '../../../../_metronic/_partials/controls/Spinner/Spinner';
import * as actions from '../_redux/calendarActions';

export const Calendar = () => {

    const { currentState } = useSelector(
        (state) => ({ currentState: state.calendar }),
        shallowEqual
    );
    const { events } = currentState;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.fetchEvents({ organiser: 1 }));
    }, [dispatch]);

    return (
        <>
            <StaticSubHeader
                title="Calendar"
            />
            {events === null ? <Spinner /> :
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={events}
                />
            }
        </>
    );
};
