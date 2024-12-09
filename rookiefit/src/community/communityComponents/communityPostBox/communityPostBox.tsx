import React, { useState, useRef, useEffect } from 'react'; // useRef 추가
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import Comment from './communityComment';
import './communityPostBox.css';
import { UserCommunityAnswerRequest } from '../../../apis/api/communityApi';
import { getJwtToken } from '../../../authCheck/storageUtils';

interface Post {
    category: string;
    title: string;
    author: string;
    date: string;
    images: string[];
    content: string;
    comments: PostComment[];
    id: number;
}

interface PostComment {
    communityListId: number;
    answerContent: string;
    answerCreatedDate: string;
    communityAnswerListId: number;
    communityAnswerauthor: number;
}

interface CommunityPostBoxProps {
    post: Post;
    currentUser: string;
}

function CommunityPostBox({ post, currentUser }: CommunityPostBoxProps) {
    const navigate = useNavigate();
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState('');

    const commentsSectionRef = useRef<HTMLDivElement>(null); // 댓글 섹션에 대한 참조 추가 (각주 1)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true,
    };

    // 댓글이 추가될 때마다 스크롤을 하단으로 이동시키는 useEffect 추가
    useEffect(() => {
        if (commentsSectionRef.current) {
            commentsSectionRef.current.scrollTop = commentsSectionRef.current.scrollHeight;
        }
    }, [comments]); // 댓글 배열이 변경될 때마다 실행

    const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newComment.trim() === '') return;

        const newCommentObj = {
            communityListId: post.id,
            communityAnswerListId: String(currentUser), // DTO 요구사항에 맞게 string으로 변환
            answerContent: newComment,
            answerCreatedDate: new Date().toISOString(),
            author: currentUser,
        };

        setComments((prevComments) => [
            ...prevComments,
            {
                communityListId: post.id,
                communityAnswerListId: Number(currentUser), // `comments` 상태에서는 number 유지
                answerContent: newComment,
                answerCreatedDate: new Date().toISOString(),
                communityAnswerauthor: Number(currentUser),
            },
        ]);

        setNewComment('');

        try {
            const response = await UserCommunityAnswerRequest(newCommentObj);
            console.log('댓글 작성 성공:', response);
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        }
    };

    const handleDeleteComment = (commentId: number) => {
        setComments((prevComments) => prevComments.filter((comment) => comment.communityAnswerListId !== commentId));
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

            <div className={`comments-section ${isCommentOpen ? 'open' : ''}`} ref={commentsSectionRef}> {/* 각주 1 */}
                {comments.map((comment) => (
                    <Comment
                        key={comment.communityAnswerListId} // 고유한 키로 사용
                        comment={{
                            communityListId: comment.communityListId,
                            author: comment.communityAnswerauthor.toString(), // 작성자는 string으로 변환
                            answerCreatedDate: comment.answerCreatedDate,
                            answerContent: comment.answerContent,
                            communityAnswerListId: comment.communityAnswerListId, // number로 유지
                        }}
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
