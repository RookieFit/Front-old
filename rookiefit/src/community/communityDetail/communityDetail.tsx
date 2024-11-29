import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyPosts } from '../communityList/dummydata';
import CommunityComment from '../communityComponents/communityPostBox/communityComment';
import Slider from 'react-slick';  // Import the Slider component
import './communityDetail.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CommunityDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const post = dummyPosts.find((p) => p.id === Number(id));

    const [comments, setComments] = useState(post?.comments || []);
    const [newComment, setNewComment] = useState('');
    const currentUser = '현재사용자이름';
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post?.title || '');
    const [editedContent, setEditedContent] = useState(post?.content || '');

    const handleAddComment = () => {
        if (newComment.trim() === '') {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        const newCommentObj = {
            id: Date.now(),
            postId: post?.id || 0,
            author: currentUser,
            date: new Date().toLocaleString(),
            content: newComment,
        };

        setComments((prevComments) => [...prevComments, newCommentObj]);
        setNewComment('');
    };

    const handleDeleteComment = (id: number) => {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    };

    const handleEditComment = (id: number, newContent: string) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id ? { ...comment, content: newContent } : comment
            )
        );
    };

    const handleEditPost = () => {
        if (isEditing) {
            alert('게시물이 수정되었습니다.');
        }
        setIsEditing(!isEditing);
    };

    const handleDeletePost = () => {
        if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            alert('게시물이 삭제되었습니다.');
            navigate('/community');
        }
    };

    if (!post) {
        return (
            <div className="community-detail-container">
                <h2>게시물을 찾을 수 없습니다.</h2>
                <button onClick={() => navigate('/community')} className="go-back-button">
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    const sliderSettings = {
        dots: true,
        infinite: false, // 이미지가 3개 이상일 때만 루프
        speed: 500,
        slidesToShow: Math.min(3, post.images.length), // 이미지 수가 3개 미만이면 해당 수만큼 표시
        slidesToScroll: 1,
        autoplaySpeed: 2000,
    };

    return (
        <div className="community-detail-wrapper">
            <div className="community-detail-container">
                <div className="community-detail-header">
                    <h3 className="community-detail-category">{post.category}</h3>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="community-detail-title-edit"
                        />
                    ) : (
                        <h1 className="community-detail-title">{post.title}</h1>
                    )}
                    <div className="community-detail-author-time">
                        <p><strong>작성자:</strong> {post.author}</p>
                        <p><strong>작성 시간:</strong> {post.date}</p>
                    </div>
                </div>

                <div className="community-detail-body">
                    <div className="community-detail-content">
                        {post.images.length > 0 && (
                            <div className="community-detail-image-container">
                                <Slider {...sliderSettings}>
                                    {post.images.map((image, index) => (
                                        <div key={index}>
                                            <img
                                                src={image}
                                                alt={`Post Image ${index + 1}`}
                                                className="community-detail-post-image"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        )}
                        {isEditing ? (
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="community-detail-content-edit"
                            />
                        ) : (
                            <p>{post.content}</p>
                        )}
                    </div>
                </div>

                <div className="community-detail-actions">
                    <button onClick={handleEditPost} className="community-detail-edit-button">
                        {isEditing ? '저장' : '수정'}
                    </button>
                    <button onClick={handleDeletePost} className="community-detail-delete-button">
                        삭제
                    </button>
                </div>

                <div className="community-detail-comment-section">
                    <h4>댓글</h4>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <CommunityComment
                                key={comment.id}
                                comment={comment}
                                currentUser={currentUser}
                                onDelete={handleDeleteComment}
                                onEdit={handleEditComment}
                            />
                        ))
                    ) : (
                        <p>댓글이 없습니다.</p>
                    )}

                    <div className="community-new-comment">
                        <h4>댓글 작성</h4>
                        <textarea
                            style={{ resize: 'none' }}
                            placeholder="댓글 내용을 입력하세요"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="community-new-comment-input"
                        />
                        <button onClick={handleAddComment} className="community-comment-button">
                            댓글 작성
                        </button>
                    </div>
                </div>

                <div className="community-detail-footer-buttons">
                    <button onClick={() => navigate('/community')} className="community-detail-go-back-button">
                        목록
                    </button>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="community-detail-top-button"
                    >
                        Top
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommunityDetail;
