// calendarDetailContext.ts
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WorkoutDetails {
    workoutDetailCreatedDate: string;
    workout_name: string;
    reps: number;
    sets: number;
    rest_time: string;
}

export interface Entry {
    title: string;
    diaryContent: string;
    workoutDetails?: WorkoutDetails[];
    date: string;
    images?: string[];
}

interface CalendarDetailsContextProps {
    details: { entries: Entry[] };
    setDetails: React.Dispatch<React.SetStateAction<{ entries: Entry[] }>>;
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

export const useCalendarDetails = () => {
    const context = useContext(CalendarDetailsContext);
    if (!context) throw new Error('CalendarDetailsProvider가 필요합니다.');
    return context;
};
