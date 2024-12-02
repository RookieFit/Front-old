import './communityFloatingButtons.css'

interface CommunityFloatingButtonsProps {
    onWritePost: () => void;
    onSearch: () => void;
}

function CommunityFloatingButtons({ onWritePost, onSearch }: CommunityFloatingButtonsProps) {
    // 상단으로 스크롤
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="community-floating-buttons">
            <button onClick={scrollToTop} className="community-floating-up-button"></button>
            <button onClick={onWritePost} className="community-floating-plus-button"></button>
            <button onClick={onSearch} className="community-floating-search-button"></button>
        </div>
    );
}

export default CommunityFloatingButtons;