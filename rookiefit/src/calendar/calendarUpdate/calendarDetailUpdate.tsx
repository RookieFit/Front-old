import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UseCalendar } from '../calendarContext';
import { useCalendarDetails } from '../calendarDetailContext';
import AddedDetails from '../calendarWirte/calendarAddDetails';

const CalendarUpdate = () => {
    const navigate = useNavigate();

    const { selectedDate } = UseCalendar(); // useContext로 selectedDate 가져오기
    const { details, setDetails } = useCalendarDetails(); // calendarDetailContext에서 details와 setDetails 가져오기

    // 상태 초기화
    const [title, setTitle] = useState('');
    const [diaryContent, setDiaryContent] = useState('');
    const [workoutDetails, setWorkoutDetails] = useState<string[][]>([]);

    // 선택된 날짜에 맞는 데이터 불러오기
    useEffect(() => {
        const currentEntry = details.entries.find(entry => entry.date === selectedDate.toString());

        if (currentEntry) {
            setTitle(currentEntry.title);
            setDiaryContent(currentEntry.diaryContent);
            setWorkoutDetails(currentEntry.workoutDetails);
        } else {
            // 선택된 날짜에 해당하는 데이터가 없을 경우 초기화
            setTitle('');
            setDiaryContent('');
            setWorkoutDetails([]);
        }
    }, [selectedDate, details.entries]); // selectedDate와 details.entries가 변경될 때마다 실행

    // 제목 변경 처리
    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    // 일지 내용 변경 처리
    const handleDiaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDiaryContent(e.target.value);
    };

    // 수정 완료 시 일기 저장 처리
    const handleUpdate = () => {
        setDetails((prevDetails) => ({
            entries: prevDetails.entries.map(entry =>
                entry.date === selectedDate.toString()
                    ? { ...entry, title, diaryContent, workoutDetails }
                    : entry
            )
        }));
        navigate("/calendar"); // 제출 후 캘린더 페이지로 이동
    };

    return (
        <div className="calendar-detail-back">
            <div className="calendar-update-wrapper">
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
                <div className="calendar-write-add-detail">
                    {/* 운동 세부사항 추가된 부분 */}
                    <AddedDetails details={workoutDetails} />
                </div>
                <div className="diary-input-section">
                    <textarea
                        value={diaryContent}
                        onChange={handleDiaryChange}
                        placeholder="여기에 자유롭게 내용을 입력하세요."
                    />
                </div>
                <button onClick={handleUpdate}>수정 완료</button>
            </div>
        </div>
    );
};

export default CalendarUpdate;
