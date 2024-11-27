import React, { useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import Comment from './communityComment';
import './communityPostBox.css';

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
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState('');

    // 슬라이더 설정
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true, // 이미지 크기에 맞게 슬라이드 높이 자동 조정
    };

    // 댓글 섹션 토글 함수
    const handleCommentToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsCommentOpen((prev) => !prev);
    };

    // 새 댓글 추가 함수
    const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newComment.trim() === '') return;
        const newCommentObj = {
            id: Date.now(),
            author: currentUser,
            date: new Date().toLocaleString(),
            content: newComment,
        };
        setComments((prevComments) => [...prevComments, newCommentObj]);
        setNewComment('');
    };


    // 게시물 클릭 시 상세 페이지로 이동
    const handleClick = (id: number) => {
        navigate(`/community/detail/${id}`);
    };

    const truncateContent = (content: string, maxLength: number) => {
        return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
    };

    return (
        <div className="post-box">
            <div className="post-details">
                {/* 게시물 카테고리 */}
                <p
                    className="post-category"
                    onDoubleClick={() => handleClick(post.id)} // 더블클릭 시 상세 페이지로 이동
                >
                    {post.category}
                </p>
                {/* 게시물 제목 */}
                <h3
                    className="post-title"
                    onDoubleClick={() => handleClick(post.id)} // 더블클릭 시 상세 페이지로 이동
                >
                    {post.title}
                </h3>
                {/* 게시물 헤더 (작성자, 날짜) */}
                <div className="post-header">
                    <p className="author">{post.author}</p>
                    <p className="date">{post.date}</p>
                </div>

                {/* 게시물 이미지 슬라이더 */}
                {post.images && post.images.length > 0 && (
                    <div className="post-images-slider">
                        <Slider {...settings}>
                            {post.images.map((image, index) => (
                                <div key={index} className="slider-item">
                                    <img
                                        src={image}
                                        alt={`${post.title} ${index + 1}`}
                                        className="post-image"
                                        draggable // 드래그 가능하도록 설정
                                        onDoubleClick={() => handleClick(post.id)} // 더블클릭 시 상세 페이지로 이동
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}

                {/* 게시물 내용 (축약) */}
                <p className="post-content">{truncateContent(post.content, 150)}</p>
            </div>

            {/* 댓글 보기/닫기 버튼 */}
            <div className="community-slide-button-container">
                <button type="button" className="community-comment-slide-button" onClick={handleCommentToggle}>
                    {isCommentOpen ? '댓글 닫기' : '댓글 보기'}
                </button>
            </div>

            {/* 댓글 섹션 */}
            <div className={`comments-section ${isCommentOpen ? 'open' : ''}`}>
                {/* 댓글 목록 */}
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        currentUser={currentUser}
                    />
                ))}

                {/* 새 댓글 입력 영역 */}
                <form className="community-write-comment-container" onSubmit={handleAddComment}>
                    <input
                        className="community-new-comment-input"
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit" className="community-comment-write-button">
                        댓글 작성
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CommunityPostBox;
