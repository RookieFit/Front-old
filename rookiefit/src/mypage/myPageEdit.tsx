import './myPage.css';
import React, { useState } from 'react';
import TopMainBoxEdit from './myPage/topBox/topMainBox/topMainBoxEdit';
import GraphBoxEdit from './myPage/bottomBox/graphBoxEdit';
import MyPageFooter from './components/myPageFooter';

const MyPageEdit = () => {
    const [role, setRole] = useState('user');

    const toggleRole = () => {
        setRole(prevRole => prevRole === 'user' ? 'trainer' : 'user');
    };
    return (
        <div className="main-box">
            <button onClick={toggleRole} className="role-toggle-button">
                {role === 'user' ? '트레이너로 전환' : '일반 사용자로 전환'}
            </button>
            <div className='top-box'>
                <TopMainBoxEdit role={role} />
            </div>
            <div className='bottom-box'>
                <GraphBoxEdit />
            </div>
            <footer className='mypage-footer-cirle'>
                <MyPageFooter />
            </footer>
        </div>
    )
};

export default MyPageEdit;
