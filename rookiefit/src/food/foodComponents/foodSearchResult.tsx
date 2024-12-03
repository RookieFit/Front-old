import React from "react";
import { GetDietDataResponseDto } from "../../apis/response/diet";
import "./foodSearchResult.css";

interface FoodSearchResultProps {
    filteredEntries: GetDietDataResponseDto[];
    handleFoodClick: (food: GetDietDataResponseDto) => void;
    selectedFood: GetDietDataResponseDto | null;
    handleAddFood: () => void;
}

const FoodSearchResult: React.FC<FoodSearchResultProps> = ({
    filteredEntries,
    handleFoodClick,
    selectedFood,
    handleAddFood,
}) => {
    return (
        <div className="food-search-result">
            {filteredEntries.length > 0 ? (
                filteredEntries.map((food, index) => (
                    <div
                        key={index}
                        className={`food-item ${selectedFood?.foodName === food.foodName ? "selected" : ""}`}
                        onClick={() => handleFoodClick(food)}
                    >
                        <div className="food-item-name">{food.foodName}</div>
                        <div className="food-item-calories">{food.enerc} kcal</div>
                    </div>
                ))
            ) : (
                <p className="no-results">검색 결과가 없습니다.</p>
            )}
            {selectedFood && (
                <button onClick={handleAddFood} className="add-food-button">
                    선택한 음식 추가
                </button>
            )}
        </div>
    );
};

export default FoodSearchResult;
