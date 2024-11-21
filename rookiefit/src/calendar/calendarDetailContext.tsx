import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Entry {
    title: string;
    diaryContent: string;
    workoutDetails: string[][];
    date: string;
    image?: string | null; // 이미지 경로 또는 null일 수 있음
}

interface CalendarDetailsContextProps {
    details: { entries: Array<Entry> };
    setDetails: React.Dispatch<React.SetStateAction<{ entries: Array<Entry> }>>;
}

const CalendarDetailsContext = createContext<CalendarDetailsContextProps | undefined>(undefined);

export const CalendarDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [details, setDetails] = useState<{ entries: Array<Entry> }>({ entries: [] });

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
