import React, { useState } from 'react';
import './customCalendarDetail.css';
import moment from 'moment';

interface CustomCalendarDetailProps {
    details: {
        entries: Array<{
            title: string;
            diaryContent: string;
            workoutDetails: string[][]; // 운동 세부사항 (운동명, 횟수, 세트수, 휴식시간)
            date: string;
        }>;
    };
}

const CustomCalendarDetail = ({ details }: CustomCalendarDetailProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // 펼쳐진 항목 인덱스 상태 관리

    // 항목 클릭 시 펼치거나 접는 함수
    const handleToggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index); // 이미 펼쳐진 항목은 접음
    };

    return (
        <div className="calendar-detail-back">
            <div className="calendar-detail-cell">
                <h3>작성된 운동 세부사항</h3>
                {details.entries.length > 0 ? ( // 세부사항이 있을 경우
                    details.entries.map((entry, index) => (
                        <div
                            key={index}
                            className={`calendar-detail-item ${expandedIndex === index ? 'expanded' : ''}`}
                            onClick={() => handleToggleExpand(index)} // 클릭 시 펼치기/접기 처리
                        >
                            <div className="calendar-detail-header">
                                <div className="calendar-detail-date">
                                    <p><strong>작성 날짜:</strong> {moment(entry.date).format('YYYY-MM-DD')}</p>
                                </div>
                                <p><strong>제목:</strong> {entry.title}</p>
                                <p><strong>일지 내용:</strong> {entry.diaryContent}</p>
                            </div>
                            <div className="calendar-detail-content">
                                {entry.workoutDetails.map((detail, detailIndex) => (
                                    <div key={detailIndex}>
                                        <p>운동명: {detail[0]}</p>
                                        <p>횟수: {detail[1]}</p>
                                        <p>세트수: {detail[2]}</p>
                                        <p>휴식시간: {detail[3]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>세부사항이 없습니다.</p> // 세부사항이 없을 경우 메시지 표시
                )}
            </div>
        </div>
    );
};

export default CustomCalendarDetail;
