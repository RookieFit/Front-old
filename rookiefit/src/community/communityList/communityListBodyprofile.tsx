import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityHeader from '../communityComponents/communityHeader';
import CommunitySearchBar from '../communityComponents/communitySearchBar';
import CommunityCategories from '../communityComponents/communityCategories';
import CommunityPostsTable from '../communityComponents/communityPostTable';
import CommunityPagination from '../communityComponents/communityPagination';
import CommunityListWriteButton from '../communityComponents/communityListWriteButton';
import './communityList.css';

type Category = '전체' | '바프' | '고민' | '정보' | '친목';

const CATEGORIES: Category[] = ['전체', '바프', '고민', '정보', '친목'];

const CommunityListBodyprofile = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const postsPerPage = 8;
    const navigate = useNavigate();

    const posts = [
        { id: 2, author: "헬스초보", date: "2024-11-14", title: "바프 준비 중인데 조언 부탁드립니다", category: '바프' },
        { id: 4, author: "자극왕", date: "2024-11-12", title: "자극적인 운동법으로 바프 만들기", category: '바프' },
        { id: 8, author: "운동의 신", date: "2024-11-08", title: "하루 30분 운동으로 3kg 감량 성공!", category: '바프' },
        { id: 27, author: "바프선생", date: "2024-10-20", title: "바프를 위한 식단 관리 방법", category: '바프' },
        // 바프 카테고리에 해당하는 게시글만 추가
    ];

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            alert('검색어를 입력해주세요');
            return;
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const totalPages = Math.max(Math.ceil(filteredPosts.length / postsPerPage), 1);
    const currentPosts = filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    const handleCategoryClick = (category: Category) => {
        setPage(1);  // 페이지를 첫 번째 페이지로 설정
        if (category === '바프') {
            navigate('/community/bodyprofile'); // 현재 페이지 유지
        } else {
            navigate(`/community/${category}`);  // 다른 카테고리 경로로 이동
        }
    };

    return (
        <div>
            {/* 커뮤니티 헤더 */}
            <CommunityHeader title="커뮤니티" content="모든 헬스인들을 위한 커뮤니티" />

            {/* 검색 바 */}
            <CommunitySearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />

            {/* 카테고리 및 게시글 */}
            <div className="community-content-container">
                <CommunityCategories
                    categories={CATEGORIES}
                    activeCategory="바프"  // 현재 활성 카테고리를 '바프'로 설정
                    onCategoryClick={handleCategoryClick}
                />

                <CommunityPostsTable posts={currentPosts} />
            </div>

            <CommunityListWriteButton />

            {/* 페이지네이션 */}
            <CommunityPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default CommunityListBodyprofile;
