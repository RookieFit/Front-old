import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyPosts } from '../communityList/dummydata';
import CommunityComment from '../communityComponents/communityPostBox/communityComment';
import './communityDetail.css';

const CommunityDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // 게시물 ID를 기반으로 게시물 데이터 가져오기
    const post = dummyPosts.find((p) => p.id === Number(id));

    // 댓글 상태 관리
    const [comments, setComments] = useState(post?.comments || []);
    const [newComment, setNewComment] = useState('');
    const currentUser = '현재사용자이름'; // 현재 로그인한 사용자 (예시)

    // 댓글 추가 핸들러
    const handleAddComment = () => {
        if (newComment.trim() === '') {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        const newCommentObj = {
            id: Date.now(),
            postId: post?.id || 0, // post가 undefined일 경우 기본값 0 사용
            author: currentUser,
            date: new Date().toLocaleString(),
            content: newComment,
        };


        setComments((prevComments) => [...prevComments, newCommentObj]);
        setNewComment(''); // 입력 필드 초기화
    };

    // 댓글 삭제 핸들러
    const handleDeleteComment = (id: number) => {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    };

    // 댓글 수정 핸들러
    const handleEditComment = (id: number, newContent: string) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id ? { ...comment, content: newContent } : comment
            )
        );
    };

    // 게시물이 없을 경우 처리
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

    return (
        <div className="community-detail-container">
            {/* 헤더 섹션 */}
            <div className="detail-header">
                <h3 className="category">{post.category}</h3>
                <h1 className="title">{post.title}</h1>
                <div className="author-time">
                    <p><strong>작성자:</strong> {post.author}</p>
                    <p><strong>작성 시간:</strong> {post.date}</p>
                </div>
            </div>

            {/* 본문 섹션 */}
            <div className="detail-body">
                <div className="content">
                    {post.images.length > 0 && (
                        <div className="image-container">
                            {post.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Post Image ${index + 1}`}
                                    className="post-image"
                                />
                            ))}
                        </div>
                    )}
                    <p>{post.content}</p>
                </div>
            </div>

            {/* 댓글 섹션 */}
            <div className="comment-section">
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

                {/* 댓글 작성 섹션 */}
                <div className="community-new-comment">
                    <h4>댓글 작성</h4>
                    <textarea style={
                        {
                            resize: 'none'
                        }
                    }
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

            {/* 하단 버튼 섹션 */}
            <div className="footer-buttons">
                <button onClick={() => navigate('/community')} className="go-back-button">
                    목록
                </button>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="top-button"
                >
                    Top
                </button>
            </div>
        </div>
    );
};

export default CommunityDetail;
