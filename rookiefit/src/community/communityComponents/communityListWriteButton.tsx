import './communityListWriteButton.css'

// 버튼 클릭 시 호출할 함수 타입 정의
interface CommunityListWriteButtonProps {
    onClick?: () => void; // 클릭 시 실행될 함수
}

const CommunityListWriteButton = ({ onClick }: CommunityListWriteButtonProps) => {
    const handleClick = () => {
        // 버튼 클릭 시 default로 '글쓰기 버튼!' 알림
        alert('글쓰기 버튼!');
        if (onClick) {
            onClick(); // 부모 컴포넌트에서 전달된 onClick 함수 실행
        }
    };

    return (
        <button onClick={handleClick} className="community-list-write-button">
            글 작성
        </button>
    );
};

export default CommunityListWriteButton;
