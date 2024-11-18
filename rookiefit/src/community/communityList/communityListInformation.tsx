import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityHeader from '../communityComponents/communityHeader';
import CommunitySearchBar from '../communityComponents/CommunitySearchBar';
import CommunityCategories from '../communityComponents/communityCategories';
import CommunityPostsTable from '../communityComponents/communityPostTable';
import CommunityPagination from '../communityComponents/communityPagination';
import CommunityListWriteButton from '../communityComponents/communityListWriteButton';
import './communityList.css';

type Category = '전체' | '바프' | '고민' | '정보' | '친목';

const CATEGORIES: Category[] = ['전체', '바프', '고민', '정보', '친목'];

const CommunityListInformation = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('정보'); // 기본 카테고리를 "정보"로 설정
    const [page, setPage] = useState(1);
    const postsPerPage = 8;
    const navigate = useNavigate();

    // '정보' 카테고리에 해당하는 게시글 추가 (음모론, 가짜 뉴스, 외계인 관련, 렙틸리언)
    const posts = [
        { id: 105, author: "무지개 마스터", date: "2024-11-17", title: "무지개 똥을 싸는 법", category: "정보" },
        { id: 100, author: "미스터 X", date: "2024-11-16", title: "유명한 운동선수들 중 지구를 침략하려는 렙틸리언들?", category: "정보" },
        { id: 101, author: "UFO 연구소", date: "2024-11-15", title: "외계인 운동법: 지구의 운동법은 뒤처졌다", category: "정보" },
        { id: 102, author: "미디어 조작", date: "2024-11-14", title: "헬스 산업을 뒤흔드는 숨겨진 음모", category: "정보" },
        { id: 103, author: "우주탐사", date: "2024-11-13", title: "지구 외부에서 온 운동선수들이 있다?", category: "정보" },
        { id: 104, author: "헬스타그램", date: "2024-11-12", title: "외계인들이 사용하는 비밀 운동 장비 공개", category: "정보" },
        { id: 1, author: "헬스매니아", date: "2024-11-15", title: "헬스 관련 최신 뉴스", category: "정보" },
        { id: 2, author: "운동왕", date: "2024-11-14", title: "운동 후 회복을 위한 최신 정보", category: "정보" },
        { id: 3, author: "헬스타그램", date: "2024-11-13", title: "헬스 초보를 위한 필수 정보", category: "정보" },
        { id: 4, author: "건강맨", date: "2024-11-12", title: "효과적인 운동 기구 추천", category: "정보" },
        { id: 5, author: "헬스전문가", date: "2024-11-11", title: "근육 성장에 도움이 되는 식단 정보", category: "정보" },
        { id: 6, author: "운동왕초보", date: "2024-11-10", title: "다이어트 관련 최신 연구 정보", category: "정보" },
        { id: 7, author: "미스터 X", date: "2024-11-09", title: "운동으로 세계를 지배하려는 비밀 조직?", category: "정보" },
        { id: 8, author: "미디어 조작", date: "2024-11-08", title: "헬스 산업을 뒤흔드는 숨겨진 음모", category: "정보" },
        { id: 9, author: "건강의 비밀", date: "2024-11-07", title: "정부가 숨기고 있는 건강 비법", category: "정보" },
        { id: 10, author: "운동 의혹", date: "2024-11-06", title: "유명 운동선수들이 숨기고 있는 약물 사용의 진실", category: "정보" },
        { id: 11, author: "허위정보", date: "2024-11-05", title: "근육 성장에 관한 미확인 가짜 뉴스", category: "정보" },
        { id: 12, author: "건강 전도사", date: "2024-11-04", title: "운동 후 회복을 위한 잘못된 정보들", category: "정보" },
        { id: 13, author: "헬스뉴스", date: "2024-11-03", title: "유명 인플루언서들이 숨기고 있는 건강 사실", category: "정보" },
        { id: 14, author: "전문가", date: "2024-11-02", title: "가짜 건강 정보로 인한 피해 사례", category: "정보" },
    ];

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category); // 선택된 카테고리 업데이트
        setPage(1); // 페이지를 첫 페이지로 초기화

        // "정보" 카테고리가 선택되었을 때 /community/information으로 이동하도록 수정
        if (category === '정보') {
            navigate('/community/information');
        } else {
            navigate(`/community/${category}`);
        }
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            alert('검색어를 입력해주세요');
            return;
        }
        console.log('Searching for:', searchQuery);
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.max(Math.ceil(filteredPosts.length / postsPerPage), 1);
    const currentPosts = filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    return (
        <div>
            {/* 헤더 제목을 "커뮤니티"로 원래대로 설정 */}
            <CommunityHeader title="커뮤니티" content="모든 헬스인들을 위한 커뮤니티" />

            <CommunitySearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />

            <div className="community-content-container">
                <CommunityCategories
                    categories={CATEGORIES} // 카테고리 배열 전달
                    activeCategory={selectedCategory} // 선택된 카테고리 전달
                    onCategoryClick={handleCategoryClick} // 카테고리 클릭 시 처리 함수
                />

                <CommunityPostsTable posts={currentPosts} />
            </div>

            <CommunityListWriteButton />

            <CommunityPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default CommunityListInformation;
