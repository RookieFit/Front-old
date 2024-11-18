import './graphBox.css';
import React from 'react';
import GraphDate from './graphDate';

const GraphBoxEdit = () => {
    return (
        <div className="bottom-main-box">
            <GraphDate />
            <GraphDate />
            <GraphDate />
        </div>
    )
};

export default GraphBoxEdit;