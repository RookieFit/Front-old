import React, { useState } from 'react';
import './CalendarWrite.css';
import { useNavigate } from 'react-router-dom';
import TextInput from '../calendarComponents/calendarInput';
import AddedDetails from '../calendarComponents/calendarAddDetails';
import moment from 'moment';
import { useCalendarDetails } from '../calendarDetailContext';
import { UseCalendar } from '../calendarContext';
import ImageUploaderMany from '../../components/imageUploaderMany';

const CalendarWrite = () => {
    const navigate = useNavigate();
    const { selectedDate } = UseCalendar();
    const { setDetails } = useCalendarDetails();

    const [formData, setFormData] = useState({
        title: '',
        diaryContent: '',
        workoutDetails: { exerciseName: '', repetitions: '', sets: '', restTime: '' },
        localDetails: [] as string[][],
        uploadedImages: [] as File[],
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleWorkoutDetailChange = (field: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            workoutDetails: { ...prevState.workoutDetails, [field]: value }
        }));
    };

    const handleAddDetail = () => {
        setFormData(prevState => ({
            ...prevState,
            localDetails: [
                ...prevState.localDetails,
                [
                    prevState.workoutDetails.exerciseName,
                    prevState.workoutDetails.repetitions,
                    prevState.workoutDetails.sets,
                    prevState.workoutDetails.restTime
                ]
            ],
            workoutDetails: { exerciseName: '', repetitions: '', sets: '', restTime: '' } // reset after adding
        }));
    };

    const handleImagesUpload = (images: File[]) => {
        setFormData(prevState => ({
            ...prevState,
            uploadedImages: images
        }));
    };

    const handleSubmit = () => {
        const imageUrls = formData.uploadedImages.map((image) => URL.createObjectURL(image));
        setDetails(prevDetails => ({
            entries: [
                ...prevDetails.entries,
                {
                    title: formData.title,
                    diaryContent: formData.diaryContent,
                    workoutDetails: formData.localDetails,
                    date: selectedDate.toString(),
                    images: imageUrls,
                }
            ]
        }));
        navigate("/calendar");
    };

    const handleCancel = () => {
        navigate("/calendar");
    };

    return (
        <div className="right-back">
            <div className="calendar-write-wrapper">
                <div className="calendar-header">
                    <div className="calendar-write-cancel-button" onClick={handleCancel}>취소</div>
                    <h2>{moment(selectedDate).format('YYYY-MM-DD')}</h2>
                </div>
                <div className="calendar-title-input">
                    <textarea
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="제목"
                        maxLength={40}
                    />
                </div>
                <div className="calendar-write-detail">
                    <div className="input-row">
                        {['exerciseName', 'repetitions', 'sets', 'restTime'].map(field => (
                            <TextInput
                                key={field}
                                label={field === 'exerciseName' ? '운동명' : field === 'repetitions' ? '횟수' : field === 'sets' ? '세트수' : '휴식시간'}
                                value={formData.workoutDetails[field as keyof typeof formData.workoutDetails]}
                                onChange={(e) => handleWorkoutDetailChange(field, e.target.value)}
                            />
                        ))}
                    </div>
                    <div className="calendar-write-add-detail">
                        <button className="calendar-write-add" onClick={handleAddDetail}>추가하기</button>
                        <AddedDetails workoutDetails={formData.localDetails} />
                        <div className="diary-input-section">
                            <textarea
                                value={formData.diaryContent}
                                onChange={(e) => handleInputChange('diaryContent', e.target.value)}
                                placeholder="여기에 자유롭게 내용을 입력하세요."
                                maxLength={255}
                            />
                            <ImageUploaderMany
                                maxImages={5}
                                onImageUpload={handleImagesUpload}
                                previewImages={formData.uploadedImages}
                            />
                        </div>
                        <button className="calendar-write-submit" onClick={handleSubmit}>SUBMIT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarWrite;
