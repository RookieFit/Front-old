import { useRef, useState } from "react";
import CommunityHeader from "../communityComponents/communityHeader";
import './communityWrite.css';

const menuItems = ['바프', '운동고민', '일상 고민', '정보', '친목', '전체'];
//드롭박스
const CommunityWrite = () => {
    const [isDropdownView, setDropdownView] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("말머리");

    const handletoggleDropdown = () => {
        setDropdownView(!isDropdownView);
    };
    const handlewriteBlur = () => {
        setTimeout(() => {
            setDropdownView(false);
        }, 200);
    };
    const handleMenuSelect = (item: string) => {
        setSelectedMenu(item);
        setDropdownView(false);
    };
    //내용 없애기
    const [isCommunityWriteTitleclicked, setIsCommunityWriteTitleclicked] = useState(false);
    const [isCommunitywriteDetailClicked, setIsCommunitywriteDetailClicked] = useState(false);

    return (
        <div className="writetopbox">
            <CommunityHeader title="커뮤니티" content="모든 헬스인들을 위한 커뮤니티" />
            <div className="communitywrite-inbox">
                <div className="communitywrite-title-box">
                    <div>
                        <button type="button"
                            onClick={handletoggleDropdown}
                            onBlur={handlewriteBlur}
                            className="communitywrite-title-drop">
                            {selectedMenu}
                        </button>
                        {/* 이건 나중에 고쳐볼께요 */}
                        {isDropdownView && (
                            <ul className="dropdownwrite-menu">
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
                        className="communitywri-title"
                        onFocus={() => setIsCommunityWriteTitleclicked(true)}
                        onBlur={() => setIsCommunityWriteTitleclicked(false)}
                        placeholder={isCommunityWriteTitleclicked === true ? "" : "입력하세요"}
                    />
                </div>
                <input
                    type="text"
                    className="communitywrite-detail"
                    onFocus={() => setIsCommunitywriteDetailClicked(true)}
                    onBlur={() => setIsCommunitywriteDetailClicked(false)}
                    placeholder={isCommunitywriteDetailClicked === true ? "" : "입력하세요"}
                />
                {/* 구현중임 */}
                <div className="communitywrite-under">
                    <input
                        type="button"
                        className="communitywrite-file-upload"
                        placeholder="파일 업로드"
                    />
                    <input
                        type="button"
                        className="communitywrite-upload-contents"
                    />
                </div>
            </div>
        </div>
    );
};

export default CommunityWrite;