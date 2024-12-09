import { useNavigate } from 'react-router-dom';
import './communityCategories.css';

// Category 타입 정의 
export type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';

interface CommunityCategoriesProps {
    categories: Category[];
    activeCategory: Category;
    onCategoryClick: (category: Category) => void;
    isGridMode: boolean;  // 그리드 모드 상태 전달
}

function CommunityCategories({ categories, activeCategory, onCategoryClick, isGridMode }: CommunityCategoriesProps) {
    const navigate = useNavigate();

    // 카테고리 클릭 시 URL 업데이트
    const handleCategoryClick = (category: Category) => {
        onCategoryClick(category);  // 부모 컴포넌트로 카테고리 상태 전달

        // URL 쿼리 파라미터를 사용하여 카테고리와 모드 업데이트
        const currentMode = isGridMode ? 'grid' : 'list';
        navigate(`/community?category=${category}&mode=${currentMode}`);
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
                    className={`community-category-button ${activeCategory === category ? 'active' : ''} ${category === NOTICE ? 'announcement' : ''}`}
                    onClick={() => handleCategoryClick(category)} //여기서 URL을 업데이트하여 카테고리 변경
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CommunityCategories;
