import './graphBox.css';
import React from 'react';
import GraphDate from './graphDate';

const GraphBoxEdit = () => {
    return (
        <div className="bottom-main-box">
            <GraphDate title={'체중 변화 그래프'} name={'체중 변화량'}
                values={[65, 59, 57, 56, 54, 58, 78, 54, 54, 52, 53, 66, 59, 57, 68]} graphMinHight={45} graphMaxHight={85} />
            <GraphDate title={'근육량 변화 그래프'} name={'근육량 변화량'}
                values={[22, 24, 21, 22, 21, 22, 23, 24, 25, 24, 23, 22, 23, 24, 23]} graphMinHight={10} graphMaxHight={30} />
            <GraphDate title={'체지방량 변화 그래프'} name={'체지방 변화'}
                values={[25, 24, 23, 22, 24, 25, 26, 27, 28, 29, 28, 27, 26, 24, 25]} graphMinHight={10} graphMaxHight={30} />
        </div>
    )
};

export default GraphBoxEdit;