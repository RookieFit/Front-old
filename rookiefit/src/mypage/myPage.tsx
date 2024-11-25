import './myPage.css';
import React from 'react';
import TopMainBox from './myPage/topBox/topMainBox/topMainBox';
import GraphBox from './myPage/bottomBox/graphBox';




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
                어쩔 ㅠㅠ
            </footer>
        </div>

    )
};

export default MyPage
