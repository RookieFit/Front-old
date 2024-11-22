import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CommunityHeader from '../communityComponents/communityHeader';
import CommunityCategories from '../communityComponents/communityCategories';
import CommunityPostBox from '../communityComponents/communityPostBox';
import CommunityGridPost from '../communityComponents/communityPostGrid';
import { dummyPosts } from './dummydata';
import './communityList.css';
import { debounce } from 'lodash';

type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';
const CATEGORIES: Category[] = ['전체', '바프', '고민', '정보', '친목', '공지'];
const POSTS_PER_PAGE = 10; // 한 번에 표시할 게시물 개수

const CommunityList = () => {
    const location = useLocation(); // 현재 URL 정보 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

    // 현재 URL이 그리드 모드인지 확인
    const isGridMode = location.pathname.includes('/grid');

    // 리스트/그리드 모드를 전환하는 함수
    const toggleMode = () => {
        const newPath = isGridMode ? '/community' : '/community/grid';
        navigate(`${newPath}?category=${selectedCategory}`);
    };

    // URL에서 카테고리 가져오기
    const getInitialCategory = (): Category => {
        const params = new URLSearchParams(location.search);
        const categoryFromUrl = params.get('category') as Category;
        return CATEGORIES.includes(categoryFromUrl) ? categoryFromUrl : '전체'; // 유효하지 않은 카테고리면 '전체' 반환
    };

    // 상태 관리
    const [selectedCategory, setSelectedCategory] = useState<Category>(getInitialCategory()); // 선택된 카테고리
    const [currentPosts, setCurrentPosts] = useState<typeof dummyPosts>([]); // 화면에 표시되는 게시물
    const [page, setPage] = useState(0); // 현재 페이지 번호
    const [hasMore, setHasMore] = useState(true); // 더 표시할 게시물이 있는지 여부

    // 선택된 카테고리에 따라 게시물 필터링
    const getFilteredPosts = useCallback(() => {
        return selectedCategory === '전체'
            ? dummyPosts // '전체'는 모든 게시물 반환
            : dummyPosts.filter((post) => post.category === selectedCategory); // 선택된 카테고리의 게시물만 반환
    }, [selectedCategory]);

    // 게시물을 페이지 단위로 로드하는 함수
    const loadPosts = useCallback(() => {
        const filteredPosts = getFilteredPosts(); // 필터링된 게시물 가져오기
        const startIndex = page * POSTS_PER_PAGE; // 시작 인덱스 계산
        const endIndex = startIndex + POSTS_PER_PAGE; // 끝 인덱스 계산
        const newPosts = filteredPosts.slice(startIndex, endIndex); // 현재 페이지에 해당하는 게시물 슬라이스

        if (newPosts.length > 0) {
            setCurrentPosts((prev) => [...prev, ...newPosts]); // 기존 게시물에 새 게시물 추가
            setPage((prev) => prev + 1); // 페이지 증가
            setHasMore(endIndex < filteredPosts.length); // 더 표시할 게시물이 있는지 확인
        } else {
            setHasMore(false); // 더 이상 표시할 게시물이 없으면 false 설정
        }
    }, [page, getFilteredPosts]);

    // 스크롤 이벤트 처리 함수 (디바운스를 사용하여 성능 최적화)
    const handleScroll = useCallback(
        debounce(() => {
            if (hasMore) {
                const scrollHeight = document.documentElement.scrollHeight; // 문서 전체 높이
                const scrollTop = document.documentElement.scrollTop; // 현재 스크롤 위치
                const clientHeight = document.documentElement.clientHeight; // 화면 높이

                // 스크롤이 하단에 도달했는지 확인
                if (scrollHeight - scrollTop - clientHeight < 100) {
                    loadPosts(); // 추가 게시물 로드
                }
            }
        }, 150), // 디바운스 딜레이를 150ms로 설정
        [hasMore, loadPosts]
    );

    // URL 카테고리가 변경되면 상태 업데이트
    useEffect(() => {
        const categoryFromUrl = getInitialCategory();
        if (categoryFromUrl !== selectedCategory) {
            setSelectedCategory(categoryFromUrl); // 선택된 카테고리 변경
        }
    }, [location.search]);

    // 선택된 카테고리가 변경되면 게시물 초기화 및 첫 페이지 로드
    useEffect(() => {
        setCurrentPosts([]); // 기존 게시물 초기화
        setPage(0); // 페이지 번호 초기화
        setHasMore(true); // 더 표시할 게시물이 있다고 설정
        loadPosts(); // 첫 페이지 게시물 로드
    }, [selectedCategory]);

    // 스크롤 이벤트 등록 및 해제
    useEffect(() => {
        if (!isGridMode) {
            window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 등록
            return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 해제
        }
    }, [handleScroll, isGridMode]);

    // 카테고리 클릭 이벤트 처리
    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category); // 선택된 카테고리 업데이트
        navigate(`/community/${category}`); // URL 변경
    };

    // 페이지 상단으로 스크롤하는 함수
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 상단으로 이동
    };

    // 글 작성 페이지로 이동하는 함수
    const handleWritePost = () => {
        navigate('/community/write');
    };

    // 검색 버튼 클릭 시 처리 함수
    const handleSearch = () => {
        console.log('검색 버튼 클릭됨');
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
                            <CommunityGridPost posts={currentPosts} />
                        ) : (
                            currentPosts.map((post, index) => (
                                <CommunityPostBox key={`${post.id}-${index}`} post={post} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="community-floating-buttons">
                <button onClick={scrollToTop} className="community-floating-up-button"></button>
                <button onClick={handleWritePost} className="community-floating-plus-button"></button>
                <button onClick={handleSearch} className="community-floating-search-button"></button>
            </div>
        </div>
    );
};

export default CommunityList;
