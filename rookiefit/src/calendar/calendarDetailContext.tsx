import React, { createContext, useContext, useState, ReactNode } from 'react';

// WorkoutDetails 타입 정의
interface WorkoutDetails {
    workoutDetailCreatedDate: string;
    workout_name: string;
    reps: number;
    sets: number;
    rest_time: string;
}

interface Entry {
    title: string;
    diaryContent: string;
    workoutDetails: WorkoutDetails[]; // 수정된 타입
    date: string;
    images?: string[]; // 여러 이미지 경로를 저장하는 배열
}

interface CalendarDetailsContextProps {
    details: { entries: Entry[] }; // Entry[]로 변경
    setDetails: React.Dispatch<React.SetStateAction<{ entries: Entry[] }>>; // Entry[]로 변경
}

const CalendarDetailsContext = createContext<CalendarDetailsContextProps | undefined>(undefined);

export const CalendarDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [details, setDetails] = useState<{ entries: Entry[] }>({ entries: [] });

    return (
        <CalendarDetailsContext.Provider value={{ details, setDetails }}>
            {children}
        </CalendarDetailsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendarDetails = () => {
    const context = useContext(CalendarDetailsContext);
    if (!context) throw new Error('NO CalendarDetailsProvide');
    return context;
};
