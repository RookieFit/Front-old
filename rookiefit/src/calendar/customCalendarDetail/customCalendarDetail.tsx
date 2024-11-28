import React from 'react';
import './customCalendarDetail.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useCalendarDetails } from '../calendarDetailContext';
import { UseCalendar } from '../calendarContext';
import { useDragPrevent } from '../../components/useDragPrevent'; // 커스텀 훅 가져오기

interface Entry {
    title: string;
    diaryContent: string;
    workoutDetails: string[][]; // 운동 세부사항
    date: string;
    image?: string | null; // 이미지 URL을 저장할 필드를 선택 사항으로 변경
}

const CustomCalendarDetail = () => {
    const { details } = useCalendarDetails(); // details를 context에서 가져오기
    const { updateSelectedDate } = UseCalendar(); // calendarDetailContext에서 selectedDate 업데이트 함수 가져오기
    const navigate = useNavigate();
    const { handleMouseDown, handleMouseUp, handleMouseMove } = useDragPrevent(); // 커스텀 훅 사용

    const goToCalendarUpdate = (date: string) => {
        updateSelectedDate(moment(date).toDate()); // moment로 Date 객체로 변환 후 setSelectedDate에 전달
        navigate('/calendar/detail');
    };

    const sliceContent = (content: string) =>
        content.length > 50 ? content.slice(0, 50) + "..." : content;

    // 일지 목록 출력하는데 들어갈 내용에 관한 함수 (출력 목록 제한, 마우스이벤트, 내용 글자수 제한)
    const renderEntries = (entries: Entry[]) => (
        entries.slice(0, 5).map((entry, index) => (
            <div
                key={index}
                className="calendar-detail-item"
                onMouseDown={handleMouseDown}
                onMouseUp={() => handleMouseUp(() => goToCalendarUpdate(entry.date))}
                onMouseMove={handleMouseMove}
                tabIndex={0}
                role="button"
            >
                <div className="calendar-detail-header">
                    {entry.image && (
                        <img src={entry.image} alt="Entry Thumbnail" className="entry-thumbnail" />
                    )}
                    <div className="calendar-detail-text">
                        <p><strong>작성 날짜:</strong> {moment(entry.date).format('YYYY-MM-DD')}</p>
                        <p><strong>제목:</strong> {entry.title}</p>
                        <p><strong>일지 내용:</strong> {sliceContent(entry.diaryContent)}</p>
                    </div>
                </div>
            </div>
        ))
    );

    return (
        <div className="right-back">
            <div className="calendar-detail-cell">
                <h3>작성된 운동 세부사항</h3>
                {details.entries.length > 0 ? (
                    renderEntries(details.entries)
                ) : (
                    <p>세부사항이 없습니다. <br /> 날짜를 클릭하여 기록을 해보세유</p>
                )}
            </div>
        </div>
    );
};

export default CustomCalendarDetail;
