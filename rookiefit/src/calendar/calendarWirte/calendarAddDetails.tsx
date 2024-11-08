import React from 'react';
import './calendarAddDetails.css';

interface AddedDetailsProps {
    details: string[][];
}

const AddedDetails = ({ details }: AddedDetailsProps) => {
    return (
        <div className="added-details">
            {details.length > 0 ? (
                details.map((detail, index) => (
                    <div key={index} className="detail-item">
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
                        <div className="detail-content">
                            <p>{detail[0]}</p>
                            <p>{detail[1]}</p>
                            <p>{detail[2]}</p>
                            <p>{detail[3]}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className='detail-item'>
                    <p>추가된 운동 세부사항이 없습니다.</p>
                </div>
            )}
        </div>
    );
};

export default AddedDetails;
