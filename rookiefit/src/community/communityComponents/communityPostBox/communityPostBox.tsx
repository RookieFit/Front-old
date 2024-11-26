import React, { useState } from 'react';
import Comment from './communityComment';
import PostImages from './postImages';
import './communityPostBox.css';
import { useNavigate } from 'react-router-dom';

// Post 인터페이스 정의
interface Post {
    category: string;
    title: string;
    author: string;
    date: string;
    images: string[];
    content: string;
    comments: { id: number; author: string; date: string; content: string }[];
    id: number;
}

// CommunityPostBox 컴포넌트의 props 인터페이스 정의
interface CommunityPostBoxProps {
    post: Post;
    currentUser: string; // 현재 사용자
}

function CommunityPostBox({ post, currentUser }: CommunityPostBoxProps) {
    const navigate = useNavigate();

    // 댓글 섹션 열림/닫힘 상태 관리
    const [isCommentOpen, setIsCommentOpen] = useState(false);  // 처음에 댓글 섹션은 닫혀 있음
    // 댓글 목록 상태 관리
    const [comments, setComments] = useState(post.comments);
    // 새 댓글 입력 상태 관리
    const [newComment, setNewComment] = useState('');

    // 댓글 섹션 토글 함수
    const handleCommentToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();  // 기본 동작 방지 (페이지 이동 방지)
        setIsCommentOpen((prev) => !prev);  // 댓글 열기/닫기 상태를 반전시킴
    };

    // 새 댓글 추가 함수
    const handleAddComment = () => {
        if (newComment.trim() === '') return;
        const newCommentObj = {
            id: Date.now(),
            author: currentUser,
            date: new Date().toLocaleString(),
            content: newComment,
        };
        setComments((prevComments) => [...prevComments, newCommentObj]);
        setNewComment('');  // 새 댓글 입력창 초기화
    };

    const handleClick = (id: number) => {
        navigate(`/community/detail/${id}`);
    };

    // 댓글 삭제 함수
    const handleDeleteComment = (id: number) => {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    };

    // 댓글 수정 함수
    const handleEditComment = (id: number, newContent: string) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id ? { ...comment, content: newContent } : comment
            )
        );
    };

    // 내용 축약 함수
    const truncateContent = (content: string, maxLength: number) => {
        return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
    };

    return (
        <div className="post-box" >
            <div className="post-details" onClick={() => handleClick(post.id)}>
                {/* 게시물 카테고리 */}
                <p className="post-category">{post.category}</p>
                {/* 게시물 제목 */}
                <h3 className="post-title">{post.title}</h3>
                {/* 게시물 헤더 (작성자, 날짜) */}
                <div className="post-header">
                    <p className="author">{post.author}</p>
                    <p className="date">{post.date}</p>
                </div>

                {/* 게시물 이미지 */}
                <PostImages images={post.images} />

                {/* 게시물 내용 (축약) */}
                <p className="post-content">{truncateContent(post.content, 150)}</p>
            </div>

            {/* 댓글 보기/닫기 버튼 */}
            <button type="button" className="community-comment-slide-button" onClick={handleCommentToggle}>
                {isCommentOpen ? '댓글 닫기' : '댓글 보기'}
            </button>

            {/* 댓글 섹션 */}
            <div className={`comments-section ${isCommentOpen ? 'open' : ''}`}>
                {/* 댓글 목록 */}
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        currentUser={currentUser}
                        onDelete={handleDeleteComment}
                        onEdit={handleEditComment}
                    />
                ))}

                {/* 새 댓글 입력 영역 */}
                <div>
                    <input
                        className="community-new-comment-input"
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="button" className="community-comment-write-button" onClick={handleAddComment}>
                        댓글 작성
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommunityPostBox;
