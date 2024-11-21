import React, { useState } from 'react';
import './CalendarWrite.css';
import { useNavigate } from 'react-router-dom';
import TextInput from '../calendarComponents/calendarInput';
import AddedDetails from '../calendarComponents/calendarAddDetails';
import moment from 'moment';
import { useCalendarDetails } from '../calendarDetailContext';
import { UseCalendar } from '../calendarContext';
import ImageUploader from '../../components/imageUploader';

const CalendarWrite = () => {
    const navigate = useNavigate();
    const { selectedDate } = UseCalendar(); // useContext로 selectedDate 가져오기
    const { setDetails } = useCalendarDetails(); // CalendarDetailsProvider에서 setDetails 가져오기
    const [workoutDetails, setWorkoutDetails] = useState({
        exerciseName: '',
        repetitions: '',
        sets: '',
        restTime: ''
    });
    const [title, setTitle] = useState(''); // 일기 제목 상태
    const [diaryContent, setDiaryContent] = useState(''); // 일기 내용 상태
    const [localDetails, setLocalDetails] = useState<string[][]>([]); // 운동 세부사항 상태
    const [uploadedImage, setUploadedImage] = useState<File | null>(null); // 업로드된 이미지 상태

    const handleImageUpload = (image: File | null) => {
        setUploadedImage(image);
    };

    // 운동 세부사항 추가 함수
    const handleAddDetail = () => {
        const newDetail = [workoutDetails.exerciseName, workoutDetails.repetitions, workoutDetails.sets, workoutDetails.restTime];
        setLocalDetails((prevDetails) => [...prevDetails, newDetail]); // 세부사항 배열에 추가
        setWorkoutDetails({ exerciseName: '', repetitions: '', sets: '', restTime: '' }); // 입력 필드 초기화
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
        const imageData = uploadedImage ? URL.createObjectURL(uploadedImage) : null;

        setDetails((prevDetails) => ({
            entries: [
                ...prevDetails.entries,
                {
                    title,
                    diaryContent,
                    workoutDetails: localDetails, // 운동 세부사항 저장
                    date: selectedDate.toString(), // 선택된 날짜 저장
                    image: imageData, // 업로드된 이미지 URL 저장
                }
            ]
        }));
        navigate("/calendar"); // 제출 후 캘린더 페이지로 이동
    };

    // 취소 버튼 클릭 시 처리
    const handleCancel = () => {
        navigate("/calendar"); // 취소 시 캘린더 페이지로 돌아감
    };

    return (
        <div className="right-back">
            <div className="calendar-write-wrapper">
                <div className="calendar-header">
                    {/* 날짜 왼쪽에 취소 버튼 추가 */}
                    <div className="calendar-write-cancel-button" onClick={handleCancel}>취소</div>
                    <h2>{moment(selectedDate).format('YYYY-MM-DD')}</h2>
                </div>
                <div className="calendar-title-input">
                    {/* 제목 글자수 제한 */}
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
                            value={workoutDetails.exerciseName}
                            onChange={(e) => setWorkoutDetails({ ...workoutDetails, exerciseName: e.target.value })}
                        />
                        <TextInput
                            label="횟수"
                            value={workoutDetails.repetitions}
                            onChange={(e) => setWorkoutDetails({ ...workoutDetails, repetitions: e.target.value })}
                        />
                        <TextInput
                            label="세트수"
                            value={workoutDetails.sets}
                            onChange={(e) => setWorkoutDetails({ ...workoutDetails, sets: e.target.value })}
                        />
                        <TextInput
                            label="휴식시간"
                            value={workoutDetails.restTime}
                            onChange={(e) => setWorkoutDetails({ ...workoutDetails, restTime: e.target.value })}
                        />
                    </div>
                    <div className="calendar-write-add-detail">
                        {/* 운동 세부사항 추가 버튼 */}
                        <button className="calendar-write-add" onClick={handleAddDetail}>추가하기</button>
                        <AddedDetails workoutDetails={localDetails} /> {/* 추가된 세부사항 목록 */}
                        <div className="diary-input-section">
                            <textarea
                                value={diaryContent}
                                onChange={handleDiaryChange}
                                placeholder="여기에 자유롭게 내용을 입력하세요."
                                maxLength={255}

                            />
                            {/* 이미지 추가 버튼을 따로 만들어서... */}
                            <ImageUploader onImageUpload={handleImageUpload} maxSizeMB={5} />
                        </div>
                        <button className="calendar-write-submit" onClick={handleSubmit}>SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarWrite;
