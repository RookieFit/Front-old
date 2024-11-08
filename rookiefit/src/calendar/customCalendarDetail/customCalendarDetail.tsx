import React from 'react';
import './customCalendarDetail.css';

interface CustomCalendarDetailProps {
    details: string[][]; // details props 추가
}

const CustomCalendarDetail: React.FC<CustomCalendarDetailProps> = ({ details }) => {
    return (
        <div className="calendar-detail-back">
            <div className="calendar-detail-cell">
                <h3>작성된 운동 세부사항</h3>
                {details.length > 0 ? (
                    details.map((detail, index) => (
                        <div key={index} className="calendar-detail-item">
                            <p>운동명: {detail[0]}</p>
                            <p>횟수: {detail[1]}</p>
                            <p>세트수: {detail[2]}</p>
                            <p>휴식시간: {detail[3]}</p>
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
