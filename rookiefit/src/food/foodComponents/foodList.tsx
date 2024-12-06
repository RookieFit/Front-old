import React, { useState, useEffect } from "react";
import { DietDetail, useFoodContext } from "../foodContext";
import "./foodList.css";
import FoodSearchBar from "./foodSearchBar";
import FoodSearchResult from "./foodSearchResult";
import { GetDietDataRequest } from "../../apis/api/dietApi";
import { GetDietDataResponseDto } from "../../apis/response/diet";
import { InputUserDietListRequest } from "../../apis/api/dietApi";
import { GetDietDataDetailRequest } from "../../apis/api/dietApi";
import { InputUserDietListRequestDto } from "../../apis/request/diet";

const FoodList = () => {
    const { addFoodDetail, selectedDate } = useFoodContext();
    const [isEditing, setIsEditing] = useState(false);
    const [searchResult, setSearchResult] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filteredEntries, setFilteredEntries] = useState<GetDietDataResponseDto[]>([]);
    const [selectedFood, setSelectedFood] = useState<GetDietDataResponseDto | null>(null);
    const [foodDetails, setFoodDetails] = useState<DietDetail[]>([]);

    // 디바운싱 처리
    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedSearch(searchResult), 350);
        return () => clearTimeout(timeoutId);
    }, [searchResult]);

    // 선택된 날짜에 맞는 음식 데이터를 서버에서 가져오기
    useEffect(() => {
        const fetchFoodDetails = async () => {
            const response = await GetDietDataDetailRequest(selectedDate);
            console.log("GetDietDataDetailRequest 응답 데이터:", response);

            if (response && response.length > 0) {
                const dietDetails = response[0].dietDetails;
                const data = dietDetails.map((item: any) => ({
                    food_name: item.foodName,
                    enerc: item.enerc,
                    food_first_category: item.food_First_category || "",  // 기본값 처리
                    chocdf: item.chocdf || 0,  // 기본값 처리
                    prot: item.prot || 0,      // 기본값 처리
                    fatce: item.fatce || 0,    // 기본값 처리
                }));
                setFoodDetails(data);

            } else {
                setFoodDetails([]);
            }
        };

        fetchFoodDetails();
    }, [selectedDate]);

    // API 호출 및 검색 결과 처리
    useEffect(() => {
        const fetchDietData = async () => {
            if (!debouncedSearch) {
                setFilteredEntries([]);
                return;
            }
            try {
                const response = await GetDietDataRequest(debouncedSearch);
                console.log("검색 결과:", response);
                setFilteredEntries(response);
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
    // selectedFood가 변경될 때마다 확인
    useEffect(() => {
        console.log("selectedFood:", selectedFood);
    }, [selectedFood]);

    // 뒤로가기 핸들러 추가
    const handleBack = () => {
        setSelectedFood(null);
        setSearchResult("");
        setDebouncedSearch("");
    };

    // 음식 추가 처리
    const handleAddFood = async () => {
        if (selectedFood) {
            try {
                const newDietDetail: DietDetail = {
                    food_name: selectedFood?.foodName || '',
                    food_first_category: selectedFood?.food_first_category || '', // null인 경우 빈 문자열로 처리
                    chocdf: selectedFood?.chocdf || 0,
                    prot: selectedFood?.prot || 0,
                    fatce: selectedFood?.fatce || 0,
                    enerc: selectedFood?.enerc || 0,
                };

                const updatedDietDetails: DietDetail[] = [...foodDetails, newDietDetail];

                const requestBody: InputUserDietListRequestDto = {
                    diet_created_date: selectedDate,
                    total_calories: updatedDietDetails.reduce((sum, item) => sum + item.enerc, 0),
                    dietDetails: updatedDietDetails,
                };

                console.log("Request Body:", requestBody);

                const response = await InputUserDietListRequest(requestBody);
                console.log("음식 추가 성공:", response);

                addFoodDetail(newDietDetail);
                setSelectedFood(null);

                // 검색창 초기화 및 debouncedSearch 비우기
                setSearchResult("");        // 검색어 초기화
                setDebouncedSearch("");     // 디바운싱된 검색어 초기화

            } catch (error) {
                console.error("음식 추가 실패:", error);
            }
        }
    };

    const handleDeleteFood = (foodName: string) => {
        setFoodDetails(foodDetails.filter(item => item.food_name !== foodName));
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
                        handleBack={handleBack}  // 뒤로가기 핸들러 추가
                    />
                ) : (
                    <div className="food-list-items">
                        {foodDetails.length > 0 ? (
                            foodDetails.map((food, index) => (
                                <div key={index} className="food-item">
                                    <div className="food-item-left">
                                        <div className="food-item-name">{food.food_name}</div>
                                        <div className="food-item-calories">칼로리: {food.enerc}kcal</div>
                                    </div>
                                    {isEditing && (
                                        <div className="delete-button-wrapper">
                                            <button
                                                onClick={() => handleDeleteFood(food.food_name)}
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
