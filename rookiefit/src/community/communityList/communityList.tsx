import React, { useState, useEffect, useCallback } from 'react';
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

    const sortPostsById = (posts: typeof dummyPosts) => {
        return posts.slice().sort((a, b) => a.id - b.id);
    };

    const [selectedCategory, setSelectedCategory] = useState<Category>(getInitialCategory());
    const [isGridMode, setIsGridMode] = useState<boolean>(getInitialMode());
    const [loadedPosts, setLoadedPosts] = useState<typeof dummyPosts>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const filtered = selectedCategory === '전체'
            ? dummyPosts.slice(0, 10)
            : dummyPosts.filter((post) => post.category === selectedCategory).slice(0, 10);

        const sorted = sortPostsById(filtered);
        setLoadedPosts(sorted);
    }, [selectedCategory]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryFromUrl = params.get('category') as Category;
        const modeFromUrl = params.get('mode');

        // URL에서 category와 mode를 읽어와 상태를 설정
        if (CATEGORIES.includes(categoryFromUrl)) {
            setSelectedCategory(categoryFromUrl);
        }
        if (modeFromUrl) {
            setIsGridMode(modeFromUrl === 'grid');
        }
    }, [location.search]);

    const loadMorePosts = useCallback(() => {
        if (isLoading) return;
        setIsLoading(true);

        setTimeout(() => {
            const startIdx = loadedPosts.length;
            const newPosts = selectedCategory === '전체'
                ? dummyPosts.slice(startIdx, startIdx + 10)
                : dummyPosts.filter((post) => post.category === selectedCategory).slice(startIdx, startIdx + 10);

            const sorted = sortPostsById(newPosts);
            setLoadedPosts((prevPosts) => [...prevPosts, ...sorted]);
            setIsLoading(false);
        }, 300);
    }, [isLoading, loadedPosts, selectedCategory]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMorePosts();
                }
            },
            {
                rootMargin: '100px',
            }
        );

        const sentinel = document.getElementById('sentinel');
        if (sentinel && !isGridMode) {
            observer.observe(sentinel);
        }

        return () => {
            if (sentinel) {
                observer.unobserve(sentinel);
            }
        };
    }, [loadMorePosts, isGridMode]);

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
        // 현재 모드를 유지하면서 카테고리만 변경
        const currentMode = isGridMode ? 'grid' : 'list';
        navigate(`/community?category=${category}&mode=${currentMode}`);
    };

    const toggleMode = () => {
        const newMode = !isGridMode ? 'grid' : 'list';
        setIsGridMode(!isGridMode);
        navigate(`/community?category=${selectedCategory}&mode=${newMode}`);
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
                            isGridMode={isGridMode}  // isGridMode 전달
                        />
                    </div>
                    <button onClick={toggleMode} className="toggle-mode-button">
                        {isGridMode ? '리스트 보기' : '그리드 보기'}
                    </button>
                    <div className="post-list">
                        {isGridMode ? (
                            <CommunityGridPost posts={loadedPosts} />
                        ) : (
                            loadedPosts.map((post) => (
                                <div key={post.id}>
                                    <CommunityPostBox post={post} currentUser={''} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div id="sentinel"></div>

            <CommunityFloatingButtons
                onWritePost={handleWritePost}
                onSearch={handleSearch}
            />
        </div>
    );
};

export default CommunityList;
