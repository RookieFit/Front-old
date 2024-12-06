import React, { useState } from 'react';
import './communityComment.css';

interface CommentProps {
    comment: {
        id: number;
        author: string;
        date: string;
        content: string;
    };
    currentUser: string; // 현재 사용자
    onDelete?: (id: number) => void; // 삭제 처리 함수
    onEdit?: (id: number, newContent: string) => void; // 수정 처리 함수
}

function CommunityComment({ comment, currentUser, onDelete, onEdit }: CommentProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    // 수정 모드 활성화
    const startEditing = () => setIsEditing(true);

    // 수정 내용 저장
    const saveEdit = () => {
        if (editedContent !== comment.content && onEdit) {
            onEdit(comment.id, editedContent);
        }
        setIsEditing(false);
    };

    // 수정 및 삭제 권한 확인
    const canEditOrDelete = comment.author === currentUser;

    return (
        <div className="community-comment">
            <p>
                <strong>{comment.author}</strong> ({comment.date})
            </p>

            {isEditing ? (
                <div className="editing-section">
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button onClick={saveEdit}>저장</button>
                    <button onClick={() => setIsEditing(false)}>취소</button>
                </div>
            ) : (
                <p className="comment-content">{comment.content}</p>
            )}

            {canEditOrDelete && (
                <div className="comment-actions">
                    {onDelete && !isEditing && (
                        <button onClick={() => onDelete(comment.id)}>삭제</button>
                    )}
                    {!isEditing && (
                        <button onClick={startEditing}>수정</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default CommunityComment;
