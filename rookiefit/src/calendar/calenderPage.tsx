import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomCalendar from './customCalendar/customCalendar';
import CustomCalendarDetail from './customCalendarDetail/customCalendarDetail';
import CalendarWrite from './calendarWirte/calendarWrite';
import CalendarUpdate from './calendarUpdate/calendarDetailUpdate';
import { CalendarProvider } from './calendarContext';
import { CalendarDetailsProvider } from './calendarDetailContext';

const CalendarPage = () => {
    const location = useLocation(); // 현재 위치 정보 가져오기

    const isWritePage = location.pathname === '/calendar/write'; // 현재 페이지가 '일기 작성' 페이지인지 확인
    const isUpdatePage = location.pathname === '/calendar/detail'; // 현재 페이지가 '일기 수정' 페이지인지 확인

    return (
        <div className='left-right-page' style={{
            marginTop: '2vw'
        }}>
            <CalendarProvider>
                <CalendarDetailsProvider>
                    <CustomCalendar />
                    {isWritePage && <CalendarWrite />}
                    {isUpdatePage && <CalendarUpdate />}
                    {!isWritePage && !isUpdatePage && <CustomCalendarDetail />} {/* '일기 작성'과 '일기 수정' 페이지가 아닌 경우 */}
                </CalendarDetailsProvider>
            </CalendarProvider>
        </div>
    );
};

export default CalendarPage;