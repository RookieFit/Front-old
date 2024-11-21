import React, { useState, useEffect } from "react";
import { useFoodContext } from "../foodContext";
import './foodList.css';
import FoodSearchBar from "./foodSearchBar";
import FoodSearchResult from "./foodSearchResult";

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
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [searchResult, setSearchResult] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedFood, setSelectedFood] = useState<Entry | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchResult);
        }, 350);

        return () => clearTimeout(timeoutId);
    }, [searchResult]);

    const toggleEditMode = () => setIsEditing(!isEditing);

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedItems([]); // 선택된 항목 초기화
    };

    const handleDeleteFood = (foodName: string) => {
        const updatedEntries = foodDetails.entries.filter(
            (item) => item.foodName !== foodName
        );
        setFoodDetails({ entries: updatedEntries });
    };

    const filteredEntries = foodDetails.entries.filter((item) =>
        item.foodName.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const handleFoodClick = (food: Entry) => {
        setSelectedFood(food);
    };

    const handleSearchChange = (term: string) => {
        setSearchResult(term);
        setSelectedFood(null);
    };

    const handleAddFood = () => {
        if (selectedItems.length > 0) {
            const newFoodItems = foodDetails.entries.filter((entry) =>
                selectedItems.includes(entry.foodName)
            );
            setFoodDetails({ entries: [...foodDetails.entries, ...newFoodItems] });
            setSelectedItems([]); // 선택된 항목 초기화
        }
    };

    return (
        <div className="right-back">
            <div className="food-list-header">
                <div className="food-list-main">
                    {debouncedSearch ? `${debouncedSearch} 검색 결과` : "오늘 먹은 음식 목록"}
                </div>
                {!isEditing ? (
                    <button
                        onClick={toggleEditMode}
                        className={`food-list-update ${!debouncedSearch ? "visible" : ""}`}
                    >
                        수정하기
                    </button>
                ) : (
                    <div className="food-list-edit-buttons">
                        <button
                            onClick={toggleEditMode}
                            className="food-list-complete-button"
                        >
                            완료
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="food-list-cancel-button"
                        >
                            취소
                        </button>
                    </div>
                )}
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
                        {foodDetails.entries.length > 0 ? (
                            foodDetails.entries.map((foodItem, index) => (
                                <div key={index} className="food-item">
                                    <div className="food-item-left">
                                        <div className="food-item-name">{foodItem.foodName}</div>
                                        <div className="food-item-calories">칼로리: {foodItem.cal}kcal</div>
                                    </div>
                                    {isEditing && (
                                        <div className="delete-button-wrapper">
                                            <button
                                                onClick={() => handleDeleteFood(foodItem.foodName)}
                                                className="food-list-delete-button"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    )}
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
