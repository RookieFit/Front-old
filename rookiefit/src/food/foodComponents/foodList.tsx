import React, { useState, useEffect } from "react";
import './foodList.css';
import FoodSearchBar from "./foodSearchBar";
import FoodSearchResultsProps from "./foodSearchResult"; // FoodSearchResultsProps 임포트

export interface Entry {
    foodName: string;
    cal: number;
    chobo: number;
    prot: number;
    fat: number;
}

interface FoodListProps {
    foodDetails: { entries: Entry[] };
    setFoodDetails: React.Dispatch<React.SetStateAction<{ entries: Entry[] }>>;
}

const FoodList = ({ foodDetails, setFoodDetails }: FoodListProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [searchResult, setSearchResult] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedFood, setSelectedFood] = useState<Entry | null>(null);

    // Debouncing search input
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchResult); // Reflect search input after 500ms
        }, 500); // 500ms delay

        return () => clearTimeout(timeoutId); // Clean up timeout when component unmounts
    }, [searchResult]);

    const toggleEditMode = () => setIsEditing(!isEditing);

    const handleSelectItem = (foodName: string) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(foodName)
                ? prevSelected.filter((name) => name !== foodName)
                : [...prevSelected, foodName]
        );
    };

    const handleDeleteSelected = () => {
        const updatedEntries = foodDetails.entries.filter(
            (item) => !selectedItems.includes(item.foodName)
        );
        setFoodDetails({ entries: updatedEntries });
        setSelectedItems([]);
        setIsEditing(false);
    };

    const filteredEntries = foodDetails.entries.filter((item) =>
        item.foodName.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    const handleFoodClick = (food: Entry) => {
        setSelectedFood(food);
    };

    // Update search term and reset selectedFood when search changes
    const handleSearchChange = (term: string) => {
        setSearchResult(term);
        setSelectedFood(null);  // Reset selected food when search term changes
    };

    // '추가하기' 버튼 클릭 시 처리
    const handleAddFood = () => {
        if (selectedItems.length > 0) {
            const newFoodItems = foodDetails.entries.filter((entry) =>
                selectedItems.includes(entry.foodName)
            );
            // 원하는 로직을 추가하여 foodDetails에 항목을 추가
            setFoodDetails({ entries: [...foodDetails.entries, ...newFoodItems] });
            setSelectedItems([]);  // 추가 후 선택된 항목 초기화
        }
    };

    return (
        <div className="right-back">
            <div className="food-list-header">
                <div className="food-list-main">
                    {debouncedSearch ? `${debouncedSearch} 검색 결과` : "오늘 먹은 음식 목록"}
                </div>
                {/* 검색어가 있으면 수정하기 버튼이 보이지 않도록 */}
                <button
                    onClick={toggleEditMode}
                    className={`food-list-update ${!debouncedSearch ? "visible" : ""}`}
                >
                    {isEditing ? "완료" : "수정하기"}
                </button>
            </div>
            <hr />
            <FoodSearchBar
                onSearch={handleSearchChange}
            />
            <div className="food-list-eat-today">
                <FoodSearchResultsProps
                    filteredEntries={filteredEntries}
                    isEditing={isEditing}
                    selectedItems={selectedItems}
                    handleFoodClick={handleFoodClick}
                    handleSelectItem={handleSelectItem}
                    selectedFood={selectedFood}
                    handleAddFood={handleAddFood}  // handleAddFood 함수 전달
                />
            </div>
            {isEditing && (
                <div className="delete-button-wrapper">
                    <button onClick={handleDeleteSelected} className="delete-button">
                        삭제하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default FoodList;
