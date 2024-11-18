import { SetStateAction, useRef, useState } from "react";
import CommunityHeader from "../communityComponents/communityHeader";
import './communityWrite.css';
import { useNavigate } from "react-router-dom";

const CommunityWrite = () => {

    const menuItems = ['바프', '운동고민', '일상 고민', '정보', '친목', '전체'];
    const [isClick, setIsClick] = useState(false);
    // 선택된 필터 텍스트 상태
    const [selectedFilter, setSelectedFilter] = useState("검색 필터"); 

    //내용 없애기
    const [isCommunityWriteTitleClicked, setIsCommunityWriteTitleClicked] = useState(false);
    const [isCommunityWriteDetailClicked, setIsCommunityWriteDetailClicked] = useState(false);

    //위치 이동
    const navigate = useNavigate();
    const communityList = () => {
        navigate('/communityList')
    };
    // 드롭다운 열기/닫기 토글 함수
    const toggleDropdown = () => {
        setIsClick(!isClick); // 현재 상태의 반대로 설정
    };
    // 드롭다운에서 항목을 선택했을 때 필터 상태 업데이트
    const handleFilterSelect = (menuItems: SetStateAction<string>) => {
        setSelectedFilter(menuItems); // 필터 선택 시 해당 아이템 텍스트로 설정
        setIsClick(false); // 드롭다운 닫기
    };

    return (
        <div className="write-top-box">
            <CommunityHeader
                title="커뮤니티"
                content="다마코치의 커뮤니티 공간입니다."
            />
            <div className="community-write-inbox">
                <div className="community-write-title-box">
                    {/* 드롭다운 필터 버튼 */}
                    <div onClick={toggleDropdown} className="community-write-title-drop">
                        {selectedFilter} {/* 선택된 필터 텍스트 출력 */}
                    </div>
                    {/* 드롭다운 메뉴 (열리면 'open' 클래스 추가) */}
                    <div className={`drop-down-write-menu ${isClick ? 'open' : ''}`}>
                        {/* 드롭다운 항목 출력 */}
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className="drop-down-write-item"
                                onClick={() => handleFilterSelect(item)} // 아이템 선택 시 동작
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        className="community-write-title"
                        onFocus={() => setIsCommunityWriteTitleClicked(true)}
                        onBlur={() => setIsCommunityWriteTitleClicked(false)}
                        placeholder={isCommunityWriteTitleClicked === true ? "" : "입력하세요"}
                    />
                </div>
                <input
                    type="text"
                    className="community-write-detail"
                    onFocus={() => setIsCommunityWriteDetailClicked(true)}
                    onBlur={() => setIsCommunityWriteDetailClicked(false)}
                    placeholder={isCommunityWriteDetailClicked === true ? "" : "입력하세요"}
                />
                <div className="community-write-under">
                    <input
                        type="button"
                        className="community-write-file-upload"
                        value="파일 업로드"
                    />

                    <input
                        type="text"
                        className="community-write-file-name"
                        placeholder="선택된 파일 없음"
                        disabled
                    />

                    <input
                        type="button"
                        className="community-write-upload-contents"
                        placeholder="등록하기"
                        value="등록하기"
                        onClick={communityList}
                    />
                </div>
            </div>

        </div>
    );
};

export default CommunityWrite;