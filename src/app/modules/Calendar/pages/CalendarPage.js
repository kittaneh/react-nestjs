import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import StaticSubHeader from '../../../../_metronic/layout/components/subheader/StaticSubHeader';

export const Calendar = () => {
    return (<>
        <StaticSubHeader
            title="Calendar"
        />
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={[
                { title: 'Robotics Class', start: '2020-09-01', end: '2020-09-03' },
                { title: 'Let\'s Paint ', date: '2020-09-02' }
            ]}
        />
    </>);
};
