import React from 'react';
import './calendarAddDetails.css';

interface AddedDetailsProps {
    workoutDetails: string[][]; // 운동 세부사항 리스트 (2D 배열)
}

const AddedDetails = ({ workoutDetails }: AddedDetailsProps) => {
    return (
        <div className="added-workout-details">
            {workoutDetails.length > 0 ? (
                <table className="workout-details-table">
                    <thead>
                        <tr>
                            <th>운동명</th>
                            <th>횟수</th>
                            <th>세트수</th>
                            <th>휴식시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workoutDetails.map((detail, index) => (
                            <tr key={index}>
                                <td>{detail[0]}</td>
                                <td>{detail[1]}</td>
                                <td>{detail[2]}</td>
                                <td>{detail[3]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="workout-detail-empty">
                    <p>추가된 운동 세부사항이 없습니다.</p>
                </div>
            )}
        </div>
    );
};

export default AddedDetails;
