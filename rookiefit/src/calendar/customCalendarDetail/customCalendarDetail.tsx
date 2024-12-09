import React, { useEffect, useState } from 'react';
import './customCalendarDetail.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useCalendarDetails } from '../calendarDetailContext';
import { UseCalendar } from '../calendarContext';
import { useDragPrevent } from '../../components/useDragPrevent';
import { GetUserWorkoutListRequest } from '../../apis/api/workoutApi'; // API 호출 import
import { GetUserWorkoutListResponseDto } from '../../apis/response/workout'; // API 응답 타입 import

interface Entry {
    title: string;
    diaryContent: string;
    date: string;
    images?: string[];
}

const CustomCalendarDetail = () => {
    const { updateSelectedDate } = UseCalendar(); // 선택된 날짜 업데이트 함수
    const navigate = useNavigate();
    const { handleMouseDown, handleMouseUp, handleMouseMove } = useDragPrevent(); // 커스텀 훅 사용

    const [workoutList, setWorkoutList] = useState<Entry[]>([]); // 서버에서 받은 운동 데이터를 관리할 상태

    // GetUserWorkoutListRequest를 호출하여 데이터를 가져오는 함수
    const fetchWorkoutData = async () => {
        try {
            const response = await GetUserWorkoutListRequest();
            console.log("API Response:", response); // 응답을 확인

            // response가 GetUserWorkoutListResponseDto[] 타입인지 체크
            if (Array.isArray(response)) {
                const data = response as GetUserWorkoutListResponseDto[]; // 타입 변환
                console.log("Fetched Data:", data); // 응답 데이터 확인

                // 응답 데이터를 Entry 형식으로 변환
                const workoutEntries = data.map((workout) => ({
                    title: workout.workout_title,
                    diaryContent: workout.comment,
                    date: workout.workoutCreatedData,
                    images: workout.imageUris,
                }));

                // 상태 업데이트
                setWorkoutList(workoutEntries);
            } else {
                console.error('데이터를 불러오지 못했습니다.');
            }
        } catch (error) {
            console.error('운동 데이터를 가져오는데 실패했습니다.', error);
        }
    };

    // 컴포넌트가 처음 렌더링될 때 한 번만 데이터를 가져오기
    useEffect(() => {
        fetchWorkoutData(); // 데이터를 가져오는 함수 호출
    }, []); // 빈 배열을 전달하면 한 번만 실행됨

    const goToCalendarUpdate = (date: string) => {
        updateSelectedDate(moment(date).toDate()); // Date 객체로 변환 후 selectedDate 업데이트
        navigate('/calendar/detail');
    };

    // 일지 목록 최근 날짜 기준으로 5개만 보여주는 함수
    const getRecentEntries = (entries: Entry[]) => {
        const sortedEntries = entries.sort((a, b) => moment(b.date).isBefore(moment(a.date)) ? -1 : 1);
        return sortedEntries.slice(0, 5); // 5개만 표시
    };

    // 긴 내용을 잘라서 표시하는 함수
    const sliceContent = (content: string) =>
        content.length > 50 ? content.slice(0, 50) + "..." : content;

    // 일지 목록 출력하는 함수
    const renderEntries = (entries: Entry[]) => (
        getRecentEntries(entries).map((entry, index) => (
            <div
                key={index}
                className="calendar-detail-item"
                onMouseDown={handleMouseDown}
                onMouseUp={() => handleMouseUp(() => goToCalendarUpdate(entry.date))}
                onMouseMove={handleMouseMove}
                tabIndex={0}
                role="button"
            >
                <div className="calendar-detail-header">
                    {entry.images && entry.images.length > 0 && (
                        <img src={entry.images[0]} alt="Entry Thumbnail" className="entry-thumbnail" />
                    )}
                    <div className="calendar-detail-text">
                        <p><strong>작성 날짜:</strong> {moment(entry.date).format('YYYY-MM-DD')}</p>
                        <p><strong>제목:</strong> {entry.title}</p>
                        <p><strong>일지 내용:</strong> {sliceContent(entry.diaryContent)}</p>
                    </div>
                </div>
            </div>
        ))
    );

    return (
        <div className="right-back">
            <div className="calendar-detail-cell">
                <h3>작성된 운동 세부사항</h3>
                {workoutList.length > 0 ? (
                    renderEntries(workoutList)
                ) : (
                    <p>세부사항이 없습니다. <br /> 날짜를 클릭하여 기록을 해보세유</p>
                )}
            </div>
        </div>
    );
};

export default CustomCalendarDetail;
