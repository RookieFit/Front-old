import React, { useEffect, useState, useCallback } from "react";
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
    const [visibleEntries, setVisibleEntries] = useState<GetDietDataResponseDto[]>([]);
    const [itemsToShow, setItemsToShow] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    // 초기 표시 데이터 설정
    useEffect(() => {
        // Reset visible entries when filteredEntries change
        setVisibleEntries(filteredEntries.slice(0, itemsToShow));
        setItemsToShow(5); // Reset items to show
    }, [filteredEntries]);

    // 스크롤 이벤트 핸들러
    const handleScroll = useCallback(() => {
        // Check if we're near the bottom of the page and not already loading
        if (
            window.innerHeight + document.documentElement.scrollTop + 100 >=
            document.documentElement.offsetHeight &&
            !isLoading &&
            visibleEntries.length < filteredEntries.length
        ) {
            loadMoreItems();
        }
    }, [visibleEntries, filteredEntries, isLoading]);

    // 추가 항목 로드
    const loadMoreItems = useCallback(() => {
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const newItemsToShow = Math.min(
                itemsToShow + 5,
                filteredEntries.length
            );

            setItemsToShow(newItemsToShow);
            setVisibleEntries(filteredEntries.slice(0, newItemsToShow));
            setIsLoading(false);
        }, 500); // 0.5초 지연
    }, [filteredEntries, itemsToShow]);

    // 스크롤 이벤트 등록
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <div>
            {selectedFood ? (
                <div className="food-search-result-detail">
                    <h3>{selectedFood.foodName}</h3>
                    <p>칼로리: {selectedFood.enerc} kcal</p>
                    <p>탄수화물: {selectedFood.chocdf} g</p>
                    <p>단백질: {selectedFood.prot} g</p>
                    <p>지방: {selectedFood.fatce} g</p>

                    <div className="food-search-result-add-food-button-container">
                        <button
                            onClick={handleAddFood}
                            className="food-search-result-add-food-button"
                        >
                            추가하기
                        </button>
                    </div>
                </div>
            ) : visibleEntries.length > 0 ? (
                <>
                    {visibleEntries.map((food, index) => (
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
                    ))}
                    {isLoading && (
                        <div className="loading-indicator">Loading...</div>
                    )}
                </>
            ) : (
                <div className="food-search-result-no-results">검색 결과가 없습니다.</div>
            )}
        </div>
    );
};

export default FoodSearchResult;