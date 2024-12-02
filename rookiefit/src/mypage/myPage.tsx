import './myPage.css';
import React, { useState } from 'react';
import TopMainBox from './myPage/topBox/topMainBox/topMainBox';
import GraphBox from './myPage/bottomBox/graphBox';
import MyPageFooter from './components/myPageFooter';

const MyPage = () => {
    const [role, setRole] = useState('user');

    const toggleRole = () => {
        setRole(prevRole => prevRole === 'user' ? 'trainer' : 'user');
    };

    return (
        <div className="main-box">
            <button onClick={toggleRole} className="role-toggle-button">
                {role === 'user' ? '트레이너로 전환' : '일반 사용자로 전환'}
            </button>
            <div>
                <div className='top-box'>
                    <TopMainBox role={role} />
                </div>
                <div className='bottom-box'>
                    <GraphBox />
                </div>
            </div>
            <div className='mypage-footer-cirle'>
                <MyPageFooter />
            </div>
             
        </div>
    )
};

export default MyPage;