import React, { useState } from 'react'

const [isFooterVisible, setIsFooterVisible] = useState(false);
const handleFooterToggle = () => {
    setIsFooterVisible(!isFooterVisible);
};


const MyPageFooter = () => {
    return (
        <div>
            <input className='my-footer-circle' onClick={handleFooterToggle}/>
            {isFooterVisible &&
                <div className='my-footer-visible-box'>
                    <input className='my-footer-visible-box-chat-log' type='' value={'채팅 기록'}/>
                    <input className='my-footer-visible-box-market-log' type='' value={'거래 내역'}/>
                    <input className='my-footer-visible-box-community-list' type='' value={'게시글 목록'}/>
                    <input className='my-footer-visible-box-inquiry' type='' value={'1대1 문의 하기'}/>
                </div>}

        </div>
    )
}

export default MyPageFooter