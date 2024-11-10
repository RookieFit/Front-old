import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomCalendar from './customCalendar/customCalendar';
import CustomCalendarDetail from './customCalendarDetail/customCalendarDetail';
import CalendarWrite from './calendarWirte/calendarWrite';
import './calendarPage.css';

const CalendarPage = () => {
    const location = useLocation();
    const [details, setDetails] = useState<{
        entries: Array<{
            title: string;
            diaryContent: string;
            workoutDetails: string[][];
            date: string;
        }>;
    }>({
        entries: []
    });

    const isWritePage = location.pathname === '/calendar/write';

    return (
        <div className='calendarPage'>
            <CustomCalendar />
            {isWritePage ? (
                <CalendarWrite setDetails={setDetails} />
            ) : (
                <CustomCalendarDetail details={details} />
            )}
        </div>
    );
};

export default CalendarPage;