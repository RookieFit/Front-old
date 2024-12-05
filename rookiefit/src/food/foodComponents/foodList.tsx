import React, { useState, useEffect } from "react";
import { DietDetail, useFoodContext } from "../foodContext";
import "./foodList.css";
import FoodSearchBar from "./foodSearchBar";
import FoodSearchResult from "./foodSearchResult";
import { GetDietDataRequest, InputUserDietListRequest } from "../../apis/api/dietApi";
import { GetDietDataDetailResponseDto, GetDietDataResponseDto } from "../../apis/response/diet";
import { getJwtToken } from "../../authCheck/storageUtils";
import { GetDietDataDetailRequest } from "../../apis/api/dietApi";
import { GetDietDataDetailRequestDto, InputUserDietListRequestDto } from "../../apis/request/diet";

const FoodList = () => {
    const token = getJwtToken();
    const { foodDetails, setFoodDetails, selectedDate } = useFoodContext();
    const [isEditing, setIsEditing] = useState(false);
    const [searchResult, setSearchResult] = useState(""); // 검색어
    const [debouncedSearch, setDebouncedSearch] = useState(""); // 디바운싱된 검색어
    const [filteredEntries, setFilteredEntries] = useState<GetDietDataResponseDto[]>([]); // 검색된 음식 리스트
    const [selectedFood, setSelectedFood] = useState<GetDietDataResponseDto | null>(null); // 선택된 음식
    const [dietData, setDietData] = useState<GetDietDataDetailResponseDto[]>([]);

    // 디바운싱 처리
    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedSearch(searchResult), 350);
        return () => clearTimeout(timeoutId);
    }, [searchResult]);

    // API 호출 및 검색 결과 처리
    useEffect(() => {
        const fetchDietData = async () => {
            if (!debouncedSearch) {
                setFilteredEntries([]); // 검색어가 없으면 필터링된 항목 초기화
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

    useEffect(() => {
        console.log("Selected Date in FoodList:", selectedDate); // selectedDate가 제대로 반영되는지 확인
        console.log("foodDetails.entries:", foodDetails.entries); // foodDetails.entries의 상태 확인
    }, [selectedDate, foodDetails.entries]);  // selectedDate나 foodDetails.entries가 변경될 때마다 확인

    // 선택된 날짜에 맞춰 식단 데이터를 가져오기
    // useEffect(() => {
    //     const fetchDietDetailData = async () => {
    //         if (token) {
    //             console.log("토큰:", token);  // 토큰 값 확인
    //             const requestBody: GetDietDataDetailRequestDto = {
    //                 token: token,
    //                 diet_created_date: selectedDate, // 선택된 날짜를 사용
    //             };
    //             try {
    //                 const response = await GetDietDataDetailRequest(requestBody);
    //                 console.log("식단 데이터:", response);  // API 응답 확인
    //                 if (Array.isArray(response)) {
    //                     setDietData(response);
    //                     setFoodDetails({ entries: response });
    //                 } else {
    //                     setDietData([]);
    //                     setFoodDetails({ entries: [] });
    //                 }
    //             } catch (error) {
    //                 console.error("식단 데이터 가져오기 중 오류 발생:", error);
    //             }
    //         } else {
    //             console.error("토큰이 없습니다!");  // 토큰 없을 때 로그
    //         }
    //     };

    //     fetchDietDetailData();
    // }, [token, selectedDate]);

    // 수정 모드 토글
    const toggleEditMode = () => setIsEditing(prev => !prev);
    const handleCancelEdit = () => setIsEditing(false);

    // 음식 추가 처리
    const handleAddFood = async () => {
        if (!selectedFood) return;

        const foodEntry: DietDetail = {
            food_name: selectedFood.foodName,
            food_first_category: "과자류·빵류 또는 떡류", // 카테고리 필요하면 수정
            chocdf: selectedFood.chocdf,
            prot: selectedFood.prot,
            fatce: selectedFood.fatce,
            enerc: selectedFood.enerc,
        };

        const updatedFoodDetails = {
            entries: [...foodDetails.entries, foodEntry],
        };

        setFoodDetails(updatedFoodDetails);

        console.log("추가된 음식:", updatedFoodDetails);
        const totalCalories = dietData.reduce((sum, foodItem) => {
            return sum + foodItem.dietDetails[0]?.enerc || 0;
        }, 0);

        console.log("Total Calories for selected date:", totalCalories);

        try {
            const requestBody: InputUserDietListRequestDto = {
                token: token,
                diet_created_date: selectedDate, // 선택된 날짜 사용
                total_calories: totalCalories,
                dietDetails: updatedFoodDetails.entries.map(entry => ({
                    food_name: entry.food_name,
                    food_first_category: "과자류·빵류 또는 떡류", // 카테고리 필요하면 수정
                    chocdf: entry.chocdf,
                    prot: entry.prot,
                    fatce: entry.fatce,
                    enerc: entry.enerc,
                })),
            };
            console.log("저장할 데이터:", requestBody);

            await InputUserDietListRequest(requestBody);
            console.log("음식 데이터가 성공적으로 저장되었습니다!");
        } catch (error) {
            console.error("음식 데이터를 저장하는 중 오류 발생:", error);
        }

        setSelectedFood(null);
    };

    // 음식 삭제 처리
    const handleDeleteFood = (foodName: string) => {
        setFoodDetails({
            entries: foodDetails.entries.filter(item => item.food_name !== foodName),
        });
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
                                        <div className="food-item-name">{foodItem.food_name}</div>
                                        <div className="food-item-calories">칼로리: {foodItem.enerc}kcal</div>
                                    </div>
                                    {isEditing && (
                                        <div className="delete-button-wrapper">
                                            <button
                                                onClick={() => handleDeleteFood(foodItem.food_name)}
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
