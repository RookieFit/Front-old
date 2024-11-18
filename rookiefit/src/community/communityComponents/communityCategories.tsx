import React from 'react';
import { useNavigate } from 'react-router-dom';
import './communityCategories.css';

// Category 타입 정의
export type Category = '전체' | '바프' | '고민' | '정보' | '친목';

interface CommunityCategoriesProps {
    categories: Category[]; // Category 타입 배열
    activeCategory: Category; // activeCategory도 Category 타입
    onCategoryClick: (category: Category) => void; // onCategoryClick은 Category 타입
}

function CommunityCategories({ categories, activeCategory, onCategoryClick }: CommunityCategoriesProps) {
    const navigate = useNavigate(); // navigate 훅 사용

    const CATEGORY_ROUTES: Record<Category, string> = {
        '전체': '/community', // 전체는 /community
        '바프': '/community/bodyprofile', // 바프는 /community/bodyprofile
        '고민': '/community/concern', // 고민은 /community/concern
        '정보': '/community/information', // 정보는 /community/information
        '친목': '/community/friendship' // 친목은 /community/friendship
    };

    const handleCategoryClick = (category: Category) => {
        const newPath = CATEGORY_ROUTES[category]; // 해당 카테고리의 경로 설정
        onCategoryClick(category); // 부모 컴포넌트에서 카테고리 업데이트

        // 현재 경로와 새 경로가 다르면 이동
        if (newPath !== window.location.pathname) {
            if (category === '전체') {
                navigate(newPath, { replace: true }); // '전체'는 히스토리를 교체
            } else {
                navigate(newPath); // 다른 카테고리는 기본 이동
            }
        }
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
}

export default CommunityCategories;
