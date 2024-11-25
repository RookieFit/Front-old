import './myPage.css';
import React from 'react';
import TopMainBox from './myPage/topBox/topMainBox/topMainBox';
import GraphBox from './myPage/bottomBox/graphBox';
import MyPageFooter from './components/myPageFooter';

const MyPage = () => {
    return (
        <div className="main-box">
            <div>
                <div className='top-box'>
                    <TopMainBox />
                </div>
                <div className='bottom-box'>
                    <GraphBox />
                </div>
            </div>
            <div className='mypage-footer-cirle'>
                <MyPageFooter />
            </div>
        </div>

    )
};

export default MyPage
