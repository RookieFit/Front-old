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

const CommunityListFriendShip = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('친목'); // 기본 카테고리를 "친목"으로 설정
    const [page, setPage] = useState(1);
    const postsPerPage = 8;
    const navigate = useNavigate();

    // 더미 데이터 (친목 카테고리와 기타)
    const posts = [
        { id: 17, author: "헬스타그램", date: "2024-11-18", title: "신체 건강하고 사지 멀쩡하신 분", category: "친목" },
        { id: 18, author: "운동왕", date: "2024-11-17", title: "잔병치레 안 잦은 사람과의 만남", category: "친목" },
        { id: 19, author: "헬스마스터", date: "2024-11-16", title: "지난번 정모에서 바닥에 똥을 싸신 분 찾습니다", category: "친목" },
        { id: 21, author: "신앙의 길", date: "2024-11-14", title: "성경공부 하실분 도닦으실분 저랑 만나요", category: "친목" },
        { id: 22, author: "구원의 인도", date: "2024-11-13", title: "도닦으실분 구합니다", category: "친목" },
        { id: 1, author: "헬스마니아", date: "2024-11-16", title: "헬스 커뮤니티 오프라인 모임", category: "친목" },
        { id: 2, author: "운동왕", date: "2024-11-15", title: "친구와 함께하는 운동 챌린지", category: "친목" },
        { id: 3, author: "헬스타그램", date: "2024-11-14", title: "헬스 친구 만들기 팁", category: "친목" },
        { id: 4, author: "운동동지", date: "2024-11-13", title: "운동 친구 모집!", category: "친목" },
        { id: 5, author: "헬스맨", date: "2024-11-12", title: "운동 후 회복을 위한 모임", category: "친목" },
        { id: 6, author: "피트니스러버", date: "2024-11-11", title: "헬스 동아리 활동 모집", category: "친목" },
        { id: 7, author: "운동보스", date: "2024-11-10", title: "헬스 운동 파트너 찾기", category: "친목" },
        { id: 8, author: "친구찾기", date: "2024-11-09", title: "운동 친구 구합니다", category: "친목" },
        { id: 9, author: "헬스친구", date: "2024-11-08", title: "헬스 운동회 참여자 모집", category: "친목" },
        { id: 10, author: "운동러버", date: "2024-11-07", title: "피트니스 관련 친구 찾기", category: "친목" },
        { id: 11, author: "건강맨", date: "2024-11-06", title: "헬스 정보를 나누는 모임", category: "친목" },
        { id: 12, author: "친목커뮤니티", date: "2024-11-05", title: "헬스 관련 친목모임 개최", category: "친목" },
        { id: 13, author: "피트니스인", date: "2024-11-04", title: "운동 후 모임 소개", category: "친목" },
        { id: 14, author: "헬스뉴스", date: "2024-11-03", title: "운동 커뮤니티 활성화 방안", category: "친목" },
    ];

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category); // 선택된 카테고리 업데이트
        setPage(1); // 페이지를 첫 페이지로 초기화

        if (category === '정보') {
            navigate('/community/information');
        } else {
            navigate(`/community/${category}`);
        }
    };

    // 검색 실행 로직
    const handleSearch = (query: string) => {
        if (!query.trim()) {
            alert('검색어를 입력해주세요');
            return;
        }
        setSearchQuery(query); // 실제 검색어 상태 업데이트
        setPage(1); // 검색 시 페이지를 첫 페이지로
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

export default CommunityListFriendShip;
