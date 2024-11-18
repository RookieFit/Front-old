import { SetStateAction, useState } from 'react'; // useState를 사용하기 위한 import
import './communityList.css'; // 스타일시트 불러오기
import CommunityHeader from '../communityComponents/communityHeader'; // 커뮤니티 헤더 컴포넌트 불러오기

const CommunityList = () => {
    // 주제 목록 (필터링 가능한 항목들)
    const subjectItems = ['전체', '바프', '운동 고민', '일상 고민', '정보', '친목'];
    // 드롭다운 메뉴 상태 관리 (열림/닫힘)
    const [isOpen, setIsOpen] = useState(false);
    // 검색창 placeholder 상태
    const [placeholder, setPlaceholder] = useState("검색어를 입력하세요"); // 초기 placeholder 설정
    // 선택된 필터 상태
    const [selectedFilter, setSelectedFilter] = useState("검색 필터"); // 선택된 필터 텍스트 상태
    // 검색어 상태 추가
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 관리

    // 드롭다운 열기/닫기 토글 함수
    const toggleDropdown = () => {
        setIsOpen(!isOpen); // 현재 상태의 반대로 설정
    };

    // 검색창에 포커스가 들어갔을 때 placeholder 지우기
    const handleFocus = () => {
        setPlaceholder(""); // 포커스 시 placeholder 삭제
    };

    // 검색창에서 포커스가 벗어났을 때 placeholder 복원
    const handleBlur = () => {
        setPlaceholder("검색어를 입력하세요"); // 포커스 벗어나면 placeholder 복원
    };

    // 드롭다운에서 항목을 선택했을 때 필터 상태 업데이트
    const handleFilterSelect = (subjectItems: SetStateAction<string>) => {
        setSelectedFilter(subjectItems); // 필터 선택 시 해당 아이템 텍스트로 설정
        setIsOpen(false); // 드롭다운 닫기
    };

    // 검색 버튼 클릭 시 alert로 입력된 검색어 표시
    const handleSearchClick = () => {
        alert(selectedFilter + searchQuery); // 검색어가 포함된 alert 표시
    };

    return (
        <div id="community-list-wrapper">
            {/* 커뮤니티 헤더 표시 */}
            <CommunityHeader
                title="커뮤니티"
                content="모든 헬스인들을 위한 커뮤니티"
            />
            <div className="community-search-wrapper">
                <div className="community-dropdown">
                    {/* 드롭다운 필터 버튼 */}
                    <div onClick={toggleDropdown} className="community-search-filter">
                        {selectedFilter} {/* 선택된 필터 텍스트 출력 */}
                    </div>
                    {/* 드롭다운 메뉴 (열리면 'open' 클래스 추가) */}
                    <div className={`community-dropdown-menu ${isOpen ? 'open' : ''}`}>
                        {/* 드롭다운 항목 출력 */}
                        {subjectItems.map((item, index) => (
                            <div
                                key={index}
                                className="community-dropdown-item"
                                onClick={() => handleFilterSelect(item)} // 아이템 선택 시 동작
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
                {/* 검색창 (사용자가 검색어 입력 가능) */}
                <input
                    type="text"
                    placeholder={placeholder} // placeholder 상태에 따라 변경
                    className="community-search-input"
                    onFocus={handleFocus} // 포커스 시 placeholder 삭제
                    onBlur={handleBlur} // 포커스 벗어날 시 placeholder 복원
                    value={searchQuery} // 검색어 상태 값 설정
                    onChange={(e) => setSearchQuery(e.target.value)} // 검색어 입력 시 상태 업데이트
                />
                {/* 검색 버튼 (스타일만 적용됨, 동작은 구현되지 않음) */}
                <div className="community-search-button" onClick={handleSearchClick}></div> {/* 버튼 클릭 시 동작 */}
            </div>
        </div>
    );
};

export default CommunityList;
