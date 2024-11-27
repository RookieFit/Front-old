import React, { useState } from 'react'
import './seenFeed.css';

const SeenFeed = () => {
  const [isSeenFeedTextareaClicked, setIsSeenFeedTextareaClicked] = useState(false);

  return (
    <div className='seen-feed-right-box'>
      <div className='seen-feed-trainer-box'>
        <div className='seen-feed-banner'>트레이너 경력</div>
        <input
          disabled
          type='text' className='seen-feed-textarea'
          onFocus={() => setIsSeenFeedTextareaClicked(true)}
          onBlur={() => setIsSeenFeedTextareaClicked(false)}
          placeholder={isSeenFeedTextareaClicked === true ? "" : '입력하세요'}
        />
        <div className='seen-feed-photo'>트레이너 대표 사진</div>
      </div>
      암튼 사진 들어가야함 ㅇㅇ

    </div>
  )
};
export default SeenFeed