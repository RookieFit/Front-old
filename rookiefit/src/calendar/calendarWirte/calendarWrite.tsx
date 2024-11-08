// CalendarWrite.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextInput from './calendarInput';
import AddedDetails from './calendarAddDetails';
import moment from 'moment';
import './CalendarWrite.css';

const CalendarWrite = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedDate = location.state?.selectedDate || new Date();
    const [content, setContent] = useState({
        title: '',
        exerciseName: '',
        repetitions: '',
        sets: '',
        restTime: ''
    });
    const [details, setDetails] = useState<string[][]>([]);
    const [diaryContent, setDiaryContent] = useState('');

    const handleAddDetail = () => {
        setDetails([
            ...details,
            [content.title, content.exerciseName, content.repetitions, content.sets, content.restTime]
        ]);
        setContent({ title: '', exerciseName: '', repetitions: '', sets: '', restTime: '' });
    };

    const handleDiaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDiaryContent(e.target.value);
    };

    const handleSubmit = () => {
        const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
        console.log('날짜:', formattedDate);
        console.log('운동 세부사항:', details);
        console.log('일지 내용:', diaryContent);
        navigate("/calendar");
    };

    return (
        <div className="calendar-detail-back">
            <div className="calendar-write-wrapper">
                <div className="calendar-header">
                    <h2>{moment(selectedDate).format('YYYY-MM-DD')}</h2>
                </div>

                <div className="calendar-write-detail">
                    <div className="input-row">
                        <TextInput label="제목" value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
                        <TextInput label="운동명" value={content.exerciseName} onChange={(e) => setContent({ ...content, exerciseName: e.target.value })} />
                        <TextInput label="횟수" value={content.repetitions} onChange={(e) => setContent({ ...content, repetitions: e.target.value })} />
                        <TextInput label="세트수" value={content.sets} onChange={(e) => setContent({ ...content, sets: e.target.value })} />
                        <TextInput label="휴식시간" value={content.restTime} onChange={(e) => setContent({ ...content, restTime: e.target.value })} />
                    </div>
                </div>
                <button onClick={handleAddDetail}>추가하기</button>

                <AddedDetails details={details} />

                <div className="diary-input-section">
                    <label htmlFor="diary-content">일지 내용</label>
                    <textarea
                        id="diary-content"
                        value={diaryContent}
                        onChange={handleDiaryChange}
                        placeholder="여기에 자유롭게 내용을 입력하세요."
                    />
                </div>

                <button onClick={handleSubmit}>제출</button>
            </div>
        </div>
    );
};

export default CalendarWrite;
