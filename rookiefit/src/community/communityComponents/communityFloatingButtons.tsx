import { useNavigate } from 'react-router-dom';

interface CommunityFloatingButtonsProps {
    onScrollToTop: () => void;
}

function CommunityFloatingButtons({ onScrollToTop }: CommunityFloatingButtonsProps) {
    const navigate = useNavigate();

    const handleWritePost = () => {
        navigate('/community/write');
    };

    const handleSearch = () => {
        navigate('/community/search');
    };

    return (
        <div className="community-floating-buttons">
            <button onClick={onScrollToTop} className="community-floating-up-button"></button>
            <button onClick={handleWritePost} className="community-floating-plus-button"></button>
            <button onClick={handleSearch} className="community-floating-search-button"></button>
        </div>
    );
}

export default CommunityFloatingButtons;
