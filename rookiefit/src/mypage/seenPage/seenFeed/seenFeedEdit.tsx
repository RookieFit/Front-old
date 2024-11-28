import React, { useState } from 'react';
import './seenFeed.css';

// 더미 사용자 데이터
const mockUser = { role: 'trainer' };

const SeenFeedEdit = () => {
  const [isFocused, setIsFocused] = useState(false); // 텍스트 영역 포커스 상태
  const currentUser = mockUser; // 현재 사용자 데이터를 바로 설정

  return (
    <div className="seen-feed-right-box">
      {/* 트레이너 역할일 경우에만 렌더링 */}
      {currentUser.role === 'trainer' && (
        <div className="seen-feed-trainer-box">
          <div className="seen-feed-banner">트레이너 경력</div>
          <input
            type="text"
            className={`seen-feed-textarea ${isFocused ? 'focused' : ''}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? '' : '입력하세요'}
          />
          <div className="seen-feed-photo">트레이너 대표 사진</div>
        </div>
      )}

    </div>
  );
};

export default SeenFeedEdit;
