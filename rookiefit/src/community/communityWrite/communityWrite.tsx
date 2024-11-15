import { useRef, useState } from "react";
import CommunityHeader from "../communityComponents/communityHeader";
import './communityWrite.css';

const menuItems = ['바프', '운동고민', '일상 고민', '정보', '친목', '전체'];
//드롭박스
const CommunityWrite = () => {
    const [isDropdownView, setDropdownView] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("말머리");

    const toggleDropdown = () => {
        setDropdownView(!isDropdownView);
    };
    const handlewrieBlur = () => {
        setTimeout(() => {
            setDropdownView(false);
        }, 200);
    };
    const handleMenuSelect = (item: string) => {
        setSelectedMenu(item);
        setDropdownView(false);
    };
//내용 없애기
const [iscommunitywrititleclicked, setiscommunitywrititleclicked] = useState(false);
const [iscommunitywritedetailclicked, setiscommunitywritedetailclicked] = useState(false);

    return (
        <div className="writetopbox">
            <CommunityHeader title="커뮤니티" content="다마코치의 커뮤니티 공간입니다." />
            <div className="communitywriteinbox">
                <div className="communitywritetitlebox">
                    <div>
                        <button type="button"
                            onClick={toggleDropdown}
                            onBlur={handlewrieBlur}
                            className="communitywritetitledrop">
                            {selectedMenu}
                        </button>
                        {isDropdownView && (
                            <ul className="dropdownwritemenu">
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
                        className="communitywrititle"
                        onFocus={() => setiscommunitywrititleclicked(true)}
                        onBlur={() => setiscommunitywrititleclicked(false)}
                        placeholder={iscommunitywrititleclicked === true ? "" : "입력하세요"}
                    />
                </div>
                <input
                    type="text"
                    className="communitywritedetail"
                    onFocus={() => setiscommunitywritedetailclicked(true)}
                        onBlur={() => setiscommunitywritedetailclicked(false)}
                        placeholder={iscommunitywritedetailclicked === true ? "" : "입력하세요"}
                />
                <div className="communitywriteunder">
                    <input
                        type="button"
                        className="communitywritefileupload"
                        placeholder="파일 업로드"
                    />
                    <input
                        type="button"
                        className="communitywriteupcontentsload"
                    />
                </div>
            </div>
        </div>
    );
};

export default CommunityWrite;