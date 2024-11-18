import React, { useState } from 'react';
import './communitySearchbar.css';

interface CommunitySearchBarProps {
    onSearch: (query: string) => void; // 검색 실행 함수
}

const CommunitySearchBar = ({ onSearch }: CommunitySearchBarProps) => {
    const [tempQuery, setTempQuery] = useState(''); // 임시 입력 상태

    // 엔터 키 입력을 처리하는 함수
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tempQuery.trim()) {
            onSearch(tempQuery.trim()); // 검색 실행
        }
    };

    // 검색 버튼 클릭 시 실행
    const handleSearchClick = () => {
        if (tempQuery.trim()) {
            onSearch(tempQuery.trim()); // 검색 실행
        }
    };

    return (
        <div className="community-search-wrapper">
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="community-search-input"
                value={tempQuery} // 임시 입력 상태
                onChange={(e) => setTempQuery(e.target.value)} // 입력 상태 업데이트
                onKeyDown={handleKeyPress} // 엔터 키 이벤트 처리
            />
            <button
                className="community-search-button"
                onClick={handleSearchClick} // 버튼 클릭 시 검색
                disabled={!tempQuery.trim()} // 입력값이 없으면 버튼 비활성화
            >
            </button>
        </div>
    );
};

export default CommunitySearchBar;
