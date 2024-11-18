import React from 'react';
import { useNavigate } from 'react-router-dom';
import './communityCategories.css'

// Category 타입 정의
export type Category = '전체' | '바프' | '고민' | '정보' | '친목';

interface CommunityCategoriesProps {
    categories: Category[]; // Category 타입 배열
    activeCategory: Category; // activeCategory도 Category 타입
    onCategoryClick: (category: Category) => void; // onCategoryClick은 Category 타입
}

const CommunityCategories: React.FC<CommunityCategoriesProps> = ({ categories, activeCategory, onCategoryClick }) => {
    const navigate = useNavigate(); // navigate 훅 사용

    const CATEGORY_ROUTES: Record<Category, string> = {
        '전체': '',
        '바프': 'bodyprofile',
        '고민': 'concern',
        '정보': 'information',
        '친목': 'friendship'
    };

    const handleCategoryClick = (category: Category) => {
        onCategoryClick(category); // 부모 컴포넌트에서 카테고리 업데이트
        navigate(`/community/${CATEGORY_ROUTES[category]}`); // 클릭한 카테고리에 맞는 경로로 이동
    };

    return (
        <div className="community-categories">
            {categories.map((category) => (
                <button
                    key={category}
                    className={`community-category-button ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category)} // 카테고리 클릭 시 처리
                >
                    {category} {/* 카테고리 이름을 버튼 텍스트로 사용 */}
                </button>
            ))}
        </div>
    );
};

export default CommunityCategories;
