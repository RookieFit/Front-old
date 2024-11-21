import './myPage.css';
import React from 'react';
import TopMainBoxEdit from './myPage/topBox/topMainBox/topMainBoxEdit';
import GraphBoxEdit from './myPage/bottomBox/graphBoxEdit';


const MyPageEdit = () => {
    return (
        <div className="main-box">
            <div className='top-box'>
                <TopMainBoxEdit/>
            </div>
            <div className='bottom-box'>
                <GraphBoxEdit/>
            </div> 
        </div>
    )       
};

export default MyPageEdit;
