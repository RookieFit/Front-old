import React, { createContext, useState, ReactNode, useContext } from "react";

// 다이어트 항목 타입 정의
export interface DietDetails {
    userDietDetailId?: number | null; // 'null'도 허용
    food_name: string;
    food_first_category: string;
    chocdf: number;
    prot: number;
    fatce: number;
    enerc: number;
}

// Context의 타입 정의
interface FoodContextType {
    foodDetails: { entries: DietDetails[] };
    setFoodDetails: React.Dispatch<React.SetStateAction<{ entries: DietDetails[] }>>;
    addFoodDetail: (newDetail: DietDetails) => void;
    clearFoodDetails: () => void;
    selectedDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

// 기본값으로 빈 값 설정
const FoodContext = createContext<FoodContextType | undefined>(undefined);

// 응답받은 음식 데이터를 여기에 저장?
export const FoodProvider = ({ children }: { children: ReactNode }) => {
    const [foodDetails, setFoodDetails] = useState<{ entries: DietDetails[] }>({
        entries: [], // 빈 배열로 초기화
    });
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

    const addFoodDetail = (newDetail: DietDetails) => {
        setFoodDetails((prevState) => ({
            entries: [...prevState.entries, newDetail],
        }));
    };

    const clearFoodDetails = () => {
        setFoodDetails({ entries: [] });
    };

    return (
        <FoodContext.Provider
            value={{
                foodDetails,
                setFoodDetails,
                addFoodDetail,
                clearFoodDetails,
                selectedDate,
                setSelectedDate,
            }}
        >
            {children}
        </FoodContext.Provider>
    );
};

export const useFoodContext = () => {
    const context = useContext(FoodContext);
    if (!context) {
        throw new Error("useFoodContext must be used within a FoodProvider");
    }
    return context;
};
