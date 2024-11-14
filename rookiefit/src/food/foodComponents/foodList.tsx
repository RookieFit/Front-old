import React, { useState } from "react";
import './foodList.css';

interface Entry {
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

    // 편집 모드 토글
    const toggleEditMode = () => setIsEditing(!isEditing);

    // 항목 선택
    const handleSelectItem = (foodName: string) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(foodName)
                ? prevSelected.filter((name) => name !== foodName)
                : [...prevSelected, foodName]
        );
    };

    // 선택된 항목 삭제
    const handleDeleteSelected = () => {
        const updatedEntries = foodDetails.entries.filter(
            (item) => !selectedItems.includes(item.foodName)
        );
        setFoodDetails({ entries: updatedEntries });
        setSelectedItems([]); // 선택 목록 초기화
        setIsEditing(false); // 편집 모드 종료
    };

    return (
        <div className="right-back">
            <div className="food-list-header">
                <div className="food-list-main">오늘 먹은 음식 목록</div>
                <button onClick={toggleEditMode} className="food-list-update">
                    {isEditing ? "완료" : "수정하기"}
                </button>
            </div>
            <hr />
            <div className="food-list-eat-today">
                {foodDetails.entries.map((item, index) => (
                    <div key={index} className="food-item">
                        {isEditing && (
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.foodName)}
                                onChange={() => handleSelectItem(item.foodName)}
                            />
                        )}
                        {item.foodName}
                    </div>
                ))}
            </div>
            {isEditing && (
                <button onClick={handleDeleteSelected} className="delete-button">
                    삭제하기
                </button>
            )}
        </div>
    );
};

export default FoodList;
