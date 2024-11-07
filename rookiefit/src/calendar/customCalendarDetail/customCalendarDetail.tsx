import React, { useState } from 'react';
import './customCalendarDetail.css';

const CustomCalendarDetail = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className='calendar-detail-back'>
            <div
                className={`calendar-detail-cell ${isExpanded ? 'expanded' : ''}`}
                onClick={toggleExpand}
            >
                하이요
            </div>
        </div>
    );
};

export default CustomCalendarDetail;
