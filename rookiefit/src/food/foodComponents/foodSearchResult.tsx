import React from "react";
import { GetDietDataResponseDto } from "../../apis/response/diet";
import "./foodSearchResult.css";

interface FoodSearchResultProps {
    filteredEntries: GetDietDataResponseDto[];
    handleFoodClick: (food: GetDietDataResponseDto) => void;
    selectedFood: GetDietDataResponseDto | null;
    handleAddFood: () => void;
}

const FoodSearchResult = ({
    filteredEntries,
    handleFoodClick,
    selectedFood,
    handleAddFood,
}: FoodSearchResultProps) => {

    return (
        <div>
            {selectedFood ? (
                <div className="food-search-result-detail">
                    <h3>{selectedFood.foodName}</h3>
                    <p>칼로리: {selectedFood.enerc} kcal</p>
                    <p>탄수화물: {selectedFood.chocdf} g</p>
                    <p>단백질: {selectedFood.prot} g</p>
                    <p>지방: {selectedFood.fatce} g</p>

                    {/* 선택된 음식에 대해 "추가하기" 버튼 표시 */}
                    <div className="food-search-result-add-food-button-container">
                        <button
                            onClick={handleAddFood}
                            className="food-search-result-add-food-button"
                        >
                            추가하기
                        </button>
                    </div>
                </div>
            ) : filteredEntries.length > 0 ? (
                filteredEntries.map((food, index) => (
                    <div
                        key={index}
                        className="food-search-result-food-item"
                        onClick={() => handleFoodClick(food)}
                    >
                        <div className="food-item-left">
                            <div className="food-item-name">{food.foodName}</div>
                            <div className="food-item-calories">{food.enerc} kcal</div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="food-search-result-no-results">검색 결과가 없습니다.</div>
            )}
        </div>
    );
};

export default FoodSearchResult;
