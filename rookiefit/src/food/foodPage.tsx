import FoodList from "./foodList";
import FoodResult from "./foodResult";
import FoodSearchBar from "./foodSearchBar";
import './foodPage.css'

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