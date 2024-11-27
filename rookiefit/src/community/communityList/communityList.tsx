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

    const [selectedCategory, setSelectedCategory] = useState<Category>(getInitialCategory());
    const [isGridMode, setIsGridMode] = useState<boolean>(getInitialMode());
    const [loadedPosts, setLoadedPosts] = useState<typeof dummyPosts>([]); // 현재 로드된 게시물
    const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태

    // 게시물을 카테고리별로 필터링
    useEffect(() => {
        const filtered = selectedCategory === '전체'
            ? dummyPosts.slice(0, 10) // 처음 10개만
            : dummyPosts.filter((post) => post.category === selectedCategory).slice(0, 10);
        setLoadedPosts(filtered);
    }, [selectedCategory]);

    // 스크롤바가 바닥에 도달했을 때 게시물 추가 로딩
    const loadMorePosts = useCallback(() => {
        if (isLoading) return; // 로딩 중이면 추가 로딩 방지
        setIsLoading(true);

        setTimeout(() => {
            const startIdx = loadedPosts.length;
            const newPosts = selectedCategory === '전체'
                ? dummyPosts.slice(startIdx, startIdx + 10)
                : dummyPosts.filter((post) => post.category === selectedCategory).slice(startIdx, startIdx + 10);

            setLoadedPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setIsLoading(false);
        }, 3000); // 3초 지연
    }, [isLoading, loadedPosts, selectedCategory]);

    // IntersectionObserver를 사용하여 스크롤이 끝에 도달했을 때 추가 로드
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMorePosts(); // 스크롤이 끝에 도달했을 때 게시물 추가
                }
            },
            {
                rootMargin: '100px', // 스크롤이 100px 남았을 때 로드 시작
            }
        );
        const sentinel = document.getElementById('sentinel');
        if (sentinel) {
            observer.observe(sentinel);
        }
        return () => {
            if (sentinel) {
                observer.unobserve(sentinel);
            }
        };
    }, [loadMorePosts]);

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
                            <CommunityGridPost posts={loadedPosts} />
                        ) : (
                            loadedPosts.map((post) => (
                                <div key={post.id}>
                                    <CommunityPostBox post={post} currentUser={''} />
                                </div>
                            ))
                        )}
                    </div>
                    {isLoading && <div className="loading">로딩 중...</div>}
                </div>
            </div>

            <div id="sentinel"></div> {/* IntersectionObserver의 타겟 */}

            <CommunityFloatingButtons
                onScrollToTop={scrollToTop}
                onWritePost={handleWritePost}
                onSearch={handleSearch}
            />
        </div>
    );
};

export default CommunityList;
