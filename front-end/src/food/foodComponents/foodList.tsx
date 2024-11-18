import './foodList.css';

const FoodList = () => {
    return (
        <div className="right-back">
            <div className="food-list-header">
                <div className="food-list-main">오늘 먹은 음식 목록</div>
                <div className="food-list-update">수정하기</div>
            </div>
            <hr />
            <div className="food-list-eat-today">음식목록</div>
        </div>
    );
}

export default FoodList;
