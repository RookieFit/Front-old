import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from './calendarInput';
import AddedDetails from './calendarAddDetails';
import moment from 'moment';
import './CalendarWrite.css';
import { useCalendarDetails } from '../calendarDetailContext';
import { UseCalendar } from '../calendarContext';

const CalendarWrite = () => {
    const navigate = useNavigate();
    const { selectedDate } = UseCalendar(); // useContext로 selectedDate 가져오기
    const { setDetails } = useCalendarDetails(); // CalendarDetailsProvider에서 setDetails 가져오기

    const [content, setContent] = useState({
        exerciseName: '',
        repetitions: '',
        sets: '',
        restTime: ''
    });
    const [title, setTitle] = useState(''); // 일기 제목 상태
    const [diaryContent, setDiaryContent] = useState(''); // 일기 내용 상태
    const [details, setLocalDetails] = useState<string[][]>([]); // 운동 세부사항 상태

    // 운동 세부사항 추가 함수
    const handleAddDetail = () => {
        const newDetail = [content.exerciseName, content.repetitions, content.sets, content.restTime];
        setLocalDetails((prevDetails) => [...prevDetails, newDetail]); // 세부사항 배열에 추가
        setContent({ exerciseName: '', repetitions: '', sets: '', restTime: '' }); // 입력 필드 초기화
    };

    // 일지 내용 변경 처리
    const handleDiaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDiaryContent(e.target.value);
    };

    // 제목 변경 처리
    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    // 제출 시 일기 저장 처리
    const handleSubmit = () => {
        setDetails((prevDetails) => ({
            entries: [
                ...prevDetails.entries,
                {
                    title,
                    diaryContent,
                    workoutDetails: details, // 운동 세부사항 저장
                    date: selectedDate.toString(), // 선택된 날짜 저장
                }
            ]
        }));
        navigate("/calendar"); // 제출 후 캘린더 페이지로 이동
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
                        {/* 운동명, 횟수, 세트수, 휴식시간 입력 필드 */}
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
                        {/* 운동 세부사항 추가 버튼 */}
                        <button className="calendar-write-add" onClick={handleAddDetail}>추가하기</button>
                        <AddedDetails details={details} /> {/* 추가된 세부사항 목록 */}
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
