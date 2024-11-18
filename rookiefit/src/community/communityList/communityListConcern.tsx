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

const CommunityListConcern = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('고민'); // 기본 카테고리를 "고민"으로 설정
    const [page, setPage] = useState(1);
    const postsPerPage = 8;
    const navigate = useNavigate();

    const posts = [
        // 상단에 표시될 고민 게시글들
        { id: 100, author: "고민왕", date: "2024-11-16", title: "수상한 이웃이 외계인으로 의심됩니다. 어떻게 해야 할까요?", category: "고민" },
        { id: 101, author: "똥고민", date: "2024-11-15", title: "매일 똥이 딱딱해요, 어떤 음식이 좋을까요?", category: "고민" },
        { id: 1, author: "운동맨", date: "2024-11-15", title: "오늘의 운동 꿀팁", category: "고민" },
        { id: 2, author: "헬스초보", date: "2024-11-14", title: "바프 준비 중인데 조언 부탁드립니다", category: "고민" },
        { id: 3, author: "헬스중독", date: "2024-11-13", title: "집에서 하는 강도 높은 전신 운동 추천!", category: "고민" },
        { id: 4, author: "자극왕", date: "2024-11-12", title: "자극적인 운동법으로 바프 만들기", category: "고민" },
        { id: 5, author: "운동왕초보", date: "2024-11-11", title: "1개월만에 몸짱될 수 있을까요?", category: "고민" },
        { id: 6, author: "헬스매니아", date: "2024-11-10", title: "내가 만든 운동 루틴 공유합니다!", category: "고민" },
        { id: 7, author: "헬스타그램", date: "2024-11-09", title: "헬스 초보를 위한 식단 조언 부탁해요!", category: "고민" },
        { id: 8, author: "운동의 신", date: "2024-11-08", title: "하루 30분 운동으로 3kg 감량 성공!", category: "고민" },
        { id: 9, author: "헬스꿀팁", date: "2024-11-07", title: "운동 후 회복을 위한 꿀팁", category: "고민" },
        { id: 10, author: "운동왕", date: "2024-11-06", title: "다이어트 실패 원인 분석!", category: "고민" },
        { id: 11, author: "연애초보", date: "2024-11-05", title: "데이트에서 기분 나쁘게 행동한 걸까요?", category: "고민" },
        { id: 12, author: "사랑의 고민", date: "2024-11-04", title: "연애 초기에 상대방의 관심이 식은 것 같아요", category: "고민" },
        { id: 13, author: "연애매니아", date: "2024-11-03", title: "이별 후 어떻게 다시 연락을 해야 할까요?", category: "고민" },
        { id: 14, author: "사랑의 속삭임", date: "2024-11-02", title: "연애할 때 자주 싸우는 게 문제일까요?", category: "고민" },
        { id: 15, author: "연애고민상담", date: "2024-11-01", title: "연애 중 상대방의 행동에 대해 어떻게 반응해야 할지 모르겠어요", category: "고민" },
    ];

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category); // 선택된 카테고리 업데이트
        setPage(1); // 페이지를 첫 페이지로 초기화

        // "고민" 카테고리가 선택되었을 때 /community/concern으로 이동하도록 수정
        if (category === '고민') {
            navigate('/community/concern');
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

export default CommunityListConcern;
