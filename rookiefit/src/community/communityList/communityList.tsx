import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CommunityHeader from '../communityComponents/communityHeader';
import CommunityCategories from '../communityComponents/communityCategories';
import CommunityPostBox from '../communityComponents/communityPostBox/communityPostBox';
import CommunityGridPost from '../communityComponents/communityPostGrid';
import CommunityFloatingButtons from '../communityComponents/communityFloatingButtons';
import { dummyPosts } from './dummydata';
import './communityList.css';

type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';
const CATEGORIES: Category[] = ['전체', '바프', '고민', '정보', '친목', '공지'];

const CommunityList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getInitialCategory = (): Category => {
        const params = new URLSearchParams(location.search);
        const categoryFromUrl = params.get('category') as Category;
        return CATEGORIES.includes(categoryFromUrl) ? categoryFromUrl : '전체';
    };

    const getInitialMode = (): boolean => {
        const params = new URLSearchParams(location.search);
        return params.get('mode') === 'grid';
    };

    const [selectedCategory, setSelectedCategory] = useState<Category>(getInitialCategory());
    const [isGridMode, setIsGridMode] = useState<boolean>(getInitialMode());
    const [filteredPosts, setFilteredPosts] = useState<typeof dummyPosts>([]);

    useEffect(() => {
        const filtered = selectedCategory === '전체'
            ? dummyPosts
            : dummyPosts.filter((post) => post.category === selectedCategory);
        setFilteredPosts(filtered);
    }, [selectedCategory]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryFromUrl = params.get('category') as Category;
        const modeFromUrl = params.get('mode');

        if (categoryFromUrl && CATEGORIES.includes(categoryFromUrl)) {
            setSelectedCategory(categoryFromUrl);
        }
        if (modeFromUrl === 'grid' || modeFromUrl === 'list') {
            setIsGridMode(modeFromUrl === 'grid');
        }
    }, [location.search]);

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
        navigate(`/community?category=${category}&mode=${isGridMode ? 'grid' : 'list'}`);
    };

    const toggleMode = () => {
        const newMode = isGridMode ? 'list' : 'grid';
        setIsGridMode(!isGridMode);
        navigate(`/community?category=${selectedCategory}&mode=${newMode}`);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleWritePost = () => {
        navigate('/community/write');
    };

    const handleSearch = () => {
        navigate('/community/search');
    };

    return (
        <div>
            <CommunityHeader title="커뮤니티" content="모든 헬스인들을 위한 커뮤니티" />
            <div className="community-divider"></div>

            <div className="community-content-container">
                <div className="community-list">
                    <div className="community-categories">
                        <CommunityCategories
                            categories={CATEGORIES}
                            activeCategory={selectedCategory}
                            onCategoryClick={handleCategoryClick}
                        />
                    </div>
                    <button onClick={toggleMode} className="toggle-mode-button">
                        {isGridMode ? '리스트 보기' : '그리드 보기'}
                    </button>
                    <div className="post-list">
                        {isGridMode ? (
                            <CommunityGridPost posts={filteredPosts} />
                        ) : (
                            filteredPosts.map((post) => (
                                <div key={post.id}>
                                    <CommunityPostBox post={post} currentUser={''} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <CommunityFloatingButtons
                onScrollToTop={scrollToTop}
                onWritePost={handleWritePost}
                onSearch={handleSearch}
            />
        </div>
    );
};

export default CommunityList;