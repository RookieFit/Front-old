import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './marketSearch.css';
import '../community/communitySearch/communitySearch.css'

const MarketSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/market/searchresult?search=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <form className="market-search" onSubmit={handleSearch}>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button"></button>
            </div>
        </form>
    );
};

export default MarketSearch;