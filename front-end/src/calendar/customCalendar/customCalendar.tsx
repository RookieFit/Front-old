import React from 'react';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from 'moment';
import { StyledCalendar, StyledCalendarWrapper } from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import { UseCalendar } from '../calendarContext';
import { useCalendarDetails } from '../calendarDetailContext';

type Value = Date | null;

const CustomCalendar = () => {
    const navigate = useNavigate();
    const { selectedDate, updateSelectedDate } = UseCalendar(); // selectedDate 가져오기
    const { details } = useCalendarDetails(); // details 가져오기

    // details를 기반으로 markedDates 계산 (일지가 있는 날짜 마커기능)
    const markedDates = details.entries.map((detail) => moment(detail.date).format('YYYY-MM-DD'));

    const dayClickHandler = (newDate: Value) => {
        if (newDate) {
            updateSelectedDate(newDate); // 날짜 클릭 시 calendarContext -> selectedDate 업데이트

            const selectedDateString = moment(newDate).format('YYYY-MM-DD');

            // 만약 해당 날짜가 markedDates에 없으면, 일지 작성 페이지로 이동 (마커가 없다면)
            if (!markedDates.includes(selectedDateString)) {
                navigate('/calendar/write');
            } else {
                navigate('/calendar/detail');
            }
        }
    };

    const goToWritePage = () => {
        navigate("/calendar/write");
    };

    // 현재 위치가 /calendar가 아니라면 ? 작성하기 버튼 숨기기
    const isWritePage = useLocation().pathname === '/calendar/write' || '/calendar/detail';

    return (
        <div className='left-back'>
            <StyledCalendarWrapper>
                <StyledCalendar
                    value={selectedDate}
                    onClickDay={dayClickHandler}
                    formatDay={(locale, date) => moment(date).format("D")}
                    formatYear={(locale, date) => moment(date).format("YYYY")}
                    formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
                    calendarType="gregory"
                    showNeighboringMonth={false}
                    next2Label={null}
                    prev2Label={null}
                    minDetail="year"
                    tileClassName={({ date }) => {
                        const dateString = moment(date).format('YYYY-MM-DD');
                        return markedDates.includes(dateString) ? 'marked-date' : '';
                    }}
                />
                {!isWritePage && (
                    <div className='calendar-write' onClick={goToWritePage}>
                        운동 일지 작성하러 가기
                    </div>
                )}
            </StyledCalendarWrapper>
        </div>
    );
};

export default CustomCalendar;
