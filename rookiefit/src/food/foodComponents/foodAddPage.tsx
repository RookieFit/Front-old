import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./foodAddPage.css";
import { InputFoodInfoRequestDto } from "../../apis/request/diet";
import { InputFoodInfoRequest } from "../../apis/api/dietApi";

const FoodAddPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { searchFoodName } = location.state || {};

    // 상태 관리: 사용자 입력 값
    const [foodName, setFoodName] = useState<string>(searchFoodName);
    const [calories, setCalories] = useState<number | string>("");
    const [carbs, setCarbs] = useState<number | string>("");
    const [protein, setProtein] = useState<number | string>("");
    const [fat, setFat] = useState<number | string>("");

    // 폼 제출 처리 함수
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 입력 값 검증
        if (!foodName || !calories || !carbs || !protein || !fat) {
            alert("모든 값을 입력해주세요.");
            return;
        }

        // API 호출을 위한 데이터 변환
        const newFood: InputFoodInfoRequestDto = {
            food_name: foodName,
            chocdf: Number(carbs),
            prot: Number(protein),
            fatce: Number(fat),
            enerc: Number(calories),
        };

        try {
            // API 호출
            await InputFoodInfoRequest(newFood);
            alert("음식 정보가 성공적으로 추가되었습니다.");
            navigate("/diet"); // 성공 시 목록 페이지로 이동
        } catch (error) {
            alert("음식 정보를 추가하는 도중 문제가 발생했습니다.");
        }
    };

    return (
        <div className="food-add-page">
            <h2>음식 추가하기</h2>
            <form onSubmit={handleSubmit} className="food-add-form">
                <div className="form-group">
                    <label htmlFor="foodName">음식 이름</label>
                    <input
                        type="text"
                        id="foodName"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="calories">칼로리 (kcal)</label>
                    <input
                        type="number"
                        id="calories"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="carbs">탄수화물 (g)</label>
                    <input
                        type="number"
                        id="carbs"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="protein">단백질 (g)</label>
                    <input
                        type="number"
                        id="protein"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fat">지방 (g)</label>
                    <input
                        type="number"
                        id="fat"
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="food-add-submit-button">
                    음식 추가
                </button>
            </form>
        </div>
    );
};

export default FoodAddPage;
