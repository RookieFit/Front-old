import React from 'react';
import './calendarAddDetails.css';

interface WorkoutDetails {
    workoutDetailCreatedDate: string;
    workout_name: string;
    reps: number;
    sets: number;
    rest_time: string;
}

interface AddedDetailsProps {
    workoutDetails: WorkoutDetails[];
    onRemoveDetail: (index: number) => void; // 삭제 핸들러
}

const AddedDetails = ({ workoutDetails, onRemoveDetail }: AddedDetailsProps) => {
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
                            <th>취소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workoutDetails.map((detail, index) => (
                            <tr key={index}>
                                <td>{detail.workout_name}</td>
                                <td>{detail.reps}</td>
                                <td>{detail.sets}</td>
                                <td>{detail.rest_time}</td>
                                <td>
                                    <button
                                        className="remove-detail-button"
                                        onClick={() => onRemoveDetail(index)}
                                    >
                                        취소
                                    </button>
                                </td>
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
