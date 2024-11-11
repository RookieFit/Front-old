import './myPage.css';
import React from 'react';
import GraphBox from './bottomBox/graphBox';
import TopMainBox from './topBox/topMainBox';

const MyPage = () => {
    return (
        <div className="mainBox">
            <div className='topBox'>
                <TopMainBox/>
            </div>
            <div className='bottomBox'>
                <GraphBox/>
            </div> 
        </div>
    )       
};

export default MyPage
