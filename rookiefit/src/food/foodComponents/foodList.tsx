import React, { useState, useEffect } from "react";
import { useFoodContext } from "../foodContext";
import "./foodList.css";
import FoodSearchBar from "./foodSearchBar";
import FoodSearchResult from "./foodSearchResult";
import { GetDietDataRequest } from "../../apis/api/dietApi"; // API 요청 함수
import { GetDietDataResponseDto } from "../../apis/response/diet"; // 리스폰스 타입

export interface Entry {
    foodName: string;
    cal: number;
    chobo: number;
    prot: number;
    fat: number;
}

const FoodList = () => {
    const { foodDetails, setFoodDetails } = useFoodContext();
    const [isEditing, setIsEditing] = useState(false);
    const [searchResult, setSearchResult] = useState(""); // 검색어
    const [debouncedSearch, setDebouncedSearch] = useState(""); // 디바운싱된 검색어
    const [filteredEntries, setFilteredEntries] = useState<GetDietDataResponseDto[]>([]); // 검색된 음식 리스트
    const [selectedFood, setSelectedFood] = useState<GetDietDataResponseDto | null>(null); // 선택된 음식

    // 디바운싱 처리
    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedSearch(searchResult), 350);
        return () => clearTimeout(timeoutId);
    }, [searchResult]);

    // API 호출 및 검색 결과 처리
    useEffect(() => {
        const fetchDietData = async () => {
            if (!debouncedSearch) {
                setFilteredEntries([]);
                return;
            }
            try {
                const response = await GetDietDataRequest(debouncedSearch);
                setFilteredEntries(response); // 항상 배열로 설정
            } catch (error) {
                console.error("음식 검색 중 오류 발생:", error);
                setFilteredEntries([]);
            }
        };

        fetchDietData();
    }, [debouncedSearch]);

    // 수정 모드 토글
    const toggleEditMode = () => setIsEditing(prev => !prev);
    const handleCancelEdit = () => setIsEditing(false);

    // 음식 추가 처리
    const handleAddFood = () => {
        if (selectedFood) {
            const foodEntry: Entry = {
                foodName: selectedFood.foodName,
                cal: selectedFood.enerc,
                chobo: selectedFood.chocdf,
                prot: selectedFood.prot,
                fat: selectedFood.fatce,
            };

            setFoodDetails({
                entries: [...foodDetails.entries, foodEntry],
            });

            setSelectedFood(null);
        }
    };

    // 검색어 변경 처리
    const handleSearchChange = (term: string) => {
        setSearchResult(term);
        setSelectedFood(null);
    };

    return (
        <div className="right-back">
            <div className="food-list-header">
                <div className="food-list-main">
                    {debouncedSearch ? `${debouncedSearch} 검색 결과` : "오늘 먹은 음식 목록"}
                </div>
                {!isEditing ? (
                    <button onClick={toggleEditMode} className="food-list-update">
                        수정하기
                    </button>
                ) : (
                    <div className="food-list-edit-buttons">
                        <button onClick={toggleEditMode}>완료</button>
                        <button onClick={handleCancelEdit}>취소</button>
                    </div>
                )}
            </div>
            <FoodSearchBar onSearch={handleSearchChange} />
            <div className="food-list-eat-today">
                {debouncedSearch ? (
                    <FoodSearchResult
                        filteredEntries={filteredEntries}
                        handleFoodClick={setSelectedFood}
                        selectedFood={selectedFood}
                        handleAddFood={handleAddFood}
                    />
                ) : (
                    <div className="food-list-items">
                        {foodDetails.entries.length > 0 ? (
                            foodDetails.entries.map((foodItem, index) => (
                                <div key={index} className="food-item">
                                    <div className="food-item-left">
                                        <div className="food-item-name">{foodItem.foodName}</div>
                                        <div className="food-item-calories">칼로리: {foodItem.cal}kcal</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-list-message">
                                <p>목록이 비어 있습니다.</p>
                                <p>음식을 추가해주세요!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodList;
