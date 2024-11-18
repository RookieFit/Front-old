import './communitySearchbar.css';

interface CommunitySearchBarProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    onSearch: () => void;
}

const CommunitySearchBar = ({ searchQuery, setSearchQuery, onSearch }: CommunitySearchBarProps) => (
    <div className="community-search-wrapper">
        <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="community-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="community-search-button" onClick={onSearch} />
    </div>
);

export default CommunitySearchBar; 