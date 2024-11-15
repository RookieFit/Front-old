import React from 'react';
import './calendarAddDetails.css';

interface AddedDetailsProps {
    workoutDetails: string[][]; // 운동 세부사항 리스트 (2D 배열)
}

const AddedDetails = ({ workoutDetails }: AddedDetailsProps) => {
    return (
        <div className="added-workoutDetails">
            {/* 운동 세부사항이 있을 경우 */}
            {workoutDetails.length > 0 ? (
                workoutDetails.map((detail, index) => (
                    <div key={index} className="detail-item">
                        {/* 첫 번째 운동 세부사항에는 제목을 추가 */}
                        <div className="detail-header">
                            {index === 0 && (
                                <>
                                    <p>운동명</p>
                                    <p>횟수</p>
                                    <p>세트수</p>
                                    <p>휴식시간</p>
                                </>
                            )}
                        </div>
                        {/* 운동 세부사항 표시 */}
                        <div className="detail-content">
                            <p>{detail[0]}</p>
                            <p>{detail[1]}</p>
                            <p>{detail[2]}</p>
                            <p>{detail[3]}</p>
                        </div>
                    </div>
                ))
            ) : (
                // 운동 세부사항이 없을 경우 표시
                <div className='detail-item'>
                    <p>추가된 운동 세부사항이 없습니다.</p>
                </div>
            )}
        </div>
    );
};

export default AddedDetails;
