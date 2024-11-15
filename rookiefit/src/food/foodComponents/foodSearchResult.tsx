import React from "react";
import { Entry } from "./foodList"; // Entry 타입 가져오기
import './foodSearchResult.css';

interface SearchResultsProps {
    filteredEntries: Entry[];
    isEditing: boolean;
    selectedItems: string[];
    handleFoodClick: (food: Entry) => void;
    handleSelectItem: (foodName: string) => void;
    selectedFood: Entry | null;
    handleAddFood: () => void; // '추가하기' 버튼 클릭 시 처리할 함수 추가
}

const FoodSearchResultsProps = ({
    filteredEntries,
    isEditing,
    selectedItems,
    handleFoodClick,
    handleSelectItem,
    selectedFood,
    handleAddFood, // '추가하기' 함수 받기
}: SearchResultsProps) => {
    return (
        <div>
            {selectedFood ? (
                <div className="food-search-result-detail">
                    <h3>{selectedFood.foodName}</h3>
                    <p>칼로리: {selectedFood.cal} kcal</p>
                    <p>탄수화물: {selectedFood.chobo} g</p>
                    <p>단백질: {selectedFood.prot} g</p>
                    <p>지방: {selectedFood.fat} g</p>

                    {/* 상세 정보가 나올 때만 '추가하기' 버튼이 보이도록 */}
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
                filteredEntries.map((item, index) => (
                    <div
                        key={index}
                        className="food-search-result-food-item"
                        onClick={() => handleFoodClick(item)}
                    >
                        {isEditing && (
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.foodName)}
                                onChange={() => handleSelectItem(item.foodName)}
                            />
                        )}
                        {item.foodName}
                    </div>
                ))
            ) : (
                <div className="food-search-result-no-results">검색 결과가 없습니다.</div>
            )}
        </div>
    );
};

export default FoodSearchResultsProps;
