import React from "react";
import { Entry } from "./foodList"; // Entry 타입 임포트
import './foodSearchResult.css';

interface SearchResultProps {
    filteredEntries: Entry[]; // 필터링된 음식 목록
    handleFoodClick: (food: Entry) => void; // 음식 항목 클릭 시 호출되는 함수
    selectedFood: Entry | null; // 선택된 음식
    handleAddFood: () => void; // "추가하기" 버튼 클릭 시 호출되는 함수
}

const FoodSearchResult = ({
    filteredEntries,
    handleFoodClick,
    selectedFood,
    handleAddFood,
}: SearchResultProps) => {
    return (
        <div>
            {selectedFood ? (
                <div className="food-search-result-detail">
                    <h3>{selectedFood.foodName}</h3>
                    <p>칼로리: {selectedFood.cal} kcal</p>
                    <p>탄수화물: {selectedFood.chobo} g</p>
                    <p>단백질: {selectedFood.prot} g</p>
                    <p>지방: {selectedFood.fat} g</p>

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
                filteredEntries.map((item) => (
                    <div
                        key={item.foodName} // 음식 이름을 고유 키로 사용
                        className="food-search-result-food-item"
                        onClick={() => handleFoodClick(item)} // 클릭 시 상세보기
                    >
                        {item.foodName}
                    </div>
                ))
            ) : (
                <div className="food-search-result-no-results">검색 결과가 없습니다.</div>
            )}
        </div>
    );
};

export default FoodSearchResult;
