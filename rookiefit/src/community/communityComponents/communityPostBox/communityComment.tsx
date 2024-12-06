import React, { useState } from 'react';
import './communityComment.css';

interface CommentProps {
    comment: {
        communityListId: number; // 게시글 ID
        answerContent: string; // 댓글 내용
        answerCreatedDate: string; // 댓글 작성일
        communityAnswerListId: string; // 댓글 ID
        author: string; // 댓글 작성자 ID (현재 사용자를 비교)
    };
    currentUser: string; // 현재 사용자
    onDelete?: (id: string) => void; // 삭제 처리 함수
    onEdit?: (id: string, newContent: string) => void; // 수정 처리 함수
}

function CommunityComment({ comment, currentUser, onDelete, onEdit }: CommentProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.answerContent);

    // 수정 모드 활성화
    const startEditing = () => setIsEditing(true);

    // 수정 내용 저장
    const saveEdit = () => {
        if (editedContent !== comment.answerContent && onEdit) {
            onEdit(comment.communityAnswerListId, editedContent);
        }
        setIsEditing(false);
    };

    // 수정 및 삭제 권한 확인
    const canEditOrDelete = comment.author === currentUser;

    return (
        <div className="community-comment">
            <p>
                <strong>{comment.author}</strong> ({comment.answerCreatedDate})
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
                <p className="comment-content">{comment.answerContent}</p>
            )}

            {canEditOrDelete && (
                <div className="comment-actions">
                    {onDelete && !isEditing && (
                        <button onClick={() => onDelete(comment.communityAnswerListId)}>삭제</button>
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
