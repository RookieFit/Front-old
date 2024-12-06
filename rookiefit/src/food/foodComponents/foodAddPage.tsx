import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./foodAddPage.css";

const FoodAddPage = () => {
    const navigate = useNavigate();

    // 상태 관리: 사용자 입력 값
    const [foodName, setFoodName] = useState<string>("");
    const [calories, setCalories] = useState<number | string>("");
    const [carbs, setCarbs] = useState<number | string>("");
    const [protein, setProtein] = useState<number | string>("");
    const [fat, setFat] = useState<number | string>("");

    // 폼 제출 처리 함수
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 입력 값 검증
        if (!foodName || !calories || !carbs || !protein || !fat) {
            alert("모든 값을 입력해주세요.");
            return;
        }

        // 여기서 추가된 음식 데이터를 서버로 전송하거나 로컬 상태에 저장할 수 있습니다.
        const newFood = {
            foodName,
            calories: Number(calories),
            carbs: Number(carbs),
            protein: Number(protein),
            fat: Number(fat),
        };

        // 예시: 음식 추가 후 목록 페이지로 이동
        console.log("새로운 음식 추가:", newFood);
        // 음식 추가 후 목록 페이지로 이동 (예시)
        navigate("/food-list");
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
