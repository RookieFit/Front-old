import React, { useState, useEffect } from 'react';
import './seenFeed.css';

const SeenFeedEdit = () => {
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  // 기본 사용자 데이터를 바로 설정
  const [currentUser, setCurrentUser] = useState({ role: 'user' });

  // `users`를 더미 데이터로 유지할 필요가 없어서 제거

  return (
    <div className="seen-feed-right-box">
      {/* 사용자 역할에 따라 UI 조건부 렌더링 */}
      {currentUser.role === 'trainer' ? (
        <div className="seen-feed-trainer-box">
          <div className="seen-feed-banner">트레이너 경력</div>
          <input
            type="text"
            className={`seen-feed-textarea ${isTextareaFocused ? 'focused' : ''}`}
            onFocus={() => setIsTextareaFocused(true)}
            onBlur={() => setIsTextareaFocused(false)}
            placeholder={isTextareaFocused ? '' : '입력하세요'}
          />
        </div>
      ) : (
        <div className="seen-feed-photo">사진첩</div>
      )}
    </div>
  );
};

export default SeenFeedEdit;
