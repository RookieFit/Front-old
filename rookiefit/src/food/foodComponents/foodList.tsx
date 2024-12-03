import React, { useState, useEffect } from "react";
import { useFoodContext } from "../foodContext";
import "./foodList.css";
import FoodSearchBar from "./foodSearchBar";
import FoodSearchResult from "./foodSearchResult";
import { GetDietDataRequest } from "../../apis/api/dietApi";
import { GetDietDataResponseDto } from "../../apis/response/diet";

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
    const [searchResult, setSearchResult] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filteredEntries, setFilteredEntries] = useState<GetDietDataResponseDto[]>([]);
    const [selectedFood, setSelectedFood] = useState<GetDietDataResponseDto | null>(null);

    // 검색어 디바운싱 처리 (350ms 지연 후 검색어 반영)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchResult);
        }, 350);

        return () => clearTimeout(timeoutId); // 컴포넌트 언마운트 시 타이머 클리어
    }, [searchResult]);

    // 검색어를 기반으로 API 호출
    useEffect(() => {
        if (!debouncedSearch) {
            setFilteredEntries([]); // 검색어가 없으면 결과 초기화
            return;
        }

        const fetchDietData = async () => {
            try {
                const response = await GetDietDataRequest(debouncedSearch);
                console.log("API 호출 응답:", response.data); // 응답 데이터 확인
                setFilteredEntries(response.data || []);
            } catch (error) {
                console.error("음식 검색 중 오류 발생:", error);
                setFilteredEntries([]);
            }
        };

        fetchDietData();
    }, [debouncedSearch]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchResult);
        }, 350);

        return () => clearTimeout(timeoutId); // 컴포넌트 언마운트 시 타이머 클리어
    }, [searchResult]);

    useEffect(() => {
        console.log("디바운스 후 검색어:", debouncedSearch); // 디바운싱된 검색어 출력
    }, [debouncedSearch]);

    const toggleEditMode = () => setIsEditing(prev => !prev);

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleAddFood = () => {
        if (selectedFood) {
            // GetDietDataResponseDto를 Entry로 변환
            const foodEntry: Entry = {
                foodName: selectedFood.foodName, // GetDietDataResponseDto에서 적절한 필드로 변경
                cal: selectedFood.enerc, // GetDietDataResponseDto에서 적절한 필드로 변경
                chobo: selectedFood.chocdf, // GetDietDataResponseDto에서 적절한 필드로 변경
                prot: selectedFood.prot, // GetDietDataResponseDto에서 적절한 필드로 변경
                fat: selectedFood.fatce, // GetDietDataResponseDto에서 적절한 필드로 변경
            };

            setFoodDetails({
                entries: [...foodDetails.entries, foodEntry] // Entry[] 타입에 foodEntry를 추가
            });

            setSelectedFood(null);
        }
    };

    const handleSearchChange = (term: string) => {
        setSearchResult(term);
        setSelectedFood(null); // 검색어 변경 시 선택된 음식 초기화
        console.log("검색어 변경:", term); // 여기서 검색어가 잘 바뀌는지 확인
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
                        <button onClick={toggleEditMode} className="food-list-complete-button">
                            완료
                        </button>
                        <button onClick={handleCancelEdit} className="food-list-cancel-button">
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
