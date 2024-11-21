import styled from "@emotion/styled";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// 캘린더를 감싸주는 스타일
export const StyledCalendarWrapper = styled.div`
  .react-calendar { 
    margin: 0.8vw auto;
    width: 100%;
    max-width: 35vw;  /* 최대 크기 제한 */
    border: none;
    border-radius: 1rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 0.7vw 1vw;
    background-color: white;
    font-size: 18px;
    line-height: 3.5vw;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: #000;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0.7vw;
    border-bottom: none;
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    background-color: #F05650;
    opacity: 0.6;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    border-radius: 20px;
  }

  /* 오늘 날짜에 마우스 오버 시 색상 변경 제거 */
  .react-calendar__tile--now:hover {
    background-color: #292929;
    color: #000;
  }

  /* 선택된 날짜의 배경색 변경 */
  .react-calendar__tile--active {
    background-color: #77E4C8;
    color: #000;
    font-weight: bold;
    border-radius: 20px;
  }

  .react-calendar__tile--hasActive {
    background: #77E4C8;
  }

  .react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus {
    background: #77E4C8;
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
`
// 캘린더를 불러옴
export const StyledCalendar = styled(Calendar)`
`;

export const StyledDot = styled.div`
  background-color: #000;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;