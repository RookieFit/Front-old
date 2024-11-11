import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomCalendar from './customCalendar/customCalendar';
import CustomCalendarDetail from './customCalendarDetail/customCalendarDetail';
import CalendarWrite from './calendarWirte/calendarWrite';
import './calendarPage.css';

const CalendarPage = () => {
    const location = useLocation(); // 현재 위치 정보 가져오기 (URL 경로 확인 용도)
    const [details, setDetails] = useState<{
        entries: Array<{
            title: string;
            diaryContent: string;
            workoutDetails: string[][]; // 운동 세부사항 배열
            date: string;
        }>;
    }>({
        entries: [] // 초기 상태: 빈 entries 배열
    });

    const isWritePage = location.pathname === '/calendar/write'; // 현재 페이지가 '일기 작성' 페이지인지 확인

    return (
        <div className='calendarPage'>
            <CustomCalendar />
            {isWritePage ? ( // '일기 작성' 페이지일 경우 CalendarWrite 컴포넌트 표시
                <CalendarWrite setDetails={setDetails} />
            ) : (
                <CustomCalendarDetail details={details} /> // 아닌 경우 CustomCalendarDetail 컴포넌트로 세부사항 표시
            )}
        </div>
    );
};

export default CalendarPage;

// location의 state에서 선택된 날짜 가져오기
// const selectedDate = location.state?.selectedDate;

// // 선택된 날짜에 맞는 데이터 필터링
// const filteredDetails = details.entries.filter(
//     (entry) => entry.date === moment(selectedDate).format('YYYY-MM-DD')
// );