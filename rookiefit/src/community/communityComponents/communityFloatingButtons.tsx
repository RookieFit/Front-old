import './communityFloatingButtons.css'

interface CommunityFloatingButtonsProps {
    onScrollToTop: () => void;
    onWritePost: () => void;
    onSearch: () => void;
}

function CommunityFloatingButtons({ onScrollToTop, onWritePost, onSearch }: CommunityFloatingButtonsProps) {
    return (
        <div className="community-floating-buttons">
            <button onClick={onScrollToTop} className="community-floating-up-button"></button>
            <button onClick={onWritePost} className="community-floating-plus-button"></button>
            <button onClick={onSearch} className="community-floating-search-button"></button>
        </div>
    );
}

export default CommunityFloatingButtons;