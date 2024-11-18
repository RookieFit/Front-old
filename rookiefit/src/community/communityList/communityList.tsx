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
const CommunityList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
    const [page, setPage] = useState(1);
    const postsPerPage = 8;
    const navigate = useNavigate();

    const posts = [
        { id: 1, author: "운동맨", date: "2024-11-15", title: "오늘의 운동 꿀팁" },
        { id: 2, author: "헬스초보", date: "2024-11-14", title: "바프 준비 중인데 조언 부탁드립니다" },
        { id: 3, author: "헬스중독", date: "2024-11-13", title: "집에서 하는 강도 높은 전신 운동 추천!" },
        { id: 4, author: "자극왕", date: "2024-11-12", title: "자극적인 운동법으로 바프 만들기" },
        { id: 5, author: "운동왕초보", date: "2024-11-11", title: "1개월만에 몸짱될 수 있을까요?" },
        { id: 6, author: "헬스매니아", date: "2024-11-10", title: "내가 만든 운동 루틴 공유합니다!" },
        { id: 7, author: "헬스타그램", date: "2024-11-09", title: "헬스 초보를 위한 식단 조언 부탁해요!" },
        { id: 8, author: "운동의 신", date: "2024-11-08", title: "하루 30분 운동으로 3kg 감량 성공!" },
        { id: 9, author: "헬스꿀팁", date: "2024-11-07", title: "운동 후 회복을 위한 꿀팁" },
        { id: 10, author: "운동왕", date: "2024-11-06", title: "다이어트 실패 원인 분석!" },
        { id: 11, author: "초보자", date: "2024-11-05", title: "헬스 시작하는 법과 실수들" },
        { id: 12, author: "자극왕", date: "2024-11-04", title: "30분 운동으로 몸짱 되는 법" },
        { id: 13, author: "운동매니아", date: "2024-11-03", title: "체지방을 10%까지 줄이는 비결" },
        { id: 14, author: "헬스정복", date: "2024-11-02", title: "운동과 식단을 병행하는 팁" },
        { id: 15, author: "운동고수", date: "2024-11-01", title: "가슴 근육 운동 5가지" },
        { id: 16, author: "헬스리더", date: "2024-10-31", title: "빠르게 근육을 키우는 운동법" },
        { id: 17, author: "피트니스", date: "2024-10-30", title: "이제는 집에서도 근육 만들기" },
        { id: 18, author: "피트니스러버", date: "2024-10-29", title: "몸짱 되기 위한 운동과 식단의 차이" },
        { id: 19, author: "헬스마스터", date: "2024-10-28", title: "운동과 함께하는 스마트한 식단" },
        { id: 20, author: "피트니스초보", date: "2024-10-27", title: "헬스에서 자주 하는 실수들" },
        { id: 21, author: "운동초보", date: "2024-10-26", title: "운동 시작 1주일, 첫 변화" },
        { id: 22, author: "체형교정", date: "2024-10-25", title: "체형 교정으로 얻은 놀라운 변화" },
        { id: 23, author: "헬스매니아", date: "2024-10-24", title: "나만의 헬스루틴 공개!" },
        { id: 24, author: "운동박사", date: "2024-10-23", title: "허리 통증 해결을 위한 운동법" },
        { id: 25, author: "피트니스왕", date: "2024-10-22", title: "3개월 만에 몸짱이 된 이유" },
        { id: 26, author: "헬스초보", date: "2024-10-21", title: "운동을 시작하기 전 필수 준비물" },
        { id: 27, author: "바프선생", date: "2024-10-20", title: "바프를 위한 식단 관리 방법" },
        { id: 28, author: "헬스타그램", date: "2024-10-19", title: "헬스와 관련된 궁금한 점 질문해주세요!" },
        { id: 29, author: "운동고수", date: "2024-10-18", title: "단기간에 뚜렷한 결과를 얻는 운동법" },
        { id: 30, author: "운동지침", date: "2024-10-17", title: "운동 후 회복을 위한 필수 아이템" }
    ];

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);  // 선택된 카테고리 업데이트
        setPage(1);  // 카테고리 변경 시 페이지를 첫 번째 페이지로 설정
        navigate(`/community/${category}`);  // 해당 카테고리의 라우트로 이동
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
        const matchesCategory = selectedCategory === '전체' || post.title.includes(selectedCategory);
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
            <CommunityHeader title="커뮤니티" content="모든 헬스인들을 위한 커뮤니티" />

            <CommunitySearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />

            <div className="community-content-container">
                <CommunityCategories
                    categories={CATEGORIES}  // 카테고리 배열 전달
                    activeCategory={selectedCategory}  // 선택된 카테고리 전달
                    onCategoryClick={handleCategoryClick}  // 카테고리 클릭 시 처리 함수
                />
                <CommunityPostsTable posts={currentPosts} />


            </div>

            <CommunityListWriteButton />

            <CommunityPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default CommunityList;
