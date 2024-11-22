import { useState } from 'react';
import './communityPostBox.css';

interface Comment {
    id: number;
    postId: string;
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
    id: string;
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

    const handleCommentToggle = () => setIsCommentOpen((prev) => !prev);

    const handleAddComment = () => {
        if (newComment.trim() === '') return;
        const newCommentObj: Comment = {
            id: Date.now(),
            postId: post.id,
            author: currentUser,
            date: new Date().toLocaleString(),
            content: newComment,
        };
        setComments([...comments, newCommentObj]);
        setNewComment('');
    };

    const handleDeleteComment = (commentId: number) => {
        setComments(comments.filter((comment) => comment.id !== commentId));
    };

    const handleEditComment = (commentId: number, currentContent: string) => {
        setEditingCommentId(commentId);
        setEditedContent(currentContent);
    };

    const handleSaveEdit = () => {
        setComments(
            comments.map((comment) =>
                comment.id === editingCommentId
                    ? { ...comment, content: editedContent }
                    : comment
            )
        );
        setEditingCommentId(null);
        setEditedContent('');
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditedContent('');
    };

    return (
        <div className="post-box">
            <p className="post-category">{post.category}</p>
            <h3 className="post-title">{post.title}</h3>
            <div className="post-header">
                <p className="author">{post.author}</p>
                <p className="date">{post.date}</p>
            </div>
            <div className="post-images">
                {post.images.slice(0, 3).map((image, index) => (
                    <div
                        key={index}
                        className="post-image"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}
            </div>
            <p className="post-content">{post.content}</p>
            <button className="comment-button" onClick={handleCommentToggle}>
                {isCommentOpen ? '댓글 닫기' : '댓글 보기'}
            </button>
            <div className={`comments-section ${isCommentOpen ? 'open' : ''}`}>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        {editingCommentId === comment.id ? (
                            <div className="edit-comment">
                                <input
                                    type="text"
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className="edit-input"
                                />
                                <button onClick={handleSaveEdit} className="edit-save-button">
                                    저장
                                </button>
                                <button onClick={handleCancelEdit} className="edit-cancel-button">
                                    취소
                                </button>
                            </div>
                        ) : (
                            <p>
                                <strong>{comment.author}</strong> ({comment.date}):{' '}
                                {comment.content}
                            </p>
                        )}
                        {comment.author === currentUser && (
                            <div className="comment-actions">
                                <button
                                    className="comment-edit-button"
                                    onClick={() =>
                                        handleEditComment(comment.id, comment.content)
                                    }
                                >
                                    수정
                                </button>
                                <button
                                    className="comment-delete-button"
                                    onClick={() => handleDeleteComment(comment.id)}
                                >
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                <div className="new-comment">
                    <input
                        className="new-comment-input"
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment();
                        }}
                    />
                    <button className="comment-button" onClick={handleAddComment}>
                        댓글 작성
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommunityPostBox;
