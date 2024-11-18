import React, { createContext, useState, ReactNode, useContext } from "react";

// 음식 항목 타입 정의
export interface Entry {
    foodName: string;
    cal: number;
    chobo: number;
    prot: number;
    fat: number;
}

// Context의 타입 정의
interface FoodContextType {
    foodDetails: { entries: Entry[] };
    setFoodDetails: React.Dispatch<React.SetStateAction<{ entries: Entry[] }>>;
}

// 기본값으로 빈 값 설정
const FoodContext = createContext<FoodContextType | undefined>(undefined);

// FoodProvider 컴포넌트 생성
export const FoodProvider = ({ children }: { children: ReactNode }) => {
    const [foodDetails, setFoodDetails] = useState<{ entries: Entry[] }>({
        // 더미 데이터
        entries: [
            { foodName: "바나나", cal: 105, chobo: 27, prot: 1, fat: 0.3 },
            { foodName: "허쉬 쿠키앤크림", cal: 1165, chobo: 0, prot: 31, fat: 3.6 },
            { foodName: "아이스 바나나 라떼", cal: 215, chobo: 47, prot: 32, fat: 113 },
            { foodName: "바나나맛 우유", cal: 135, chobo: 12, prot: 3, fat: 24 },
            { foodName: "오징어 튀김", cal: 345, chobo: 12, prot: 17, fat: 0.22 },
            { foodName: "계란 튀김", cal: 175, chobo: 52, prot: 13, fat: 66 },
            { foodName: "김말이 튀김", cal: 205, chobo: 56, prot: 27, fat: 42 },
        ],
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
