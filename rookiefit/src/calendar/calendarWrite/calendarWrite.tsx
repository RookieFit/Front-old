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

interface FormData {
    title: string;
    diaryContent: string;
    workoutDetails: { exerciseName: string; repetitions: string; sets: string; restTime: string; workoutDetailCreatedDate: string };
    localDetails: string[][];
    uploadedImages: File[];
}

const CalendarWrite = () => {
    const navigate = useNavigate();
    const { selectedDate } = UseCalendar();
    const { setDetails } = useCalendarDetails();  // 컨텍스트에서 setDetails 가져오기

    const handleRemoveDetail = useCallback((index: number) => {
        setDiaryFormData(prevState => ({
            ...prevState,
            localDetails: prevState.localDetails.filter((_, i) => i !== index), // 선택된 인덱스 제거
        }));
    }, []);

    const [diaryFormData, setDiaryFormData] = useState<FormData>({
        title: '',
        diaryContent: '',
        workoutDetails: { exerciseName: '', repetitions: '', sets: '', restTime: '', workoutDetailCreatedDate: '' },
        localDetails: [],
        uploadedImages: [],
    });

    // 입력 필드 업데이트
    const handleInputChange = useCallback((field: string, value: string, isWorkout = false) => {
        // 숫자 필드인지 확인
        const numericFields = ['repetitions', 'sets', 'restTime'];
        if (numericFields.includes(field)) {
            // 숫자가 아닌 입력 필터링
            if (!/^\d*$/.test(value)) {
                return; // 숫자가 아니면 업데이트하지 않음
            }
        }

        setDiaryFormData(prevState => {
            const newState = isWorkout
                ? { ...prevState, workoutDetails: { ...prevState.workoutDetails, [field]: value } }
                : { ...prevState, [field]: value };
            return newState;
        });
    }, []);

    // 운동 세부사항 추가
    const handleAddDetail = useCallback(() => {
        const { exerciseName, repetitions, sets, restTime } = diaryFormData.workoutDetails;

        if (exerciseName && repetitions && sets && restTime) {
            setDiaryFormData(prevState => ({
                ...prevState,
                localDetails: [
                    ...prevState.localDetails,
                    [exerciseName, repetitions, sets, restTime],
                ],
                workoutDetails: { exerciseName: '', repetitions: '', sets: '', restTime: '', workoutDetailCreatedDate: '' },
            }));
        } else {
            alert('운동 세부사항을 모두 입력하세요!');
        }
    }, [diaryFormData.workoutDetails]);

    // 이미지 업로드 처리
    const handleImagesUpload = useCallback((images: File[]) => {
        setDiaryFormData(prevState => ({ ...prevState, uploadedImages: images }));
    }, []);

    // 폼 제출 시, 디비에 저장 후 컨텍스트에도 저장
    const handleSubmit = useCallback(async () => {
        try {
            // 디비에 데이터 저장 (예시)
            await submitWorkoutData({
                title: diaryFormData.title,
                diaryContent: diaryFormData.diaryContent,
                localDetails: diaryFormData.localDetails,
                uploadedImages: diaryFormData.uploadedImages,
                selectedDate,
            });

            // 컨텍스트에 데이터 저장
            setDetails(prevState => ({
                ...prevState,
                entries: [
                    ...prevState.entries,
                    {
                        title: diaryFormData.title,
                        diaryContent: diaryFormData.diaryContent,
                        workoutDetails: diaryFormData.localDetails.map(detail => ({
                            workoutDetailCreatedDate: moment(selectedDate).format('YYYY-MM-DD'),
                            workout_name: detail[0],
                            reps: parseInt(detail[1], 10),
                            sets: parseInt(detail[2], 10),
                            rest_time: detail[3],
                        })),
                        date: moment(selectedDate).format('YYYY-MM-DD'), // 날짜를 string으로 변환
                        images: diaryFormData.uploadedImages.map(image => URL.createObjectURL(image)),
                    },
                ],
            }));

            alert('데이터가 성공적으로 저장되었습니다.');
            navigate('/calendar');

        } catch (error) {
            alert('데이터 저장 중 오류가 발생했습니다.');
        }
    }, [diaryFormData, navigate, selectedDate, setDetails]);

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

                <div className="calendar-title-input">
                    <textarea
                        value={diaryFormData.title}
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
                                value={diaryFormData.workoutDetails[field as keyof typeof diaryFormData.workoutDetails]}
                                onChange={(e) => handleInputChange(field, e.target.value, true)}
                            />
                        ))}
                    </div>
                </div>

                <div className="calendar-write-add-detail">
                    <button className="calendar-write-add" onClick={handleAddDetail}>추가하기</button>
                    <AddedDetails workoutDetails={diaryFormData.localDetails.map(detail => ({
                        workoutDetailCreatedDate: moment(selectedDate).format('YYYY-MM-DD'),
                        workout_name: detail[0],
                        reps: parseInt(detail[1], 10),
                        sets: parseInt(detail[2], 10),
                        rest_time: detail[3],
                    }))}
                        onRemoveDetail={handleRemoveDetail} // 삭제 핸들러 전달
                    />

                    <div className="diary-input-section">
                        <textarea
                            value={diaryFormData.diaryContent}
                            onChange={(e) => handleInputChange('diaryContent', e.target.value)}
                            placeholder="여기에 자유롭게 내용을 입력하세요."
                            maxLength={255}
                        />
                        <ImageUploaderMany
                            maxImages={5}
                            onImageUpload={handleImagesUpload}
                            previewImages={diaryFormData.uploadedImages}
                        />
                    </div>

                    <button className="calendar-write-submit" onClick={handleSubmit}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
};

export default CalendarWrite;
