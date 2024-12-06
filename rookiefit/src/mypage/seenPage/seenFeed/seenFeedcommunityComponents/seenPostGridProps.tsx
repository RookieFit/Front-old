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

interface PostGridProps<T> {
    posts: T[];
    onPostClick: (id: number) => void; // 클릭 시 게시글 상세 페이지로 이동하는 함수
    renderItem: (item: T) => React.ReactNode; // 항목의 콘텐츠를 렌더링하는 함수
}

const SeenPostGridProps = <T extends { id: number }>({ posts, onPostClick, renderItem }: PostGridProps<T>) => {
    const { handleMouseDown, handleMouseUp, handleMouseMove } = useDragPrevent();
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
                {posts.map((item) => (
                    <div
                        key={item.id}
                        onMouseDown={handleMouseDown}
                        onMouseUp={() => handleMouseUp(() => onPostClick(item.id))}
                        onMouseMove={handleMouseMove}
                        tabIndex={0}
                        role="button"
                    >
                        {renderItem(item)}
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