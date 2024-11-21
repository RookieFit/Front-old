import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CommunityHeader from '../communityComponents/communityHeader';
import CommunityCategories from '../communityComponents/communityCategories';
import CommunityPostBox from '../communityComponents/communityPostBox';
import { dummyPosts } from './dummydata';
import './communityList.css';
import { debounce } from 'lodash';

// 카테고리 타입 정의
type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';

// 카테고리 목록 상수
const CATEGORIES: Category[] = ['전체', '바프', '고민', '정보', '친목', '공지'];
const POSTS_PER_PAGE = 8;
const LOADING_DELAY = 500; // 로딩 지연 시간 (ms)

const CommunityList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getInitialCategory = (): Category => {
        const params = new URLSearchParams(location.search);
        const categoryFromUrl = params.get('category') as Category;
        return CATEGORIES.includes(categoryFromUrl) ? categoryFromUrl : '전체';
    };

    const [selectedCategory, setSelectedCategory] = useState<Category>(getInitialCategory());
    const [currentPosts, setCurrentPosts] = useState<typeof dummyPosts>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const getFilteredPosts = useCallback(() => {
        return selectedCategory === '전체'
            ? dummyPosts
            : dummyPosts.filter(post => post.category === selectedCategory);
    }, [selectedCategory]);

    const loadPosts = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);

        // 로딩 지연 추가
        setTimeout(() => {
            const filteredPosts = getFilteredPosts();
            const startIndex = page * POSTS_PER_PAGE;
            const endIndex = startIndex + POSTS_PER_PAGE;
            const newPosts = filteredPosts.slice(startIndex, endIndex);

            if (newPosts.length > 0) {
                setCurrentPosts(prev => [...prev, ...newPosts]);
                setPage(prev => prev + 1);
                setHasMore(endIndex < filteredPosts.length);
            } else {
                setHasMore(false);
            }
            setLoading(false);
        }, LOADING_DELAY);
    }, [page, loading, hasMore, getFilteredPosts]);

    // 디바운스된 스크롤 이벤트 핸들러
    const handleScroll = useCallback(
        debounce(() => {
            if (loading || !hasMore) return;

            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            if (scrollHeight - scrollTop - clientHeight < 100) {
                loadPosts();
            }
        }, 150), // 디바운스 딜레이를 150ms로 설정
        [loading, hasMore, loadPosts]
    );

    useEffect(() => {
        const categoryFromUrl = getInitialCategory();
        if (categoryFromUrl !== selectedCategory) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [location.search]);

    useEffect(() => {
        setCurrentPosts([]);
        setPage(0);
        setHasMore(true);
        loadPosts();
    }, [selectedCategory]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (currentPosts.length === 0) {
            loadPosts();
        }
    }, []); // 초기 로딩

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
        navigate(`/community?category=${category}`);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleWritePost = () => {
        navigate('/community/write'); // 글 작성 페이지로 이동
    };

    const handleSearch = () => {
        console.log('검색 버튼 클릭됨');
    };

    return (
        <div>
            <CommunityHeader title="커뮤니티" content="모든 헬스인들을 위한 커뮤니티" />
            <div className="community-divider"></div> {/* 구분선 추가 */}

            <div className="community-content-container">
                <div className="community-list">
                    <div className="community-categories">
                        <CommunityCategories
                            categories={CATEGORIES}
                            activeCategory={selectedCategory}
                            onCategoryClick={handleCategoryClick}
                        />
                    </div>

                    <div className="post-list">
                        {currentPosts.map((post, index) => (
                            <CommunityPostBox key={`${post.id}-${index}`} post={post} />
                        ))}
                    </div>
                    {loading && (
                        <div className="loading">Loading...</div>
                    )}
                    {!hasMore && currentPosts.length > 0 && (
                        <div className="no-more-posts">더 이상 게시물이 없습니다</div>
                    )}
                </div>
            </div>

            {/* 오른쪽 버튼 */}
            <div className="community-floating-buttons">
                <button onClick={scrollToTop} className="community-floating-up-button"></button> {/* 상단으로 가기 버튼 */}
                <button onClick={handleSearch} className="community-floating-search-button"></button> {/* 검색하기 버튼 */}
                <button onClick={handleWritePost} className="community-floating-plus-button"></button> {/* 글작성하기 버튼 */}
            </div>
        </div>
    );
};

export default CommunityList;
