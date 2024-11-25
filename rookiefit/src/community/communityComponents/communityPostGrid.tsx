import React, { useState } from 'react';
import './communityPostGrid.css'; // 스타일 파일
import CommunityPagination from './communityPagination';
import { useNavigate } from 'react-router-dom';

export type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';

export interface Comment {
    id: number;
    postId: number;
    author: string;
    date: string;
    content: string;
}

export interface Post {
    id: number;
    category: Category;
    title: string;
    author: string;
    date: string;
    images: string[];
    content: string;
    comments: Comment[];
}

interface CommunityPostGridProps {
    posts: Post[];
}

const CommunityPostGrid = ({ posts }: CommunityPostGridProps) => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9; // 한 페이지에 9개의 게시글 표시

    // 페이지에 해당하는 게시글을 가져오는 함수
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handleClick = (id: number) => {
        navigate(`/community/detail/${id}`);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            {/* 그리드 레이아웃 */}
            <div className="post-grid">
                {currentPosts.map((post) => (
                    <div
                        key={post.id}
                        className="post-grid-item"
                        onClick={() => handleClick(post.id)} // 게시글의 id를 전달
                    >
                        <div className="post-grid-header">
                            {post.images[0] && (
                                <img
                                    src={post.images[0]}
                                    alt="Entry Thumbnail"
                                    className="post-grid-entry-thumbnail"
                                />
                            )}
                            <div className="post-grid-text">
                                <p>
                                    {post.category}
                                </p>
                                <p>
                                    {post.title}
                                </p>
                                <p>
                                    {post.date}
                                </p>
                                <p>
                                    {post.content.slice(0, 50)}...
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 */}
            <CommunityPagination
                currentPage={currentPage}
                totalPages={Math.ceil(posts.length / postsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default CommunityPostGrid;
