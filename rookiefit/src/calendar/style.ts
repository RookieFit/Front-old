import styled from "@emotion/styled";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// 캘린더를 감싸주는 스타일
export const StyledCalendarWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 80%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 3% 5%;
    background-color: white;
  }
    /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }
`
// 캘린더를 불러옴
export const StyledCalendar = styled(Calendar)`
`;