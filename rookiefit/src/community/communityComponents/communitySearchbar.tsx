import './communitySearchbar.css';

interface CommunitySearchBarProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    onSearch: () => void;
}

const CommunitySearchBar = ({ searchQuery, setSearchQuery, onSearch }: CommunitySearchBarProps) => {
    // 검색 실행 함수
    const handleSearch = () => {
        // 검색어가 비어있지 않으면 검색 실행
        if (searchQuery.trim() !== "") {
            onSearch();
        }
    };

    return (
        <div className="community-search-wrapper">
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="community-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // 입력만 처리, 검색 실행 X
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // 엔터 키를 눌러야만 검색 실행
            />
            <button className="community-search-button" onClick={handleSearch} />
        </div>
    );
};

export default CommunitySearchBar;
