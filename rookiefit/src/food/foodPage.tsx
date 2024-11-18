import React from "react";
import { FoodProvider } from "./foodContext";  // FoodProvider 임포트
import FoodList from "./foodComponents/foodList";
import FoodChart from "./foodComponents/foodChart";
import './foodPage.css';

const FoodPage = () => {
    return (
        <FoodProvider>
            <div className="food-section">
                <div className="left-right-page">
                    <FoodChart />
                    <FoodList />
                </div>
            </div>
        </FoodProvider>
    );
};

export default FoodPage;
