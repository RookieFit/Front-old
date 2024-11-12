import './graphBox.css';
import React from 'react';
   
const GraphBoxEdit = () => {
    return (
        <div className="bottomMainBox">
            <div className='graph-box'>
                체중 변화 그래프
            </div>
            <div className='graph-box'>
                근육량 변화 그래프
            </div>
            <div className='graph-box'>
                체지방 변화 그래프
            </div>
        </div>
    )
};

export default GraphBoxEdit;