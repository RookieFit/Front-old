import React, { useState } from 'react';
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
    const { updateSelectedDate } = UseCalendar(); // calendarDetailContext에서 selectedDate 업데이트 함수 가져오기
    const navigate = useNavigate();
    const [isMouseDown, setIsMouseDown] = useState(false); // 마우스 클릭 상태 추적
    const [isDragging, setIsDragging] = useState(false); // 드래그 상태 추적

    const goToCalendarUpdate = (date: string) => {
        updateSelectedDate(moment(date).toDate()); // moment로 Date 객체로 변환 후 setSelectedDate에 전달
        navigate('/calendar/detail');
    };

    const handleMouseDown = () => {
        setIsMouseDown(true); // 마우스가 눌렸을 때
        setIsDragging(false); // 드래그 상태 초기화
    };

    const handleMouseUp = (date: string) => {
        if (!isDragging && isMouseDown) {
            goToCalendarUpdate(date); // 클릭일 때만 이동 (클릭이동 막기)
        }
        setIsMouseDown(false); // 마우스가 떼어졌을 때 상태 초기화
    };

    // 마우스를 움직일 때 드래그 상태로 변경
    const handleMouseMove = () => {
        if (isMouseDown) {
            setIsDragging(true);
        }
    };

    // 일지 목록 최근날짜 기준 5개만 보여주기
    const getRecentEntries = (entries: Entry[]) => {
        const sortedEntries = entries.sort((a, b) => moment(b.date).isBefore(moment(a.date)) ? -1 : 1);
        return sortedEntries.slice(0, 5);
    };

    // 일지 목록에서 내용 50글자로 제한하고 넘어가면 ...으로 표시
    const sliceContent = (content: string) =>
        content.length > 50 ? content.slice(0, 50) + "..." : content;

    // 일지 목록 출력하는데 들어갈 내용에 관한 함수 (출력 목록 제한, 마우스이벤트, 내용 글자수 제한)
    const renderEntries = (entries: Entry[]) => (
        getRecentEntries(entries).map((entry, index) => (
            <div
                key={index}
                className="calendar-detail-item"
                onMouseDown={handleMouseDown} // 마우스 다운 처리
                onMouseUp={() => handleMouseUp(entry.date)} // 마우스 업 처리
                onMouseMove={handleMouseMove} // 마우스 이동 처리
                tabIndex={0}
                role="button"
            >
                <div className="calendar-detail-header">
                    <p><strong>작성 날짜:</strong> {moment(entry.date).format('YYYY-MM-DD')}</p>
                    <p><strong>제목:</strong> {entry.title}</p>
                    <p><strong>일지 내용:</strong> {sliceContent(entry.diaryContent)}</p> {/* 잘린 콘텐츠 적용 */}
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
                    <p>세부사항이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CustomCalendarDetail;
