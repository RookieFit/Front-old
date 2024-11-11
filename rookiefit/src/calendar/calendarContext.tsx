import React, { createContext, useContext, useState, ReactNode } from 'react';

type CalendarContextType = {
    selectedDate: Date; // 선택된 날짜
    updateSelectedDate: (newDate: Date) => void; // 날짜 업데이트 함수
};

// CalendarContext 생성
const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const UseCalendar = (): CalendarContextType => {
    const context = useContext(CalendarContext);
    if (!context) throw new Error('useCalendar must be used within a CalendarProvider');
    return context; // context 값 반환
};

// CalendarProviderProps 타입 정의
interface CalendarProviderProps {
    children: ReactNode;
}

// CalendarProvider 컴포넌트: 날짜 상태를 자식에게 제공
export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // 날짜 업데이트 함수
    const updateSelectedDate = (newDate: Date) => setSelectedDate(newDate);

    return (
        <CalendarContext.Provider value={{ selectedDate, updateSelectedDate }}>
            {children}
        </CalendarContext.Provider>
    );
};
