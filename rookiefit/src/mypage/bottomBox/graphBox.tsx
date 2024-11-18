import './graphBox.css';
import React from 'react';
import GraphDate from './graphDate';

const GraphBox = () => {
    return (
        <div className="bottom-main-box">
            <GraphDate />
            <GraphDate />
            <GraphDate />
        </div>
    )
};

export default GraphBox;