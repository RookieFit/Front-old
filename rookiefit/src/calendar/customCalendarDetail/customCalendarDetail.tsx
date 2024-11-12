import React from 'react';
import './customCalendarDetail.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useCalendarDetails } from '../calendarDetailContext';
import { UseCalendar } from '../calendarContext';

interface Entry {
    title: string;
    diaryContent: string;
    workoutDetails: string[][];
    date: string;
}

const CustomCalendarDetail = () => {
    const { details } = useCalendarDetails(); // details를 context에서 가져오기
    const { updateSelectedDate } = UseCalendar(); // selectedDate 업데이트 함수 가져오기
    const navigate = useNavigate();

    const goToCalendarUpdate = (date: Date) => {
        updateSelectedDate(date); // 선택한 날짜로 업데이트
        navigate('/calendar/detail');
    };

    const getRecentEntries = (entries: Entry[]) => {
        const sortedEntries = entries.sort((a, b) => moment(b.date).isBefore(moment(a.date)) ? -1 : 1);
        return sortedEntries.slice(0, 5);
    };

    const renderEntries = (entries: Entry[]) => (
        getRecentEntries(entries).map((entry, index) => (
            <div
                key={index}
                className={`calendar-detail-item`}
                onClick={() => goToCalendarUpdate(entry.date)} // 선택한 날짜 전달
                tabIndex={0}
                role="button"
            >
                <div className="calendar-detail-header">
                    <p><strong>작성 날짜:</strong> {moment(entry.date).format('YYYY-MM-DD')}</p>
                    <p><strong>제목:</strong> {entry.title}</p>
                    <p><strong>일지 내용:</strong> {entry.diaryContent}</p>
                </div>
            </div>
        ))
    );

    return (
        <div className="calendar-detail-back">
            <div className="calendar-detail-cell">
                <h3>작성된 운동 세부사항</h3>
                {details.entries.length > 0 ? (
                    renderEntries(details.entries)
                ) : (
                    <p>세부사항이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CustomCalendarDetail;
