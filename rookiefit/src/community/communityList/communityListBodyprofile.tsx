import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityHeader from '../communityComponents/communityHeader';
import CommunitySearchBar from '../communityComponents/communitySearchbar';
import CommunityCategories from '../communityComponents/communityCategories';
import CommunityPostTable from '../communityComponents/communityPostTable';
import CommunityPagination from '../communityComponents/communityPagination';
import './communityList.css';

interface Post {
    id: number;
    author: string;
    date: string;
    title: string;
    category: string;
}

const BodyProfileList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const postsPerPage = 8;
    const navigate = useNavigate();

    const categories = ['전체', '바프', '고민', '정보', '친목'];

    const posts: Post[] = [
        { id: 2, author: "헬스초보", date: "2024-11-14", title: "바프 준비 중인데 조언 부탁드립니다", category: "바프" },
        { id: 10, author: "바프고수", date: "2024-11-06", title: "바프 시작할 때 유의사항", category: "바프" },
        { id: 5, author: "헬스마스터", date: "2024-11-11", title: "헬스장에서 필수 운동 기구 소개", category: "바프" },
    ];

    const filteredPosts = posts
        .filter(post => post.category === "바프")
        .filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const currentPosts = filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    const handleCategoryClick = (category: string) => {
        navigate(`/community/${category}`);
    };

    const handleSearch = () => {
        setPage(1);
    };

    return (
        <div className="community-list-wrapper">
            <CommunityHeader title="커뮤니티" content="모든 헬스인들을 위한 커뮤니티" />

            <CommunitySearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
            />

            <div className="community-content-container">
                <CommunityCategories
                    categories={categories}
                    activeCategory="바프"
                    onCategoryClick={handleCategoryClick}
                />

                <CommunityPostTable posts={currentPosts} />
            </div>

            <CommunityPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BodyProfileList;
