import React, { useState } from 'react';
import './CommunitySearch.css'; // 스타일 파일 import

const CommunitySearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('전체');

    const handleSearch = () => {
        console.log(`검색어: ${searchTerm}, 카테고리: ${category}`);
        // 검색 로직 구현
    };

    return (
        <div className="community-search">
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
                <button onClick={handleSearch} className="search-button">
                </button>
            </div>
        </div>
    );
};

export default CommunitySearch;
