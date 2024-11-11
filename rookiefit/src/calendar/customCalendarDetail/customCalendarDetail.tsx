import React, { } from 'react';
import './customCalendarDetail.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useCalendarDetails } from '../calendarDetailContext';

interface Entry {
    title: string;
    diaryContent: string;
    workoutDetails: string[][];
    date: string;
}

const CustomCalendarDetail = () => {
    const { details } = useCalendarDetails(); // details를 context에서 가져오기
    const navigate = useNavigate();

    const goToCalendarUpdate = () => {
        navigate('/calendar/detail');
    };

    // 엔트리 필터링: 최신 5개만 추출
    const getRecentEntries = (entries: Entry[]) => {
        // 날짜 기준으로 정렬 (내림차순)
        const sortedEntries = entries.sort((a, b) => moment(b.date).isBefore(moment(a.date)) ? -1 : 1);

        // 최신 5개 항목만 반환
        return sortedEntries.slice(0, 5);
    };

    // 모든 엔트리 필터링
    const renderEntries = (entries: Entry[]) => (
        getRecentEntries(entries).map((entry, index) => (
            <div
                key={index}
                className={`calendar-detail-item`}
                onClick={goToCalendarUpdate}
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
                    renderEntries(details.entries) // 최신 5개 엔트리 렌더링
                ) : (
                    <p>세부사항이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CustomCalendarDetail;
