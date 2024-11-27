import styled from "@emotion/styled";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// 캘린더를 감싸주는 스타일
// StyledCalendarWrapper 수정
export const StyledCalendarWrapper = styled.div`
  .react-calendar { 
    margin: 0.8vw auto;
    width: 100%;
    max-width: 35vw;  /* 최대 크기 제한 */
    height: 32vw; /* 고정된 높이 */
    border: none;
    border-radius: 1rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 0.7vw 1vw;
    background-color: white;
    font-size: 1.1rem;
    line-height: 3.3rem; /* 텍스트 크기 조정 */
    display: flex;
    flex-direction: column;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: #000;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5vw;
  }

  .react-calendar__month-view__days__day {
    height: calc((100% - 4rem) / 6); /* 높이를 6주 기준으로 계산 */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .react-calendar__navigation {
    margin-bottom: 0.5rem;
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    background-color: #F05650;
    opacity: 0.6;
    color: #000;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 20px;
  }

  /* 선택된 날짜 */
  .react-calendar__tile--active {
    background-color: #77E4C8;
    color: #000;
    font-weight: bold;
    border-radius: 20px;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #77E4C8;
    opacity: 0.7;
    border-radius: 20px;
    color: #000;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1.5rem;
  }
`;

// 타일에 마커 스타일 추가
export const StyledDot = styled.div`
  background-color: #000;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
`;


// 캘린더를 불러옴
export const StyledCalendar = styled(Calendar)`
`;