import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CommunityHeader from '../communityComponents/communityHeader';
import CommunityCategories from '../communityComponents/communityCategories';
import CommunityPostBox from '../communityComponents/communityPostBox/communityPostBox';
import CommunityGridPost from '../communityComponents/communityPostGrid';
import CommunityFloatingButtons from '../communityComponents/communityFloatingButtons';
import './communityList.css';
import userCommunityResponseDto from '../../apis/response/community/userCommunityResponse.dto';
import { ResponseCode } from '../../types/enums';
import axios from 'axios';

export default interface UserCommunityRequestDto {
    token: string | null;
    communityListId?: number;
    communityTitle: string;
    communityContent: string;
    createdDate: string;
    isModified?: boolean;
    communityImageUrl?: string;
    communityContentType: string;
}

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
    const [loadedPosts, setLoadedPosts] = useState<userCommunityResponseDto["data"]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async (startIdx = 0) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get<userCommunityResponseDto>("/api/community/posts", {
                params: {
                    category: selectedCategory === '전체' ? undefined : selectedCategory,
                    startIdx,
                    limit: 10,
                },
            });

            if (response.data.code === ResponseCode.SUCCESS) {
                const newPosts = response.data.data || [];
                setLoadedPosts((prevPosts) => [...prevPosts, ...newPosts]);
            } else {
                setError(response.data.message || '데이터를 불러오는 데 실패했습니다.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [selectedCategory]);

    useEffect(() => {
        fetchPosts();
    }, [selectedCategory, fetchPosts]);

    const loadMorePosts = useCallback(() => {
        if (isLoading) return;
        fetchPosts(loadedPosts.length);
    }, [isLoading, loadedPosts, fetchPosts]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMorePosts();
                }
            },
            { rootMargin: '100px' }
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
                    {error && <div className="error-message">{error}</div>}
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
                onScrollToTop={scrollToTop}
                onWritePost={handleWritePost}
                onSearch={handleSearch}
            />
        </div>
    );
};

export default CommunityList;
