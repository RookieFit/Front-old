import React, { useState, useEffect } from "react";
import { useFoodContext } from "../foodContext";  // useFoodContext 임포트
import './foodList.css';
import FoodSearchBar from "./foodSearchBar";
import FoodSearchResult from "./foodSearchResult";

// Entry 타입 정의
export interface Entry {
    foodName: string;
    cal: number;
    chobo: number;
    prot: number;
    fat: number;
}

const FoodList = () => {
    const { foodDetails, setFoodDetails } = useFoodContext();  // context에서 foodDetails와 setFoodDetails 사용
    const [isEditing, setIsEditing] = useState(false);  // 수정 모드 상태
    const [selectedItems, setSelectedItems] = useState<string[]>([]);  // 선택된 음식 목록
    const [searchResult, setSearchResult] = useState("");  // 검색어 상태
    const [debouncedSearch, setDebouncedSearch] = useState("");  // 디바운스된 검색어 상태
    const [selectedFood, setSelectedFood] = useState<Entry | null>(null);  // 클릭된 음식 정보

    // 검색어 디바운스 처리
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchResult);
        }, 200);

        return () => clearTimeout(timeoutId);  // 클린업 함수로 타임아웃 취소
    }, [searchResult]);

    // 수정 모드 토글 함수
    const toggleEditMode = () => setIsEditing(!isEditing);

    // 음식 항목 삭제 함수
    const handleDeleteFood = (foodName: string) => {
        const updatedEntries = foodDetails.entries.filter(
            (item) => item.foodName !== foodName
        );
        setFoodDetails({ entries: updatedEntries });
    };

    // 검색 결과에 맞게 음식 목록 필터링
    const filteredEntries = foodDetails.entries.filter((item) =>
        item.foodName.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    // 음식 항목 클릭 시 선택된 음식 정보 설정
    const handleFoodClick = (food: Entry) => {
        setSelectedFood(food);
    };

    // 검색어 변경 처리
    const handleSearchChange = (term: string) => {
        setSearchResult(term);
        setSelectedFood(null);  // 검색어가 바뀌면 선택된 음식 초기화
    };

    // 선택된 음식 추가 함수
    const handleAddFood = () => {
        if (selectedItems.length > 0) {
            const newFoodItems = foodDetails.entries.filter((entry) =>
                selectedItems.includes(entry.foodName)
            );
            setFoodDetails({ entries: [...foodDetails.entries, ...newFoodItems] });
            setSelectedItems([]);  // 추가 후 선택 항목 초기화
        }
    };

    return (
        <div className="right-back">
            <div className="food-list-header">
                <div className="food-list-main">
                    {debouncedSearch ? `${debouncedSearch} 검색 결과` : "오늘 먹은 음식 목록"}
                </div>
                <button
                    onClick={toggleEditMode}
                    className={`food-list-update ${!debouncedSearch ? "visible" : ""}`}
                >
                    {isEditing ? "완료" : "수정하기"}
                </button>
            </div>
            <FoodSearchBar onSearch={handleSearchChange} />
            <div className="food-list-eat-today">
                {debouncedSearch ? (
                    <FoodSearchResult
                        filteredEntries={filteredEntries}
                        handleFoodClick={handleFoodClick}
                        selectedFood={selectedFood}
                        handleAddFood={handleAddFood}
                    />
                ) : (
                    <div className="food-list-items">
                        {foodDetails.entries.map((foodItem, index) => (
                            <div key={index} className="food-item">
                                <div className="food-item-left">
                                    <div className="food-item-name">{foodItem.foodName}</div>
                                    <div className="food-item-calories">칼로리: {foodItem.cal}kcal</div>
                                </div>
                                {isEditing && (
                                    <div className="delete-button-wrapper">
                                        <button
                                            onClick={() => handleDeleteFood(foodItem.foodName)}
                                            className="delete-button"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodList;
