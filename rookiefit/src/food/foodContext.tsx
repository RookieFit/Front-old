import React, { createContext, useState, ReactNode, useContext } from "react";

// 다이어트 항목 타입 정의
export interface DietDetail {
    food_name: string;
    food_first_category: string;
    chocdf: number;
    prot: number;
    fatce: number;
    enerc: number;
}

// Context의 타입 정의
interface FoodContextType {
    foodDetails: { entries: DietDetail[] };  // entries로 변경
    setFoodDetails: React.Dispatch<React.SetStateAction<{ entries: DietDetail[] }>>;
}

// 기본값으로 빈 값 설정
const FoodContext = createContext<FoodContextType | undefined>(undefined);

// FoodProvider 컴포넌트 생성
export const FoodProvider = ({ children }: { children: ReactNode }) => {
    const [foodDetails, setFoodDetails] = useState<{ entries: DietDetail[] }>({
        entries: [], // 빈 배열로 초기화
    });

    return (
        <FoodContext.Provider value={{ foodDetails, setFoodDetails }}>
            {children}
        </FoodContext.Provider>
    );
};

// Context를 사용하는 커스텀 훅
export const useFoodContext = () => {
    const context = useContext(FoodContext);
    if (!context) {
        throw new Error("useFoodContext must be used within a FoodProvider");
    }
    return context;
};
