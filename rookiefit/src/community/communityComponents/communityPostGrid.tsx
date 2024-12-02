import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostGrid from '../../components/postGrid'; // PostGrid 컴포넌트 가져오기
import CommunityPagination from './communityPagination';
import './communityPostGrid.css';

export interface Comment {
    id: number;
    postId: number;
    author: string;
    date: string;
    content: string;
}

export interface Post {
    id: number;
    category: string; // Category 타입이 따로 정의되어 있으면 적절하게 수정
    title: string;
    author: string;
    date: string;
    images: string[];
    content: string;
    comments: Comment[];
}

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
            {/* PostGrid 컴포넌트에 renderItem 추가 */}
            <PostGrid<Post>
                posts={currentPosts} // Post 타입을 지정
                onPostClick={handlePostClick}
                renderItem={(post: Post) => (
                    <div className="community-grid-item">
                        {post.images[0] && (
                            <img
                                src={post.images[0]}
                                alt={post.title}
                                className="community-grid-thumbnail"
                            />
                        )}
                        <h3>{post.title}</h3>
                        <p>{post.date}</p>
                        <p>{post.content.slice(0, 50)}...</p>
                    </div>
                )}
            />
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
