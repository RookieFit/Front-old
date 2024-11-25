import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { dummyPosts } from '../../../../community/communityList/dummydata';
import SeedPostGridProps from './seedPostGridProps';

type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';
const CATEGORIES: Category[] = ['전체', '바프', '고민', '정보', '친목', '공지'];
const POSTS_PER_PAGE = 8;
const LOADING_DELAY = 500;

const SeenFeedGrid = () => {
    const location = useLocation();

    const getInitialCategory = (): Category => {
        const params = new URLSearchParams(location.search);
        const categoryFromUrl = params.get('category') as Category;
        return CATEGORIES.includes(categoryFromUrl) ? categoryFromUrl : '전체';
    };

    const [selectedCategory] = useState<Category>(getInitialCategory());
    const [seenPosts, setSeenPosts] = useState<typeof dummyPosts>([]);
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
                setSeenPosts(prev => [...prev, ...newPosts]);
                setPage(prev => prev + 1);
                setHasMore(endIndex < filteredPosts.length);
            } else {
                setHasMore(false);
            }
            setLoading(false);
        }, LOADING_DELAY);
    }, [page, loading, hasMore, getFilteredPosts]);

    useEffect(() => {
        setSeenPosts([]);
        setPage(0);
        setHasMore(true);
        loadPosts();
    }, [selectedCategory]);

    useEffect(() => {
        if (seenPosts.length === 0) {
            loadPosts();
        }
    }, []);

    return (
        <div>
            <div className="seen-feed-grid">
                <SeedPostGridProps posts={seenPosts} />
            </div>
        </div>
    );
};

export default SeenFeedGrid;
