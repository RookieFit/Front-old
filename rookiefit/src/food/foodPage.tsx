import FoodList from "./foodList";
import FoodResult from "./foodResult";
import FoodSearchBar from "./foodSearchBar";
import './foodPage.css'
//TODO: 식단페이지 섹션 나누고 검색창 들어갈 자리 추가
const FoodPage = () => {
    return (
        <div className="food-section">
            <FoodSearchBar />
            <div className="left-right-page">
                <FoodResult />
                <FoodList />
            </div >
        </div>
    );
}

export default FoodPage;