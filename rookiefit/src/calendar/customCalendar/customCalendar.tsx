import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import moment from 'moment';
import { StyledCalendar, StyledCalendarWrapper } from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import { UseCalendar } from '../calendarContext';

type Value = Date | null;

const CustomCalendar = () => {
    const navigate = useNavigate();
    const { selectedDate, updateSelectedDate } = UseCalendar(); // useContext로 selectedDate 가져오기

    // const [date, setDate] = useState<Value>(new Date());
    const [markedDates, setMarkedDates] = useState<string[]>([]); // 일지가 있는 날짜 저장

    const dayClickHandler = (newDate: Value) => {
        if (newDate) {
            updateSelectedDate(newDate); // 날짜 클릭 시 상태 업데이트
        }
    };

    const goToWritePage = () => {
        navigate("/calendar/write");
    };

    const isWritePage = useLocation().pathname === '/calendar/write';

    useEffect(() => {
        // 나중에 DB에서 일지 있는 날짜들 불러오기
        // 예: 
        // fetch('/api/marked-dates')
        //   .then(response => response.json())
        //   .then(data => {
        //     setMarkedDates(data.markedDates); // DB에서 받은 날짜들로 markedDates 업데이트
        //   })
        //   .catch(error => console.error('Error:', error));
    }, []);

    return (
        <StyledCalendarWrapper>
            <div className='calendar-back'>
                <StyledCalendar
                    value={selectedDate}
                    onClickDay={dayClickHandler}
                    // onChange={handleDateChange}
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
                        if (markedDates.includes(dateString)) {
                            return 'marked-date'; // 일지가 있는 날짜에 스타일 추가
                        }
                        return '';
                    }}
                />
                {!isWritePage && (
                    <div className='calendar-write' onClick={goToWritePage}>
                        운동 일지 작성하러 가기
                    </div>
                )}
            </div>
        </StyledCalendarWrapper>
    );
};

export default CustomCalendar;
