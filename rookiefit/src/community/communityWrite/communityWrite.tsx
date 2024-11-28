import { SetStateAction, useRef, useState } from "react";
import CommunityHeader from "../communityComponents/communityHeader";
import './communityWrite.css';
import { useNavigate } from "react-router-dom";

const CommunityWrite = () => {
    const menuItems = ['전체', '바프', '고민', '정보' , '친목', '공지'];
    const [isClick, setIsClick] = useState(false); // 선택된 필터 텍스트 상태
    const [isSelectedDropDown, setSelectedDropDown] = useState("게시판 종류");

    // title placeholder 상태
    const [isCommunityWriteTitlePlaceholder, setCommunityWriteTitlePlaceholder] = useState("입력하세요");
    const handleCommunityWriteTitleFocus = () => {
        setCommunityWriteTitlePlaceholder("");
    };
    const handleCommunityWriteTitleBlur = () => {
        setCommunityWriteTitlePlaceholder("제목을 입력하세요");
    };

    // detail placeholder 상태
    const [isCommunityWriteDetailPlaceholder, setCommunityWriteDetailePlaceholder] = useState("입력하세요");
    const handleCommunityWriteDetailFocus = () => {
        setCommunityWriteDetailePlaceholder("");
    };
    const handleCommunityWriteDetailBlur = () => {
        setCommunityWriteDetailePlaceholder("내용을 입력하세요");
    };

    //위치 이동
    const navigate = useNavigate();
    const communityList = () => {
        navigate('/communityList')
    };

    // 드롭다운 열기/닫기 토글 함수
    const clickDropdown = () => {
        setIsClick(!isClick); // 현재 상태의 반대로 설정
    };
    // 드롭다운에서 항목을 선택했을 때 필터 상태 업데이트
    const handleDropDownSelect = (menuItems: SetStateAction<string>) => {
        setSelectedDropDown(menuItems); // 필터 선택 시 해당 아이템 텍스트로 설정
        setIsClick(false); // 드롭다운 닫기
    };

    //파일 업로드 관련
    const inputEl = useRef(null);
    
    return (
        <div className="write-top-box">
            <CommunityHeader
                title="커뮤니티"
                content="다마코치의 커뮤니티 공간입니다."
            />
            <div className="community-write-inbox">
                <div className="community-write-title-box">
                    <div className="community-write-dropdown-area">
                        {/* 드롭다운 필터 버튼 */}
                        <div onClick={clickDropdown} className="community-write-drop-box">
                            {isSelectedDropDown} {/* 선택된 필터 텍스트 출력 */}
                        </div>
                        {/* 드롭다운 메뉴 (열리면 'open' 클래스 추가) */}
                        <div className={`dropdown-write-menu ${isClick ? 'on' : ''}`}>
                            {/* 드롭다운 항목 출력 */}
                            {menuItems.map((box, index) => (
                                <div
                                    key={index}
                                    className="drop-down-write-item"
                                    onClick={() => handleDropDownSelect(box)} // 아이템 선택 시 동작
                                >
                                    {box}
                                </div>
                            ))}
                        </div>
                    </div>
                    <input
                        type="text"
                        className="community-write-title"
                        onFocus={handleCommunityWriteTitleFocus}
                        onBlur={handleCommunityWriteTitleBlur}
                        placeholder={isCommunityWriteTitlePlaceholder}
                    />
                </div>
                <input
                    type="text"
                    className="community-write-detail"
                    onFocus={handleCommunityWriteDetailFocus}
                    onBlur={handleCommunityWriteDetailBlur}
                    placeholder={isCommunityWriteDetailPlaceholder}
                />
                <div className="community-write-under">
                    <section className="community-write-file-upload">
                        <input
                            type="file"
                            className="community-write-file-button"
                            accept='image/*'
                            ref={inputEl}
                        />
                    </section>
                    <input
                        type="button"
                        className="community-write-upload-contents"
                        value="등록하기"
                        onClick={communityList}
                    />
                </div>
            </div>
        </div>
    );
};

export default CommunityWrite;