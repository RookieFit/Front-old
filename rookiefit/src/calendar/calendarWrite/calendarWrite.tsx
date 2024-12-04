import React, { useState, useCallback } from 'react';
import './CalendarWrite.css';
import { useNavigate } from 'react-router-dom';
import TextInput from '../calendarComponents/calendarInput';
import AddedDetails from '../calendarComponents/calendarAddDetails';
import moment from 'moment';
import { useCalendarDetails } from '../calendarDetailContext';
import { UseCalendar } from '../calendarContext';
import ImageUploaderMany from '../../components/imageUploaderMany';
import { submitWorkoutData } from '../service/workoutService';
import { getJwtToken } from '../../authCheck/storageUtils';

const CalendarWrite = () => {
    const navigate = useNavigate();
    const { selectedDate } = UseCalendar();
    const { setDetails } = useCalendarDetails();

    const tokens = getJwtToken()

    const [formData, setFormData] = useState({
        title: '',
        diaryContent: '',
        workoutDetails: { exerciseName: '', repetitions: '', sets: '', restTime: '' },
        localDetails: [] as string[][],
        uploadedImages: [] as File[],
    });

    // 모든 입력 필드의 업데이트를 하나의 핸들러로 통합
    const handleInputChange = useCallback((field: string, value: string, isWorkout = false) => {
        setFormData(prevState => {
            if (isWorkout) {
                return {
                    ...prevState,
                    workoutDetails: { ...prevState.workoutDetails, [field]: value },
                };
            }
            return { ...prevState, [field]: value };
        });
    }, []);

    // 운동 세부정보 추가
    const handleAddDetail = useCallback(() => {
        const { exerciseName, repetitions, sets, restTime } = formData.workoutDetails;
        setFormData(prevState => ({
            ...prevState,
            localDetails: [...prevState.localDetails, [exerciseName, repetitions, sets, restTime]],
            workoutDetails: { exerciseName: '', repetitions: '', sets: '', restTime: '' }, // 초기화
        }));
    }, [formData.workoutDetails]);

    // 이미지 업로드 처리
    const handleImagesUpload = useCallback((images: File[]) => {
        setFormData(prevState => ({ ...prevState, uploadedImages: images }));
    }, []);

    // 제출 처리
    const handleSubmit = useCallback(async () => {
        const { title, diaryContent, localDetails, uploadedImages } = formData;

        try {
            // API 호출
            const response = await submitWorkoutData({
                token: tokens,
                title,
                diaryContent,
                localDetails,
                selectedDate: selectedDate
            });

            console.log('API 응답:', response);

            // 기존 로직 유지
            setDetails(prevDetails => ({
                entries: [
                    ...prevDetails.entries,
                    {
                        title,
                        diaryContent,
                        workoutDetails: localDetails,
                        date: selectedDate.toString(),
                        images: uploadedImages.map(image => URL.createObjectURL(image)),
                    },
                ],
            }));

            // 성공 시 캘린더 페이지로 이동
            navigate('/calendar');
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
            // 오류 처리 로직 (예: 사용자에게 오류 메시지 표시)
        }
    }, [formData, navigate, selectedDate, setDetails]);

    // 취소 처리
    const handleCancel = useCallback(() => {
        navigate('/calendar');
    }, [navigate]);

    return (
        <div className="right-back">
            <div className="calendar-write-wrapper">
                <div className="calendar-header">
                    <div className="calendar-write-cancel-button" onClick={handleCancel}>취소</div>
                    <h2>{moment(selectedDate).format('YYYY-MM-DD')}</h2>
                </div>

                {/* 제목 입력 */}
                <div className="calendar-title-input">
                    <textarea
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="제목"
                        maxLength={40}
                    />
                </div>

                {/* 운동 세부사항 */}
                <div className="calendar-write-detail">
                    <div className="input-row">
                        {['exerciseName', 'repetitions', 'sets', 'restTime'].map(field => (
                            <TextInput
                                key={field}
                                label={field === 'exerciseName' ? '운동명' : field === 'repetitions' ? '횟수' : field === 'sets' ? '세트수' : '휴식시간'}
                                value={formData.workoutDetails[field as keyof typeof formData.workoutDetails]}
                                onChange={(e) => handleInputChange(field, e.target.value, true)}
                            />
                        ))}
                    </div>
                </div>
                <div className="calendar-write-add-detail">
                    <button className="calendar-write-add" onClick={handleAddDetail}>추가하기</button>
                    <AddedDetails workoutDetails={formData.localDetails} />
                    {/* 일기 내용 */}
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

                    {/* 제출 버튼 */}
                    <button className="calendar-write-submit" onClick={handleSubmit}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
};

export default CalendarWrite;
