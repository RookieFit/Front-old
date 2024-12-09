import React from "react";
import { GetDietDataResponseDto } from "../../apis/response/diet";
import "./foodSearchResult.css";
import { useNavigate } from "react-router-dom";

interface FoodSearchResultProps {
    filteredEntries: GetDietDataResponseDto[];
    handleFoodClick: (food: GetDietDataResponseDto) => void;
    selectedFood: GetDietDataResponseDto | null;
    handleAddFood: () => void;
    handleBack: () => void;
    searchQuery: string; // 검색어 추가
}

const FoodSearchResult = ({
    filteredEntries,
    handleFoodClick,
    selectedFood,
    handleAddFood,
    handleBack,
    searchQuery, // 검색어를 받아옴
}: FoodSearchResultProps) => {
    const navigate = useNavigate();

    // 한글 포함 여부 체크 함수
    const containsKorean = (text: string) => /[가-힣]/.test(text);

    // 정렬 함수: 검색어와의 연관성 및 한글 포함 여부에 따라 정렬
    const sortByRelevance = (entries: GetDietDataResponseDto[], query: string) => {
        return entries.slice().sort((a, b) => {
            const aContainsKorean = containsKorean(a.foodName);
            const bContainsKorean = containsKorean(b.foodName);

            // 1. 한글 포함 항목 우선
            if (aContainsKorean && !bContainsKorean) return -1;
            if (!aContainsKorean && bContainsKorean) return 1;

            // 2. 검색어로 시작하는 항목 우선
            const aStartsWithQuery = a.foodName.startsWith(query);
            const bStartsWithQuery = b.foodName.startsWith(query);

            if (aStartsWithQuery && !bStartsWithQuery) return -1;
            if (!aStartsWithQuery && bStartsWithQuery) return 1;

            // 3. 검색어 포함 여부
            const aIncludesQuery = a.foodName.includes(query);
            const bIncludesQuery = b.foodName.includes(query);

            if (aIncludesQuery && !bIncludesQuery) return -1;
            if (!aIncludesQuery && bIncludesQuery) return 1;

            // 4. 기본 사전순 정렬
            return a.foodName.localeCompare(b.foodName, "ko", { sensitivity: "base" });
        });
    };

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
                sortByRelevance(filteredEntries, searchQuery).map((food, index) => (
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
                        onClick={() => navigate("/food/add", { state: { searchFoodName: searchQuery } })}
                    >
                        직접 입력하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default FoodSearchResult;
