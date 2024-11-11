import './myPageEdit.css';
import React from 'react';
import TopMainBox2 from './topBox/topMainBox2';
import GraphBox2 from './bottomBox/graphBox2';

const MyPageEdit = () => {
    return (
        <div className="mainBox2">
            <div className='topBox2'>
                <TopMainBox2/>
            </div>
            <div className='bottomBox2'>
                <GraphBox2/>
            </div> 
        </div>
    )       
};

export default MyPageEdit
