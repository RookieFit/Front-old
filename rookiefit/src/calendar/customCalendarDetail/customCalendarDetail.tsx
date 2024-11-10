// CustomCalendarDetail 컴포넌트

import React, { useState } from 'react';
import './customCalendarDetail.css';
import moment from 'moment';

interface CustomCalendarDetailProps {
    details: {
        entries: Array<{
            title: string;
            diaryContent: string;
            workoutDetails: string[][];
            date: string;
        }>;
    };
}

const CustomCalendarDetail = ({ details }: CustomCalendarDetailProps) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleToggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="calendar-detail-back">
            <div className="calendar-detail-cell">
                <h3>작성된 운동 세부사항</h3>
                {details.entries.length > 0 ? (
                    details.entries.map((entry, index) => (
                        <div
                            key={index}
                            className={`calendar-detail-item ${expandedIndex === index ? 'expanded' : ''}`}
                            onClick={() => handleToggleExpand(index)}
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
                    <p>세부사항이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CustomCalendarDetail;
