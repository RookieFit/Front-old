import React, { useState } from 'react';
import Comment from './communityComment';
import PostImages from './postImages';
import './communityPostBox.css';

interface Post {
    category: string;
    title: string;
    author: string;
    date: string;
    images: string[];
    content: string;
    comments: { id: number; author: string; date: string; content: string }[];
    id: string;
}

interface CommunityPostBoxProps {
    post: Post;
    currentUser: string; // 현재 사용자
}

function CommunityPostBox({ post, currentUser }: CommunityPostBoxProps) {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState('');

    const handleCommentToggle = () => setIsCommentOpen((prev) => !prev);

    const handleAddComment = () => {
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

    const truncateContent = (content: string, maxLength: number) => {
        return content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
    };

    return (
        <div className="post-box">
            <p className="post-category">{post.category}</p>
            <h3 className="post-title">{post.title}</h3>
            <div className="post-header">
                <p className="author">{post.author}</p>
                <p className="date">{post.date}</p>
            </div>

            <PostImages images={post.images} />

            <p className="post-content">{truncateContent(post.content, 150)}</p>

            <button className="comment-button" onClick={handleCommentToggle}>
                {isCommentOpen ? '댓글 닫기' : '댓글 보기'}
            </button>

            <div className={`comments-section ${isCommentOpen ? 'open' : ''}`}>
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        currentUser={currentUser} // 현재 사용자 전달
                        onDelete={handleDeleteComment}
                        onEdit={handleEditComment}
                    />
                ))}

                <div className="new-comment">
                    <input
                        className="new-comment-input"
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
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
