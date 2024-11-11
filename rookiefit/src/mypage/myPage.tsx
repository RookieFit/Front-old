import './myPage.css';
import React from 'react';
import GraphBox from './bottomBox/graphBox';
import TopMainBox from './topBox/topMainBox';

interface props {
    title: string;
    placeholder: string;
    type: 'text';
    value: string;
    //onChange : (event: ChangeEvent<HTMLInputElement>) => void;
    //onKeydown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}
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
