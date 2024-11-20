import { useNavigate } from 'react-router-dom';
import './communityCategories.css';

// Category 타입 정의 
export type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';

interface CommunityCategoriesProps {
    categories: Category[];
    activeCategory: Category;
    onCategoryClick: (category: Category) => void;
}

function CommunityCategories({ categories, activeCategory, onCategoryClick }: CommunityCategoriesProps) {
    const navigate = useNavigate();

    const CATEGORY_ROUTES = {
        전체: '/community',
        바프: '/community/bodyprofile',
        고민: '/community/concern',
        정보: '/community/information',
        친목: '/community/friendship',
        공지: '/community/announcement'
    } as const;

    const handleCategoryClick = (category: Category) => {
        const newPath = CATEGORY_ROUTES[category];
        onCategoryClick(category);

        if (newPath !== window.location.pathname) {
            if (category === '전체') {
                navigate(newPath, { replace: true });
            } else {
                navigate(newPath);
            }
        }
    };

    // 공지 상수로 정의
    const NOTICE: Category = '공지';

    // sortedCategories를 useMemo로 최적화하면 더 좋을 수 있습니다
    const sortedCategories = [NOTICE, ...categories.filter(category => category !== NOTICE)];

    return (
        <div className="community-categories">
            {sortedCategories.map((category) => (
                <button
                    key={category}
                    className={`community-category-button ${activeCategory === category ? 'active' : ''} ${category === NOTICE ? 'announcement' : ''
                        }`}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CommunityCategories;