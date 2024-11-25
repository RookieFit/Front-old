import React, { useState } from 'react'
import './myPageFooter.css'


const MyPageFooter = () => {
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const handleFooterToggle = () => {
        setIsFooterVisible(!isFooterVisible);
    };
    return (
        <div>
            <image className='my-footer-circle' onClick={handleFooterToggle} >
                {isFooterVisible &&
                    <div className='my-footer-visible-box'> 나의 발자취
                        <div className='my-footer-visible-inbox'>
                            <input className='my-footer-visible-box-chat-log'
                                type='button'
                                value={'채팅 기록'} />
                            <input className='my-footer-visible-box-market-log'
                                type='button'
                                value={'거래 내역'} />
                            <input className='my-footer-visible-box-community-list'
                                type='button'
                                value={'게시글 목록'} />
                            <input className='my-footer-visible-box-inquiry'
                                type='button'
                                value={'1대1 문의 하기'} />
                        </div>
                    </div>
                }
            </image>
        </div>
    )
}

export default MyPageFooter