import React, { useState } from 'react';
import './seenFeed.css';
import SeenFeedGridPhoto from './seenFeedcommunityComponents/seenFeedGridPhoto';
import SeenFeedGridBox from './seenFeedcommunityComponents/seenFeedGridBox';

interface Props {
  role: string;
  showBackground?: boolean; // 새로운 prop 추가
}

const SeenFeed = ({ role, showBackground }: Props) => {
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  return (
    <div className={showBackground ? "seen-feed-right-back" : ""}>
      {role === 'trainer' ? (
        <div className="seen-feed-trainer-box">
          <div className="seen-feed-banner">트레이너 경력</div>
          <input
            type="text"
            spellCheck="false"
            className={`seen-feed-textarea ${isTextareaFocused ? 'focused' : ''}`}
            onFocus={() => setIsTextareaFocused(true)}
            onBlur={() => setIsTextareaFocused(false)}
            placeholder={isTextareaFocused ? '' : '입력하세요'}
          />
          <div className="seen-feed-photo">트레이너 대표 사진</div>
          <SeenFeedGridPhoto />
        </div>
      ) : (
        <>
          <div className="seen-feed-photo">사진첩</div>
          <SeenFeedGridPhoto />
        </>
      )}
    </div>
  );
};

export default SeenFeed;