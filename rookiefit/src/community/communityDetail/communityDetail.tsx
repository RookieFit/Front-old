import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyPosts } from '../communityList/dummydata';
import CommunityComment from '../communityComponents/communityPostBox/communityComment';
import './communityDetail.css';

const CommunityDetail = () => {
    // URL 매개변수로부터 `id`를 가져옵니다.
    const { id } = useParams<{ id: string }>();
    // 페이지 이동을 위한 hook
    const navigate = useNavigate();

    // 게시물을 `dummyPosts` 배열에서 찾아옵니다.
    const post = dummyPosts.find((p) => p.id === Number(id));

    // 댓글 목록 상태 관리
    const [comments, setComments] = useState(post?.comments || []);
    // 새로운 댓글 내용 상태 관리
    const [newComment, setNewComment] = useState('');
    // 현재 사용자 정보
    const currentUser = '현재사용자이름';

    // 게시물 수정 상태 관리
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(post?.title || '');
    const [editedContent, setEditedContent] = useState(post?.content || '');

    // 댓글 추가 함수
    const handleAddComment = () => {
        if (newComment.trim() === '') {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        // 새 댓글 객체 생성
        const newCommentObj = {
            id: Date.now(), // 현재 시간을 ID로 사용
            postId: post?.id || 0, // 게시물 ID
            author: currentUser, // 작성자
            date: new Date().toLocaleString(), // 현재 시간
            content: newComment, // 댓글 내용
        };

        // 댓글 목록 업데이트
        setComments((prevComments) => [...prevComments, newCommentObj]);
        setNewComment(''); // 입력란 초기화
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

    // 게시물 수정 모드 전환 및 저장
    const handleEditPost = () => {
        if (isEditing) {
            alert('게시물이 수정되었습니다.');
        }
        setIsEditing(!isEditing);
    };

    // 게시물 삭제 함수
    const handleDeletePost = () => {
        if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            alert('게시물이 삭제되었습니다.');
            navigate('/community'); // 커뮤니티 목록 페이지로 이동
        }
    };

    // 게시물이 없는 경우
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
        <div className="community-detail-wrapper">
            <div className="community-detail-container">
                {/* 게시물 상단 */}
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

                {/* 게시물 내용 */}
                <div className="community-detail-body">
                    <div className="community-detail-content">
                        {post.images.length > 0 && (
                            <div className="community-detail-image-container">
                                {post.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Post Image ${index + 1}`}
                                        className="community-detail-post-image"
                                    />
                                ))}
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

                {/* 게시물 액션 버튼 */}
                <div className="community-detail-actions">
                    <button onClick={handleEditPost} className="community-detail-edit-button">
                        {isEditing ? '저장' : '수정'}
                    </button>
                    <button onClick={handleDeletePost} className="community-detail-delete-button">
                        삭제
                    </button>
                </div>

                {/* 댓글 섹션 */}
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

                    {/* 새 댓글 작성 */}
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

                {/* 하단 버튼 */}
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
