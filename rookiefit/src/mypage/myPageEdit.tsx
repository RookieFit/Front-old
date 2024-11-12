import './myPage.css';
import React from 'react';
import TopMainBoxEdit from './topBox/topMainBoxEdit';
import GraphBoxEdit from './bottomBox/graphBoxEdit';

const MyPageEdit = () => {
    return (
        <div className="mainBox">
            <div className='topBox'>
                <TopMainBoxEdit/>
            </div>
            <div className='bottomBox'>
                <GraphBoxEdit/>
            </div> 
        </div>
    )       
};

export default MyPageEdit;
