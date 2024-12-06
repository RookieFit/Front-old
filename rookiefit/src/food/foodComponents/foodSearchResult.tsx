import React from "react";
import { GetDietDataResponseDto } from "../../apis/response/diet";
import "./foodSearchResult.css";
import { useNavigate } from "react-router-dom";

interface FoodSearchResultProps {
    filteredEntries: GetDietDataResponseDto[];
    handleFoodClick: (food: GetDietDataResponseDto) => void;
    selectedFood: GetDietDataResponseDto | null;
    handleAddFood: () => void;
    handleBack: () => void; // 뒤로가기 핸들러 추가
}

const FoodSearchResult = ({
    filteredEntries,
    handleFoodClick,
    selectedFood,
    handleAddFood,
    handleBack, // 여기서 handleBack을 받아옴
}: FoodSearchResultProps) => {
    const navigate = useNavigate(); // useNavigate 초기화

    return (
        <div>
            {selectedFood ? (
                <div className="food-search-result-detail">
                    <h3>{selectedFood.foodName}</h3>
                    <span style={{ fontSize: "15px", color: "#b0b0b0" }}>
                        (100g당 함량)
                    </span>
                    <p>칼로리: {selectedFood.enerc} kcal</p>
                    <p>탄수화물: {selectedFood.chocdf} g</p>
                    <p>단백질: {selectedFood.prot} g</p>
                    <p>지방: {selectedFood.fatce} g</p>
                    {/* 선택된 음식에 대해 "뒤로가기" 및 "추가하기" 버튼 표시 */}
                    <div className="food-search-result-add-food-button-container">
                        <button
                            onClick={handleBack}
                            className="food-search-result-back-button"
                        >
                            뒤로가기
                        </button>
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
                <div className="food-search-result-no-results">
                    <p>검색 결과가 없습니다.</p>
                    <button
                        className="food-add-button"
                        onClick={() => navigate("/food/add")}
                    >
                        직접 입력하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default FoodSearchResult;
