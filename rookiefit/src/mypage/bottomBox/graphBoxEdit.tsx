import './graphBox.css';
import React from 'react';
import GraphDate from './graphDate';
   
const GraphBoxEdit = () => {
    return (
        <div className="bottomMainBox">
            <GraphDate/>
            <GraphDate/>
            <GraphDate/>
        </div>
    )
};

export default GraphBoxEdit;