import React, { useState } from 'react';
import './seedPostGridProps.css';
import CommunityPagination from '../../../../community/communityComponents/communityPagination';
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

interface SeedPostGridProps {
    posts: Post[];
}

const SeedPostGridProps = ({ posts }: SeedPostGridProps) => {
    const navigate = useNavigate();
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [seenPage, setSeenPage] = useState(1);

    const postsPerPage = 3;

    const indexOfLastPost = seenPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const seenPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handleSeenPostClick = (postId: number) => {
        if (!isDragging) { // 드래그가 아닌 경우에만 실행
            navigate(`/community/communityDetail/${postId}`);
        }
        setIsDragging(false); // 드래그 상태 초기화
    };

    const handlePageChange = (newPage: number) => {
        setSeenPage(newPage);
    };

    const handleMouseDown = () => {
        setIsMouseDown(true);
        setIsDragging(false);
    };

    const handleMouseUp = (postId: number) => {
        if (!isDragging && isMouseDown) { // 드래그가 아닌 경우에만 실행
            handleSeenPostClick(postId);
        }
        setIsMouseDown(false);
        setIsDragging(false); // 드래그 상태 초기화
    };

    const handleMouseMove = () => {
        if (isMouseDown) {
            setIsDragging(true);
        }
    };

    return (
        <div>
            <div className="seen-feed-post-grid">
                {seenPosts.map((post) => (
                    <div key={post.id}
                        className="seen-feed-post-grid-item"
                        onMouseDown={handleMouseDown}
                        onMouseUp={() => handleMouseUp(post.id)}
                        onMouseMove={handleMouseMove}
                    >
                        <div className="seen-feed-post-grid-header">
                            {post.images[0] && (
                                <img
                                    src={post.images[0]}
                                    alt="Entry Thumbnail"
                                    className="seen-feed-post-grid-entry-thumbnail"
                                />
                            )}
                            <div className="seen-feed-post-grid-text">
                                <p><strong>작성 날짜:</strong> {post.date}</p>
                                <p><strong>카테고리:</strong> {post.category}</p>
                                <p><strong>제목:</strong> {post.title}</p>
                                <p><strong>일지 내용:</strong> {post.content.slice(0, 50)}...</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <CommunityPagination
                currentPage={seenPage}
                totalPages={Math.ceil(posts.length / postsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default SeedPostGridProps;