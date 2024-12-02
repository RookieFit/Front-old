import React, { useState } from 'react';
import './seenPostGridProps.css';
import CommunityPagination from '../../../../community/communityComponents/communityPagination';
import { useDragPrevent } from '../../../../components/useDragPrevent';

// 카테고리 타입 정의
export type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';

// 댓글 타입 정의
export interface Comment {
    id: number;
    postId: number;
    author: string;
    date: string;
    content: string;
}

// 게시글 타입 정의
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

interface SeenPostGridProps {
    posts: Post[];
    onPostClick: (id: number) => void; // 클릭 시 게시글 상세 페이지로 이동하는 함수
}

const SeenPostGridProps = ({ posts, onPostClick, }: SeenPostGridProps) => {
    const { handleMouseDown, handleMouseUp, handleMouseMove } = useDragPrevent(); // 커스텀 훅 사용
    const [seenPage, setSeenPage] = useState(1);
    
    const postsPerPage = 3;

    const indexOfLastPost = seenPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const seenPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (newPage: number) => {
        setSeenPage(newPage);
    };

    return (
        <div>
            <div className="seen-feed-post-grid">
                {seenPosts.map((post) => (
                    <div
                        key={post.id}
                        className="seen-feed-post-grid-item"
                        onMouseDown={handleMouseDown}
                        onMouseUp={() => handleMouseUp(() => onPostClick(post.id))}
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

export default SeenPostGridProps;