import React from 'react';

interface CalendarWriteDetailProps {
    title: string;
    content: string;
}

const CalendarWriteDetail: React.FC<CalendarWriteDetailProps> = ({ title, content }) => (
    <div className="calendar-write-detail-wrapper">
        <div className="calendar-write-detail-name">{title}</div>
        <div className="calendar-write-detail-content">{content}</div>
    </div>
);

export default CalendarWriteDetail;
