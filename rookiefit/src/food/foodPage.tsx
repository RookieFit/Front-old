import React, { useState } from "react";
import FoodList from "./foodComponents/foodList";
import FoodChart from "./foodComponents/foodChart";
import FoodSearchBar from "./foodComponents/foodSearchBar";
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
        entries: [
            { foodName: "바나나", cal: 105, chobo: 27, prot: 1, fat: 0.3 },
            { foodName: "허쉬 쿠키앤크림", cal: 1165, chobo: 0, prot: 31, fat: 3.6 },
            // 더미 데이터
        ],
    });

    return (
        <div className="food-section">
            <FoodSearchBar />
            <div className="left-right-page">
                <FoodChart foodDetails={foodDetails} />
                <FoodList foodDetails={foodDetails} />
            </div>
        </div>
    );
};

export default FoodPage;
