import './foodSearchBar.css'

const FoodSearchBar = () => {
    return (
        <div className="food-searchbar">
            <input
                type="search"
                placeholder="검색"
                value=''
                onChange={ }
            />
        </div>
    );
}

export default FoodSearchBar;