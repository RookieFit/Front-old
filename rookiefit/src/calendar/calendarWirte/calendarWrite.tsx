// CalendarWrite.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextInput from './calendarInput';
import AddedDetails from './calendarAddDetails';
import moment from 'moment';
import './CalendarWrite.css';

interface CalendarWriteProps {
    setDetails: React.Dispatch<React.SetStateAction<string[][]>>; // setDetails props 추가
}

const CalendarWrite: React.FC<CalendarWriteProps> = ({ setDetails }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedDate = location.state?.selectedDate || new Date();
    const [content, setContent] = useState({
        exerciseName: '',
        repetitions: '',
        sets: '',
        restTime: ''
    });
    const [title, setTitle] = useState('');
    const [diaryContent, setDiaryContent] = useState('');
    const [details, setLocalDetails] = useState<string[][]>([]); // 컴포넌트 내부에서 details 상태 관리

    const handleAddDetail = () => {
        const newDetail = [content.exerciseName, content.repetitions, content.sets, content.restTime];
        setLocalDetails((prevDetails) => [...prevDetails, newDetail]);
        setDetails((prevDetails) => [...prevDetails, newDetail]); // 상위 상태도 업데이트
        setContent({ exerciseName: '', repetitions: '', sets: '', restTime: '' });
    };

    const handleDiaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDiaryContent(e.target.value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = () => {
        console.log('운동 세부사항:', content);
        console.log('일지 내용:', diaryContent);
        navigate("/calendar");
    };

    return (
        <div className="calendar-detail-back">
            <div className="calendar-write-wrapper">
                <div className="calendar-header">
                    <h2>{moment(selectedDate).format('YYYY-MM-DD')}</h2>
                </div>
                <div className="calendar-title-input">
                    <textarea
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="제목"
                        maxLength={40}
                    />
                </div>
                <div className="calendar-write-detail">
                    <div className="input-row">
                        <TextInput
                            label="운동명"
                            value={content.exerciseName}
                            onChange={(e) => setContent({ ...content, exerciseName: e.target.value })}
                        />
                        <TextInput
                            label="횟수"
                            value={content.repetitions}
                            onChange={(e) => setContent({ ...content, repetitions: e.target.value })}
                        />
                        <TextInput
                            label="세트수"
                            value={content.sets}
                            onChange={(e) => setContent({ ...content, sets: e.target.value })}
                        />
                        <TextInput
                            label="휴식시간"
                            value={content.restTime}
                            onChange={(e) => setContent({ ...content, restTime: e.target.value })}
                        />
                    </div>
                    <div className="calendar-write-add-detail">
                        <button className="calendar-write-add" onClick={handleAddDetail}>추가하기</button>
                        <AddedDetails details={details} /> {/* 업데이트된 details 상태 전달 */}
                    </div>

                    <div className="diary-input-section">
                        <textarea
                            value={diaryContent}
                            onChange={handleDiaryChange}
                            placeholder="여기에 자유롭게 내용을 입력하세요."
                        />
                    </div>
                </div>
                <button onClick={handleSubmit}>제출</button>
            </div>
        </div>
    );
};

export default CalendarWrite;
