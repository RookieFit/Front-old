import { SetStateAction, useState } from 'react';
import './communityList.css';
import CommunityHeader from '../communityComponents/communityHeader';

const CommunityList = () => {
    const subjectItems = ['바프', '운동 고민', '일상 고민', '정보', '친목'];
    const [isOpen, setIsOpen] = useState(false);
    const [placeholder, setPlaceholder] = useState("검색어를 입력하세요"); // 초기 placeholder 설정
    const [selectedFilter, setSelectedFilter] = useState("검색 필터"); // 선택된 필터 텍스트 상태

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleFocus = () => {
        setPlaceholder(""); // 포커스 시 placeholder 삭제
    };

    const handleBlur = () => {
        setPlaceholder("검색어를 입력하세요"); // 포커스 벗어나면 placeholder 복원
    };

    const handleFilterSelect = (subjectItems: SetStateAction<string>) => {
        setSelectedFilter(subjectItems); // 필터 선택 시 해당 아이템 텍스트로 설정
        setIsOpen(false); // 드롭다운 닫기
    };

    return (
        <div id="community-list-wrapper">
            <CommunityHeader
                title="커뮤니티"
                content="모든 헬스인들을 위한 커뮤니티"
            />
            <div className="search-wrapper">
                <div className="dropdown">
                    <div onClick={toggleDropdown} className="search-filter">
                        {selectedFilter} {/* 선택된 필터 텍스트 출력 */}
                    </div>
                    <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                        {subjectItems.map((item, index) => (
                            <div
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleFilterSelect(item)} // 아이템 선택 시 동작
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                <input
                    type="text"
                    placeholder={placeholder} // placeholder 상태에 따라 변경
                    className="search-input"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    );
};

export default CommunityList;
