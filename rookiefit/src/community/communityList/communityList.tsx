import CommunityHeader from '../communityComponents/communityHeader';  // CommunityHeader 임포트

const CommunityList = () => {
    return (
        <div>
            {/* CommunityHeader를 포함하고 필요한 props(title, content) 전달 */}
            <CommunityHeader
                title="커뮤니티"
                content="모든 헬스인들을 위한 커뮤니티"
            />
            {/* 추가적인 내용들 */}
            <div>communityList</div>
        </div>
    );
}

export default CommunityList;