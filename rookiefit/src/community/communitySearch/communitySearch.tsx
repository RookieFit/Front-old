import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunitySearch.css';

const CommunitySearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMethod, setSearchMethod] = useState('제목'); // 기본값을 '제목'으로 설정
    const navigate = useNavigate();

    // 검색 조건에 맞춰 URL로 전달되는 검색 파라미터를 동적으로 설정
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // searchMethod에 따라 URL 쿼리 파라미터를 다르게 처리
        let searchQuery;
        switch (searchMethod) {
            case '제목':
                searchQuery = `title=${encodeURIComponent(searchTerm)}`;
                break;
            case '작성자':
                searchQuery = `author=${encodeURIComponent(searchTerm)}`;
                break;
            case '글내용':
                searchQuery = `content=${encodeURIComponent(searchTerm)}`;
                break;
            case '제목+작성자+글내용':
                searchQuery = `title=${encodeURIComponent(searchTerm)}&author=${encodeURIComponent(searchTerm)}&content=${encodeURIComponent(searchTerm)}`;
                break;
            default:
                searchQuery = `title=${encodeURIComponent(searchTerm)}`;
                break;
        }

        // 검색 결과 페이지로 이동
        navigate(`/community/searchresult?${searchQuery}&method=${encodeURIComponent(searchMethod)}`);
    };

    return (
        <form className="community-search" onSubmit={handleSearch}>
            <div className="search-bar">
                <select
                    value={searchMethod}
                    onChange={(e) => setSearchMethod(e.target.value)}
                    className="search-method-select"
                >
                    <option value="제목">제목</option>
                    <option value="작성자">작성자</option>
                    <option value="글내용">글내용</option>
                    <option value="제목+작성자+글내용">전체</option>
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