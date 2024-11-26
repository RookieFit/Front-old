import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunitySearch.css';

const CommunitySearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('전체');
    const navigate = useNavigate();

    // e의 타입을 명시적으로 지정
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/community/searchresult?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`);
    };

    return (
        <form className="community-search" onSubmit={handleSearch}>
            <div className="search-bar">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="category-select"
                >
                    <option value="전체">전체</option>
                    <option value="고민">고민</option>
                    <option value="정보">정보</option>
                    <option value="친목">친목</option>
                </select>
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

export default CommunitySearch;