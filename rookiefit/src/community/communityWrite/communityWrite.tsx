import { useState } from "react";
import CommunityHeader from "../communityComponents/communityHeader";
import './communityWrite.css';

const [ismenu, setIssMenu] = useState(false);
const toggleMenu = () => {
    setIssMenu(ismenu => !ismenu);
}
const menu = ['오운완', '질문', '일상'];

export const CommunityWrite = () => {
    return (
        <div className="writetopbox">
            <CommunityHeader />
            <div className="writebottonbox">
                <div className="writetile">
                    <input
                    type="button"
                    onClick={()=>toggleMenu()}
                    placeholder="검색 필터"
                    value={menu}>
                    </input>
                    제목을 입력해주세요 </div>
                <div className="writedetail"> 내용을 입력해주세요</div>
                <div className="writeunder"> 파일 업로드 등록하기 </div>
            </div>
        </div>
    )
}
export default CommunityWrite;
