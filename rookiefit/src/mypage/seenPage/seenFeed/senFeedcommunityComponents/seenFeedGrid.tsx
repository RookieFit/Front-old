import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommunityCategories from '../../../../community/communityComponents/communityCategories';
import { dummyPosts } from '../../../../community/communityList/dummydata';

type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';
const CATEGORIES: Category[] = ['전체', '바프', '고민', '정보', '친목', '공지'];
const POSTS_PER_PAGE = 8;
const LOADING_DELAY = 500;

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

    useEffect(() => {
        setCurrentPosts([]);
        setPage(0);
        setHasMore(true);
        loadPosts();
    }, [selectedCategory]);

    useEffect(() => {
        if (currentPosts.length === 0) {
            loadPosts();
        }
    }, []);

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
        navigate(`/community?category=${category}`);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleWritePost = () => {
        navigate('/community/write');
    };

    const handleSearch = () => {
        console.log('검색 버튼 클릭됨');
    };

    return (
        <div className="community-content-container">
            <div className="community-list">
                <div className="community-categories">
                    <CommunityCategories
                        categories={CATEGORIES}
                        activeCategory={selectedCategory}
                        onCategoryClick={handleCategoryClick}
                    />
                </div>
                <div className="post-grid">
                    <CommunityGridPost posts={currentPosts} />
                </div>
                {!hasMore && currentPosts.length > 0 && (
                    <div className="no-more-posts">더 이상 게시물이 없습니다</div>
                )}
            </div>

            <div className="community-floating-buttons">
                <button onClick={scrollToTop} className="community-floating-up-button"></button>
                <button onClick={handleSearch} className="community-floating-search-button"></button>
                <button onClick={handleWritePost} className="community-floating-plus-button"></button>
            </div>
        </div>
    );
};

export default CommunityList;
