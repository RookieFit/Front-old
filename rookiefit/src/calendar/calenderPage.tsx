import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustomCalendar from './customCalendar/customCalendar';
import CustomCalendarDetail from './customCalendarDetail/customCalendarDetail';
import CalendarWrite from './calendarWirte/calendarWrite'; // CalendarWrite 컴포넌트 임포트
import './calendarPage.css';

const CalenderPage = () => {
    const location = useLocation(); // 현재 URL 경로를 추적

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // /calendar/write 경로일 때 CalendarWrite, 아닐 때 CustomCalendarDetail을 렌더링
    const isWritePage = location.pathname === '/calendar/write';

    return (
        <div className='calendarPage'>
            <CustomCalendar />
            {isWritePage ? <CalendarWrite /> : <CustomCalendarDetail />}
        </div>
    );
};

export default CalenderPage;
