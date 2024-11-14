// 필요한 모듈 import
import './communityHeader.css';

interface Props {
    title: string;   // 커뮤니티 제목
    content: string; // 커뮤니티 설명
}

function CommunityHeader({ title, content }: Props) {

    return (
        <div className="community-wrapper">
            <h1 className="community-title">{title}</h1> {/* title을 props에서 사용 */}
            <h2 className="community-introduction">{content}</h2> {/* content를 props에서 사용 */}
        </div>
    );
}

export default CommunityHeader;
