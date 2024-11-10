import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextInput from './calendarInput';
import AddedDetails from './calendarAddDetails';
import moment from 'moment';
import './CalendarWrite.css';

interface CalendarWriteProps {
    setDetails: React.Dispatch<React.SetStateAction<{
        entries: Array<{
            title: string;
            diaryContent: string;
            workoutDetails: string[][];
            date: string;
        }>;
    }>>;
}


const CalendarWrite = ({ setDetails }: CalendarWriteProps) => {
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
    const [details, setLocalDetails] = useState<string[][]>([]);

    const handleAddDetail = () => {
        const newDetail = [content.exerciseName, content.repetitions, content.sets, content.restTime];
        setLocalDetails((prevDetails) => [...prevDetails, newDetail]);
        setContent({ exerciseName: '', repetitions: '', sets: '', restTime: '' });
    };

    const handleDiaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDiaryContent(e.target.value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = () => {
        setDetails((prevDetails) => ({
            entries: [
                ...prevDetails.entries,
                {
                    title,
                    diaryContent,
                    workoutDetails: details,
                    date: selectedDate.toString(),
                }
            ]
        }));
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
                        <AddedDetails details={details} />
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
