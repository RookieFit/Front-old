import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UseCalendar } from '../calendarContext';
import { useCalendarDetails } from '../calendarDetailContext';
import AddedDetails from '../calendarComponents/calendarAddDetails';
import './calendarDetailUpdate.css';
import ImageUploaderMany from '../../components/imageUploaderMany';
import { WorkoutDetails } from '../../apis/request/workout/inputUserWorkoutRequest.dto';

const CalendarDetailUpdate = () => {
    const navigate = useNavigate();
    const { selectedDate } = UseCalendar();
    const { details, setDetails } = useCalendarDetails();
    const [title, setTitle] = useState('');
    const [diaryContent, setDiaryContent] = useState('');
    const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetails[]>([]); // WorkoutDetails[]로 변경
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    useEffect(() => {
        const currentEntry = details.entries.find(
            (entry) => entry.date === selectedDate.toString()
        );

        if (currentEntry) {
            setTitle(currentEntry.title);
            setDiaryContent(currentEntry.diaryContent);
            setWorkoutDetails(currentEntry.workoutDetails); // workoutDetails는 이미 WorkoutDetails[] 배열이어야 함
            // 기존 이미지 URL을 File 객체로 변환
            Promise.all(currentEntry.images!.map(urlToFile))
                .then(files => setUploadedImages(files));
        } else {
            setTitle('');
            setDiaryContent('');
            setWorkoutDetails([]); // 빈 배열로 초기화
            setUploadedImages([]);
        }
    }, [selectedDate, details.entries]);

    // URL을 File 객체로 변환하는 함수
    const urlToFile = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], 'image.jpg', { type: blob.type });
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handleDiaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDiaryContent(e.target.value);
    };

    const handleUpdate = () => {
        setDetails((prevDetails) => ({
            entries: prevDetails.entries.map((entry) =>
                entry.date === selectedDate.toString() ? {
                    ...entry,
                    title,
                    diaryContent,
                    workoutDetails, // 올바른 타입으로 전달
                    images: uploadedImages.map(file => URL.createObjectURL(file))
                } : entry
            ),
        }));
        navigate('/calendar');
    };

    const handleImageUpload = (images: File[]) => {
        setUploadedImages(images);
    };

    const handleDelete = () => {
        setDetails((previousDetails) => ({
            entries: previousDetails.entries.filter(
                (entry) => entry.date !== selectedDate.toString()
            ),
        }));
        navigate('/calendar');
    };

    return (
        <div className="right-back">
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
                    <AddedDetails workoutDetails={workoutDetails} />
                    <div className="diary-input-section">
                        <textarea
                            value={diaryContent}
                            onChange={handleDiaryChange}
                            placeholder="여기에 자유롭게 내용을 입력하세요."
                        />
                        {/* 이미지 업로더를 통해 기존 이미지들과 새로 업로드된 이미지들 프리뷰로 보여주기 */}
                        <ImageUploaderMany
                            onImageUpload={handleImageUpload}
                            maxImages={5}
                            previewImages={uploadedImages}
                        />
                    </div>
                    <div className="calendar-detail-update-wrapper">
                        <button
                            className="calendar-write-update"
                            onClick={handleUpdate}
                        >
                            수정 완료
                        </button>
                        <div className="divider"></div>
                        <button
                            className="calendar-write-delete"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarDetailUpdate;
