import './myPage.css';
import React from 'react';
import GraphBox from './bottomBox/graphBox';
import TopMainBox from './topBox/topMainBox';

const MyPage = () => {
    return (
        <div className="main-box">
            <div className='top-box'>
                <TopMainBox/>
            </div>
            <div className='bottom-box'>
                <GraphBox/>
            </div> 
        </div>
    )       
};

export default MyPage
