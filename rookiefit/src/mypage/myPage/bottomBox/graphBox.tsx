import './graphBox.css';
import React, { useState, useRef } from 'react';
import GraphDate from './graphDate';
import GraphDuobleDate from './graphDuobleDate';

const GraphBox = () => {
    const [isVisible, setIsVisible] = useState(false);
    const expandedGraphRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsVisible(!isVisible);

        if (!isVisible) {
            setTimeout(() => {
                expandedGraphRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100); //그래프 로딩 시간
        }
    };

    return (
        <div className="bottom-main-box">
            <div>
                <GraphDuobleDate 
                    title={'체중 변화 그래프'}
                    nameWeight={'체중 변화량'}
                    weights={[65, 59, 57, 56, 54, 58, 78, 54, 54, 52, 53, 66, 59, 57, 68]}
                    nameHeight={'키 변화량'}
                    heights={[140, 141, 140, 141, 141, 141, 140, 140, 140, 141, 141, 141, 140, 140, 140]}
                />
                <GraphDate 
                    title={'칼로리 변화 그래프'}
                    name={'칼로리 변화량'}
                    values={[2502, 2422, 2123, 2215, 2155, 2882, 2923, 2524, 2925, 2654, 3023, 3522, 2023, 2524, 3023]}
                />
                <button className="toggle-graph-box" onClick={handleToggle}>
                    {isVisible ? '닫기' : '더 보기'}
                </button>
                {isVisible && (
                    <div ref={expandedGraphRef}>
                        <GraphDate 
                            title={'근육량 변화 그래프'}
                            name={'근육량 변화량'}
                            values={[22, 24, 21, 22, 21, 22, 23, 24, 25, 24, 23, 22, 23, 24, 23]}
                        />
                        <GraphDate 
                            title={'체지방량 변화 그래프'}
                            name={'체지방 변화'}
                            values={[25, 24, 23, 22, 24, 25, 26, 27, 28, 29, 28, 27, 26, 24, 25]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GraphBox;
