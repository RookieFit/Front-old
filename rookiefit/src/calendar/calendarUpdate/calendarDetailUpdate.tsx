import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './calendarDetailUpdate.css';
import ImageUploaderMany from '../../components/imageUploaderMany';
import AddedDetails from '../calendarComponents/calendarAddDetails';
import { GetUserWorkoutDetailRequest, GetUserWorkoutListRequest } from '../../apis/api/workoutApi';
import { UseCalendar } from '../calendarContext';

const CalendarDetailUpdate = () => {
    const navigate = useNavigate();
    const { selectedDate } = UseCalendar(); // 선택된 날짜 업데이트 함수
    const [title, setTitle] = useState('');
    const [diaryContent, setDiaryContent] = useState('');
    const [reps, setReps] = useState<number>();
    const [restTime, setRestTime] = useState('');
    const [sets, setSets] = useState<number>();
    const [workoutDetails, setWorkoutDetails] = useState({
        workoutDetailCreatedDate: '',
        workout_name: '',
        reps: 0,
        sets: 0,
        rest_time: '',
    });

    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detailResponse = await GetUserWorkoutDetailRequest({
                    workoutDetailCreatedDate: moment(selectedDate).format('YYYY-MM-DD'),
                });
                console.log('받은 데이터:', detailResponse);

                if (detailResponse) {
                    setWorkoutDetails({
                        workoutDetailCreatedDate: detailResponse.workoutDetailCreatedDate,
                        workout_name: detailResponse.workout_name,
                        reps: detailResponse.reps,
                        sets: detailResponse.sets,
                        rest_time: detailResponse.rest_time
                    });
                } else {
                    console.warn('API 응답이 비어있습니다. 기본값을 사용합니다.');
                    setWorkoutDetails({
                        workoutDetailCreatedDate: '',
                        workout_name: '',
                        reps: 0,
                        sets: 0,
                        rest_time: '',
                    });
                }
            } catch (error) {
                console.error('데이터를 불러오지 못했습니다:', error);
            }
        };

        fetchData();
    }, [selectedDate]);

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
        // API로 수정 데이터 전송
        console.log('수정 완료:', {
            title,
            diaryContent,
            reps,
            restTime,
            sets,
            images: uploadedImages.map(file => URL.createObjectURL(file)),
        });
        navigate('/calendar');
    };

    const handleImageUpload = (images: File[]) => {
        setUploadedImages(images);
    };

    const handleDelete = () => {
        // API로 삭제 요청
        console.log('삭제 요청:', { date: moment(selectedDate).format('YYYY-MM-DD') });
        navigate('/calendar');
    };

    const handleCancel = useCallback(() => {
        navigate('/calendar');
    }, [navigate]);

    return (
        <div className="right-back">
            <div className="calendar-update-wrapper">
                <div className="calendar-header">
                    <div className="calendar-write-cancel-button" onClick={handleCancel}>취소</div>
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
                    <AddedDetails
                        workoutDetails={[workoutDetails]} // 배열로 변환
                        onRemoveDetail={(index) => {
                            console.log('Detail removed:', index);
                            // 필요시 상태 초기화
                            // setWorkoutDetails({
                            //     workoutDetailCreatedDate: '',
                            //     workout_name: '',
                            //     reps: 0,
                            //     sets: 0,
                            //     rest_time: '',
                            // });
                        }}
                    />
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
