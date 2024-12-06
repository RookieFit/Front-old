import React, { useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import Comment from './communityComment';
import './communityPostBox.css';
import { UserCommunityAnswerRequest } from '../../../apis/api/communityApi'; // 수정된 API import
import { getJwtToken } from '../../../authCheck/storageUtils';

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
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState('');

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true,
    };

    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newComment.trim() === '') return;

        const newCommentObj = {
            communityListId: post.id,  // 게시물 ID
            communityAnswerListId: currentUser, // 댓글 작성자 (userId 또는 유니크 식별자 사용)
            answerContent: newComment,  // 댓글 내용
            answerCreatedDate: new Date().toISOString(),  // 작성 시간 (ISO 포맷)
            author: currentUser,  // 댓글 작성자
        };

        setComments((prevComments) => [...prevComments, {
            id: Date.now(),
            author: currentUser,
            date: new Date().toLocaleString(),
            content: newComment
        }]);
        setNewComment(''); // 댓글 입력 필드 비우기

        try {
            // API 호출: 댓글 등록
            const response = await UserCommunityAnswerRequest(newCommentObj);

            console.log('댓글 작성 성공:', response); // 서버에서 응답이 오면 출력
        } catch (error) {
            console.error('댓글 작성 실패:', error); // 오류 발생 시 출력
        }
    };

    const handleDeleteComment = (commentId: number) => {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        // 실제 삭제 요청을 위한 API 호출 로직을 추가할 수 있습니다.
    };

    const handleCommentToggle = () => {
        setIsCommentOpen((prev) => !prev);
    };

    const truncateContent = (content: string, maxLength: number) => {
        return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
    };

    const handleDetailClick = () => {
        navigate(`/community/detail/${post.id}`);
    };

    return (
        <div className="post-box">
            <div className="post-details">
                <p className="post-category">{post.category}</p>
                <h3 className="post-title">{post.title}</h3>
                <div className="post-header">
                    <p className="author">{post.author}</p>
                    <p className="date">{post.date}</p>
                </div>

                {post.images && post.images.length > 0 && (
                    <div className="post-images-slider">
                        <Slider {...settings}>
                            {post.images.map((image, index) => (
                                <div key={index} className="slider-item">
                                    <img
                                        src={image}
                                        alt={`${post.title} ${index + 1}`}
                                        className="post-image"
                                        draggable
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}

                <p className="post-content">{truncateContent(post.content, 150)}</p>

                {post.content.length > 1 && (
                    <button onClick={handleDetailClick} className="more-button">
                        ...더보기
                    </button>
                )}
            </div>

            <div className="community-slide-button-container">
                <button type="button" className="community-comment-slide-button" onClick={handleCommentToggle}>
                    {isCommentOpen ? '댓글 닫기' : '댓글 보기'}
                </button>
            </div>

            <div className={`comments-section ${isCommentOpen ? 'open' : ''}`}>
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        currentUser={currentUser}
                        onDelete={handleDeleteComment}
                    />
                ))}

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
