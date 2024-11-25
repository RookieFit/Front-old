import React, { useState } from 'react';
import './SeedPostGridProps.css'; // 스타일 파일
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
    const [seenPage, setSeenPage] = useState(1);
    const postsPerPage = 3; // 한 페이지에 3개의 게시글 표시

    // 페이지에 해당하는 게시글을 가져오는 함수
    const indexOfLastPost = seenPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const seenPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        setSeenPage(newPage);
    };

    const navigate = useNavigate();
    const handleSeenPostClick = (_id: number) => {
        navigate(`../../../../community/communityDetail/communityDetail${Comment.postId}`); // 해당 게시물 ID로 경로 이동
    };

    return (
        <div>
            {/* 그리드 레이아웃 */}
            <div className="seen-feed-post-grid" >
                {seenPosts.map((post) => (
                    <div key={post.id}
                        className="seen-feed-post-grid-item"
                        onClick={() => handleSeenPostClick(Comment.postId)}
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
            {/* 페이지네이션 */}
            <CommunityPagination
                currentPage={seenPage}
                totalPages={Math.ceil(posts.length / postsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default SeedPostGridProps;
