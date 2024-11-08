import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomCalendar from './customCalendar/customCalendar';
import CustomCalendarDetail from './customCalendarDetail/customCalendarDetail';
import CalendarWrite from './calendarWirte/calendarWrite'; // CalendarWrite 컴포넌트 임포트
import './calendarPage.css';

const CalenderPage = () => {
    const location = useLocation(); // 현재 URL 경로를 추적
    const [details, setDetails] = useState<string[][]>([]); // 운동 세부사항 상태 관리

    // /calendar/write 경로일 때 CalendarWrite, 아닐 때 CustomCalendarDetail을 렌더링
    const isWritePage = location.pathname === '/calendar/write';

    return (
        <div className='calendarPage'>
            <CustomCalendar />
            {isWritePage ? (
                <CalendarWrite setDetails={setDetails} /> // CalendarWrite로 setDetails 전달
            ) : (
                <CustomCalendarDetail details={details} /> // CustomCalendarDetail로 details 전달
            )}
        </div>
    );
};

export default CalenderPage;
