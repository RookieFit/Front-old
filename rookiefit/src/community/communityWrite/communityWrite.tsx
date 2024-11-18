import { useRef, useState } from "react";
import CommunityHeader from "../communityComponents/communityHeader";
import './communityWrite.css';

const menuItems = ['바프', '운동고민', '일상 고민', '정보', '친목', '전체'];
//드롭박스
const CommunityWrite = () => {
    const [isDropdownView, setDropdownView] = useState(false);
    const [isSelectedMenu, setIsSelectedMenu] = useState("말머리");

    const handleToggleDropdown = () => {
        setDropdownView(!isDropdownView);
    };
    const handleWriteBlur = () => {
        setTimeout(() => {
            setDropdownView(false);
        }, 200);
    };
    const handleMenuSelect = (item: string) => {
        setIsSelectedMenu(item);
        setDropdownView(false);
    };
    //내용 없애기
    const [isCommunityWriteTitleClicked, setIsCommunityWriteTitleClicked] = useState(false);
    const [isCommunityWriteDetailClicked, setIsCommunityWriteDetailClicked] = useState(false);

    return (
        <div className="write-top-box">
            <CommunityHeader title="커뮤니티" content="다마코치의 커뮤니티 공간입니다." />
            <div className="community-write-inbox">
                <div className="community-write-title-box">
                    <div>
                        <button type="button"
                            onClick={handleToggleDropdown}
                            onBlur={handleWriteBlur}
                            className="community-write-title-drop">
                            {isSelectedMenu}
                        </button>
                        {isDropdownView && (
                            <ul className="drop-down-write-menu">
                                {menuItems.map((item, index) => (
                                    <li key={index} onClick={() => handleMenuSelect(item)}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
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
                        placeholder="파일 업로드"
                    />
                    <input
                        type="button"
                        className="community-write-upload-contents"
                    />
                </div>
            </div>
        </div>
    );
};

export default CommunityWrite;