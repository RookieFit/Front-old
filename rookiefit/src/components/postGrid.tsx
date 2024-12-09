import React, { useState } from 'react';
import './postGrid.css';
import { useDragPrevent } from './useDragPrevent';

interface PostGridProps<T> {
    posts: T[];
    onPostClick: (id: number) => void; // 클릭 시 게시글 상세 페이지로 이동하는 함수
    renderItem: (item: T) => React.ReactNode; // 항목의 콘텐츠를 렌더링하는 함수
    className?: string;
}

const PostGrid = <T extends { id: number }>({ posts, onPostClick, renderItem, className }: PostGridProps<T>) => {
    const { handleMouseDown, handleMouseUp, handleMouseMove } = useDragPrevent();
    return (
        <div className={`post-grid ${className || ''}`}>
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
    );
};

export default PostGrid;
