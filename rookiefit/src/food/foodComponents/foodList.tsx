import React, { useState, useEffect } from "react";
import { DietDetails, useFoodContext } from "../foodContext";
import { GetDietDataResponseDto } from "../../apis/response/diet";
import FoodSearchBar from "./foodSearchBar";
import FoodSearchResult from "./foodSearchResult";
import "./foodList.css";
import { fetchDietDataDetail, fetchDietDataRequest, addFoodToDiet, deleteFoodFromDiet, } from "../service/dietService";

const FoodList = () => {
    const { foodDetails, setFoodDetails, selectedDate } = useFoodContext();
    const [isEditing, setIsEditing] = useState(false);
    const [searchResult, setSearchResult] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filteredEntries, setFilteredEntries] = useState<GetDietDataResponseDto[]>([]);
    const [selectedFood, setSelectedFood] = useState<GetDietDataResponseDto | null>(null);

    // 디바운싱 처리
    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedSearch(searchResult), 500);
        return () => clearTimeout(timeoutId);
    }, [searchResult]);

    // 선택된 날짜에 맞는 음식 데이터를 서버에서 가져오기
    useEffect(() => {
        const fetchFoodDetails = async () => {
            const data = await fetchDietDataDetail(selectedDate);
            setFoodDetails({ entries: data });
        };

        fetchFoodDetails();
    }, [selectedDate, setFoodDetails]);

    // 음식 추가 처리
    const handleAddFood = async () => {
        if (selectedFood) {
            try {
                const newDietDetail: DietDetails = {
                    food_name: selectedFood.foodName,
                    food_first_category: selectedFood.foodFirstCategory || "",
                    chocdf: selectedFood.chocdf || 0,
                    prot: selectedFood.prot || 0,
                    fatce: selectedFood.fatce || 0,
                    enerc: selectedFood.enerc || 0,
                };

                // 음식 추가
                await addFoodToDiet(selectedDate, [...foodDetails.entries, newDietDetail]);

                const updatedFoodDetails = await fetchDietDataDetail(selectedDate);
                setFoodDetails({ entries: updatedFoodDetails });

                // 초기화
                setSelectedFood(null);
                setSearchResult("");
                setDebouncedSearch("");
            } catch (error) {
                console.error("음식 추가 실패:", error);
            }
        }
    };

    // API 호출 및 검색 결과 처리
    useEffect(() => {
        const fetchDietData = async () => {
            if (!debouncedSearch) {
                setFilteredEntries([]);
                return;
            }
            try {
                const response = await fetchDietDataRequest(debouncedSearch);
                setFilteredEntries(response);
            } catch (error) {
                console.error("음식 검색 중 오류 발생:", error);
                setFilteredEntries([]);
            }
        };

        fetchDietData();
    }, [debouncedSearch]);

    // 수정 모드 토글
    const toggleEditMode = () => setIsEditing((prev) => !prev);
    const handleCancelEdit = () => setIsEditing(false);


    // 뒤로가기 핸들러 추가
    const handleBack = () => {
        setSelectedFood(null);
        setSearchResult("");
        setDebouncedSearch("");
    };

    // 음식 삭제 처리
    const handleDeleteFood = async (id: number) => {
        try {
            // 음식 삭제
            await deleteFoodFromDiet(id);
            // 상태 업데이트 (삭제 후 바로 반영)
            setFoodDetails((prevState) => ({
                entries: prevState.entries.filter((item) => item.userDietDetailId !== id),
            }));
        } catch (error) {
            console.error("음식 삭제 실패:", error);
        }
    };

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
            <FoodSearchBar onSearch={handleSearchChange} searchTerm={searchResult} />
            <div className="food-list-eat-today">
                {debouncedSearch ? (
                    <FoodSearchResult
                        filteredEntries={filteredEntries}
                        handleFoodClick={setSelectedFood}
                        selectedFood={selectedFood}
                        handleAddFood={handleAddFood}
                        handleBack={handleBack} // 뒤로가기 핸들러 추가
                        searchQuery={searchResult}
                    />
                ) : (
                    <div className="food-list-items">
                        {foodDetails.entries.length > 0 ? (
                            foodDetails.entries.map((food, index) => (
                                <div key={index} className="food-item">
                                    <div className="food-item-left">
                                        <div className="food-item-name">{food.food_name}</div>
                                        <div className="food-item-calories">칼로리: {food.enerc}kcal</div>
                                    </div>
                                    {isEditing && (
                                        <div className="delete-button-wrapper">
                                            <button
                                                onClick={() =>
                                                    handleDeleteFood(food.userDietDetailId as number)
                                                }
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
