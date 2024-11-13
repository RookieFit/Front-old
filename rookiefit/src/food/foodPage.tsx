import FoodList from "./foodComponents/foodList";
import FoodResult from "./foodComponents/foodResult";
import FoodSearchBar from "./foodComponents/foodSearchBar";
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