import React, { useState } from "react";
import FoodList from "./foodComponents/foodList";
import FoodChart from "./foodComponents/foodChart";
import './foodPage.css';

interface Entry {
    foodName: string;
    cal: number;
    chobo: number;
    prot: number;
    fat: number;
}

const FoodPage = () => {
    const [foodDetails, setFoodDetails] = useState<{ entries: Entry[] }>({
        // 더미 데이터
        entries: [
            { foodName: "바나나", cal: 105, chobo: 27, prot: 1, fat: 0.3 },
            { foodName: "허쉬 쿠키앤크림", cal: 1165, chobo: 0, prot: 31, fat: 3.6 },
            { foodName: "아이스 바나나 라떼", cal: 215, chobo: 47, prot: 32, fat: 113 },
            { foodName: "바나나맛 우유", cal: 135, chobo: 12, prot: 3, fat: 24 },
            { foodName: "오징어 튀김", cal: 345, chobo: 12, prot: 17, fat: 0.22 },
        ],
    });

    return (
        <div className="food-section">
            <div className="left-right-page">
                <FoodChart foodDetails={foodDetails} />
                <FoodList foodDetails={foodDetails} setFoodDetails={setFoodDetails} />
            </div>
        </div>
    );
};

export default FoodPage;
