import React, { useState } from 'react';
import './communityComment.css'

interface CommentProps {
    comment: {
        id: number;
        author: string;
        date: string;
        content: string;
    };
    currentUser: string; // 현재 사용자
    onDelete: (id: number) => void; // 삭제 처리 함수
    onEdit: (id: number, newContent: string) => void; // 수정 처리 함수
}

function CommunityComment({ comment, currentUser, onDelete, onEdit }: CommentProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = () => {
        if (editedContent !== comment.content) {
            onEdit(comment.id, editedContent);
        }
        setIsEditing(false);
    };

    // 현재 사용자가 댓글 작성자인지 확인
    const canEditOrDelete = comment.author === currentUser;

    return (
        <div className="community-comment">
            <p>
                <strong>{comment.author}</strong> ({comment.date})
            </p>

            {isEditing ? (
                <div>
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button onClick={handleSaveClick}>저장</button>
                    <button onClick={() => setIsEditing(false)}>취소</button>
                </div>
            ) : (
                <p>{comment.content}</p>
            )}

            {/* 본인이 작성한 댓글만 수정/삭제 가능 */}
            {canEditOrDelete && !isEditing && (
                <div className='comment-actions'>
                    <button onClick={() => onDelete(comment.id)} >삭제</button>
                    <button onClick={handleEditClick}>수정</button>
                </div>
            )}
        </div>
    );
}

export default CommunityComment;
