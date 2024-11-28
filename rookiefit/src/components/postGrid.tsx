import React from 'react';
import './postGrid.css';
import { useDragPrevent } from './useDragPrevent'; // 커스텀 훅 가져오기

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

interface PostGridProps {
    posts: Post[];
    onPostClick: (id: number) => void; // 클릭 시 게시글 상세 페이지로 이동하는 함수
}

const PostGrid = ({ posts, onPostClick }: PostGridProps) => {
    const { handleMouseDown, handleMouseUp, handleMouseMove } = useDragPrevent(); // 커스텀 훅 사용

    return (
        <div className="post-grid">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="post-grid-item"
                    onMouseDown={handleMouseDown}
                    onMouseUp={() => handleMouseUp(() => onPostClick(post.id))} // 클릭 시 게시글 상세 페이지로 이동
                    onMouseMove={handleMouseMove}
                    tabIndex={0}
                    role="button"
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
                            <p><strong>작성 날짜:</strong> {post.date}</p>
                            <p><strong>카테고리:</strong> {post.category}</p>
                            <p><strong>제목:</strong> {post.title}</p>
                            <p><strong>일지 내용:</strong> {post.content.slice(0, 50)}...</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostGrid;
