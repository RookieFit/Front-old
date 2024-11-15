import React from 'react';
import './foodSearchBar.css';

interface FoodSearchBarProps {
    onSearch: (term: string) => void;
}

const FoodSearchBar = ({ onSearch }: FoodSearchBarProps) => {
    return (
        <div className="food-searchbar-wrapper">
            <input
                className="food-searchbar"
                type="search"
                placeholder="음식 목록 추가"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}

export default FoodSearchBar;
