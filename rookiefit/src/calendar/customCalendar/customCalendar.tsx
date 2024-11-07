import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from 'moment';
import { StyledCalendar, StyledCalendarWrapper } from './style';
import { useNavigate, useLocation } from 'react-router-dom';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomCalendar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const today = new Date();
    const [date, setDate] = useState<Value>(today);

    const handleDateChange = (newDate: Value) => {
        setDate(newDate);
    };

    const dayClickHandler = () => {
        navigate("/calendar/write");
    };

    // 현재 경로가 '/calendar/write'일 경우 버튼을 숨기도록 설정
    const isWritePage = location.pathname === '/calendar/write';

    return (
        <StyledCalendarWrapper>
            <div className='calendar-back'>
                <StyledCalendar
                    onClickDay={dayClickHandler}
                    value={date}
                    onChange={handleDateChange}
                    formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
                    formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
                    formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
                    calendarType="gregory" // 일요일 부터 시작
                    showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
                    next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                    prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
                    minDetail="year" // 10년단위 년도 숨기기
                />
                {/* /calendar/write 경로일 때 버튼 숨기기 */}
                {!isWritePage && (
                    <div className='calendar-write' onClick={dayClickHandler}>
                        운동 일지 작성하러 가기
                    </div>
                )}
            </div>
        </StyledCalendarWrapper>
    );
};

export default CustomCalendar;
