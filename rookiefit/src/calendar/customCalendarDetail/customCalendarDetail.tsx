import React, { useEffect, useState } from 'react';
import './customCalendarDetail.css';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

interface Entry {
    title: string;
    diaryContent: string;
    workoutDetails: string[][];
    date: string;
}

interface CustomCalendarDetailProps {
    details: {
        entries: Array<Entry>;
    };
}

const CustomCalendarDetail = ({ details }: CustomCalendarDetailProps) => {
    const location = useLocation();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const selectedDate = location.state?.selectedDate || new Date(); // 선택된 날짜 가져오기, 없으면 오늘 날짜

    // selectedDate와 entry.date를 비교할 때 형식을 맞추기 위해 moment 사용
    const formattedSelectedDate = moment(selectedDate).format('YYYY-MM-DD');

    const filteredDetails = details.entries.filter(
        (entry) => entry.date === formattedSelectedDate
    );

    const handleToggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const renderWorkoutDetails = (workoutDetails: string[][]) => (
        workoutDetails.map((detail, detailIndex) => (
            <div key={detailIndex} className="workout-detail">
                <p>운동명: {detail[0]}</p>
                <p>횟수: {detail[1]}</p>
                <p>세트수: {detail[2]}</p>
                <p>휴식시간: {detail[3]}</p>
            </div>
        ))
    );

    useEffect(() => {
        console.log(selectedDate); // selectedDate가 제대로 전달되는지 확인
        console.log('filteredDetails:', filteredDetails); // 필터링된 결과 확인
        console.log('details:', details); // 필터링된 결과 확인
    }, [filteredDetails]);

    return (
        <div className="calendar-detail-back">
            <div className="calendar-detail-cell">
                <h3>작성된 운동 세부사항</h3>
                {filteredDetails.length > 0 ? (
                    filteredDetails.map((entry, index) => (
                        <div
                            key={index}
                            className={`calendar-detail-item ${expandedIndex === index ? 'expanded' : ''}`}
                            onClick={() => handleToggleExpand(index)}
                            tabIndex={0} // 키보드 접근성 추가
                            role="button"
                            aria-expanded={expandedIndex === index}
                        >
                            <div className="calendar-detail-header">
                                <p><strong>작성 날짜:</strong> {moment(entry.date).format('YYYY-MM-DD')}</p>
                                <p><strong>제목:</strong> {entry.title}</p>
                                <p><strong>일지 내용:</strong> {entry.diaryContent}</p>
                            </div>
                            {expandedIndex === index && (
                                <div className="calendar-detail-content">
                                    {renderWorkoutDetails(entry.workoutDetails)}
                                </div>
                            )}
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
