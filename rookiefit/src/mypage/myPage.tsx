import './myPage.css';
import React from 'react';
import TopMainBox from './myPage/topBox/topMainBox/topMainBox';
import GraphBox from './myPage/bottomBox/graphBox';
import MyPageFooter from './components/myPageFooter';




const MyPage = () => {
    return (
        <div className="main-box">
            <div className='top-box'>
                <TopMainBox />
            </div>
            <div className='bottom-box'>
                <GraphBox />
            </div>
            <footer>
                <MyPageFooter/>
            </footer>
        </div>

    )
};

export default MyPage
