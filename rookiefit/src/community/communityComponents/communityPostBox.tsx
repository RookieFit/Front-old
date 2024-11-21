import { useState } from 'react';
import './communityPostBox.css';

interface Comment {
    id: number;
    postId: number;
    author: string; // 댓글 작성자 이름
    date: string;
    content: string;
}

interface Post {
    category: string;
    title: string;
    author: string;
    date: string;
    images: string[];
    content: string;
    comments: Comment[];
}

interface CommunityPostBoxProps {
    post: Post;
    currentUser: string; // 현재 사용자 이름 추가
}

function CommunityPostBox({ post, currentUser }: CommunityPostBoxProps) {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [comments, setComments] = useState(post.comments); // 댓글 상태 관리
    const [newComment, setNewComment] = useState(''); // 새 댓글 입력 값
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정 중인 댓글 ID
    const [editedContent, setEditedContent] = useState(''); // 수정 중인 댓글 내용

    // 댓글 열기/닫기 토글 핸들러
    const handleCommentToggle = () => {
        setIsCommentOpen((prev) => !prev);
    };

    // 댓글 추가 핸들러
    const handleAddComment = () => {
        if (newComment.trim() === '') return;
        const newCommentObj: Comment = {
            id: Date.now(),
            postId: post.id,
            author: currentUser, // 현재 사용자 이름으로 댓글 작성
            date: new Date().toLocaleString(),
            content: newComment,
        };
        setComments([...comments, newCommentObj]);
        setNewComment(''); // 입력란 초기화
    };

    // 댓글 삭제 핸들러
    const handleDeleteComment = (commentId: number) => {
        setComments(comments.filter((comment) => comment.id !== commentId));
    };

    // 댓글 수정 시작 핸들러
    const handleEditComment = (commentId: number, currentContent: string) => {
        setEditingCommentId(commentId);
        setEditedContent(currentContent);
    };

    // 댓글 수정 저장 핸들러
    const handleSaveEdit = () => {
        setComments(
            comments.map((comment) =>
                comment.id === editingCommentId
                    ? { ...comment, content: editedContent }
                    : comment
            )
        );
        setEditingCommentId(null); // 수정 모드 해제
        setEditedContent(''); // 수정 내용 초기화
    };

    // 댓글 수정 취소 핸들러
    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditedContent('');
    };

    return (
        <div className="post-box">
            {/* 카테고리 */}
            <p className="post-category">{post.category}</p>

            {/* 게시글 제목 */}
            <h3 className="post-title">{post.title}</h3>

            {/* 게시글 작성자 및 날짜 */}
            <div className="post-header">
                <p className="author">{post.author}</p>
                <p className="date">{post.date}</p>
            </div>

            {/* 이미지 (최대 3장) */}
            <div className="post-images">
                {post.images.slice(0, 3).map((image, index) => (
                    <div
                        key={index}
                        className="post-image"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}
            </div>

            {/* 게시글 본문 */}
            <p className="post-content">{post.content}</p>

            {/* 댓글 버튼 */}
            <button className="comment-button" onClick={handleCommentToggle}>
                {isCommentOpen ? '댓글 닫기' : '댓글 보기'}
            </button>

            {/* 댓글 영역 */}
            <div className={`comments-section ${isCommentOpen ? 'open' : ''}`}>
                {/* 댓글 리스트 */}
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        {editingCommentId === comment.id ? (
                            <div className="edit-comment">
                                <input
                                    type="text"
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                />
                                <button onClick={handleSaveEdit}>저장</button>
                                <button onClick={handleCancelEdit}>취소</button>
                            </div>
                        ) : (
                            <p>
                                <strong>{comment.author}</strong> ({comment.date}):{' '}
                                {comment.content}
                            </p>
                        )}
                        {/* 댓글 수정/삭제 버튼 (작성자만 표시) */}
                        {comment.author === currentUser && (
                            <div className="comment-actions">
                                <button
                                    onClick={() =>
                                        handleEditComment(comment.id, comment.content)
                                    }
                                >
                                    수정
                                </button>
                                <button onClick={() => handleDeleteComment(comment.id)}>
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {/* 새 댓글 입력 */}
                <div className="new-comment">
                    <input
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddComment();
                            }
                        }}
                    />
                    <button onClick={handleAddComment}>댓글 작성</button>
                </div>
            </div>
        </div>
    );
}

export default CommunityPostBox;
