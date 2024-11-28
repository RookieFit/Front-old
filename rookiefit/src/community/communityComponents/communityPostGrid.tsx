import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostGrid from '../../components/postGrid'; // PostGrid 컴포넌트 가져오기
import { Post } from '../../components/postGrid'; // PostGrid 컴포넌트 가져오기
import CommunityPagination from './communityPagination';
import './communityPostGrid.css';

const CommunityPostGrid = ({ posts }: { posts: Post[] }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9; // 한 페이지에 9개의 게시글

    // 현재 페이지에 해당하는 게시글을 가져옵니다
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePostClick = (id: number) => {
        navigate(`/community/detail/${id}`);
    };

    return (
        <div>
            {/* PostGrid 컴포넌트를 여기서 사용 */}
            <PostGrid posts={currentPosts} onPostClick={handlePostClick} />
            {/* 페이지네이션 컴포넌트 */}
            <CommunityPagination
                currentPage={currentPage}
                totalPages={Math.ceil(posts.length / postsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default CommunityPostGrid;
