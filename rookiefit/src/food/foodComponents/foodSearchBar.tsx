import './foodSearchBar.css';

interface FoodSearchBarProps {
    onSearch: (term: string) => void;
    searchTerm: string;  // 추가된 props
}

const FoodSearchBar = ({ onSearch, searchTerm }: FoodSearchBarProps) => {
    return (
        <div className="food-searchbar-wrapper">
            <input
                className="food-searchbar"
                type="search"
                placeholder="음식 목록 추가"
                value={searchTerm}  // searchTerm을 value로 사용
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}
export default FoodSearchBar;

