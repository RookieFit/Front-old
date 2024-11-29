import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { UseCalendar } from '../calendarContext';
import { useCalendarDetails } from '../calendarDetailContext';
import AddedDetails from '../calendarComponents/calendarAddDetails';
import './calendarDetailUpdate.css';
import ImageUploaderMany from '../../components/imageUploaderMany'; // ImageUploaderMany로 변경

// CalendarDetailUpdate 컴포넌트

const CalendarDetailUpdate = () => {
    const navigate = useNavigate();
    const { selectedDate } = UseCalendar(); // useContext로 selectedDate 가져오기
    const { details, setDetails } = useCalendarDetails(); // calendarDetailContext에서 details와 setDetails 가져오기
    // 상태 초기화
    const [title, setTitle] = useState('');
    const [diaryContent, setDiaryContent] = useState('');
    const [workoutDetails, setWorkoutDetails] = useState<string[][]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]); // 여러 이미지 URL 상태

    // 선택된 날짜에 맞는 데이터 불러오기
    useEffect(() => {
        const currentEntry = details.entries.find(
            (entry) => entry.date === selectedDate.toString()
        );

        if (currentEntry) {
            setTitle(currentEntry.title);
            setDiaryContent(currentEntry.diaryContent);
            setWorkoutDetails(currentEntry.workoutDetails);
            setUploadedImages(currentEntry.images || []); // 여러 이미지 URL을 사용
        } else {
            // 선택된 날짜에 해당하는 데이터가 없을 경우 초기화
            setTitle('');
            setDiaryContent('');
            setWorkoutDetails([]);
            setUploadedImages([]);
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
            entries: prevDetails.entries.map((entry) =>
                entry.date === selectedDate.toString()
                    ? { ...entry, title, diaryContent, workoutDetails, images: uploadedImages }
                    : entry
            ),
        }));
        navigate('/calendar'); // 제출 후 캘린더 페이지로 이동
    };

    const handleImageUpload = (images: File[]) => {
        // 여러 이미지가 업로드되면 uploadedImages 상태를 URL 배열로 변경
        const imageUrls = images.map((image) => URL.createObjectURL(image));
        setUploadedImages((prevImages) => [...prevImages, ...imageUrls]);
    };

    // 삭제 처리
    const handleDelete = () => {
        setDetails((previousDetails) => ({
            entries: previousDetails.entries.filter(
                (entry) => entry.date !== selectedDate.toString()
            ),
        }));
        navigate('/calendar'); // 삭제 후 캘린더 페이지로 이동
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
                            maxImages={5} // maxImages가 0 이상으로 계산되도록
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

