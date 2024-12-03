import './myPage.css';
import React, { useState } from 'react';
import TopMainBoxEdit from './myPage/topBox/topMainBox/topMainBoxEdit';
import MyPageFooter from './components/myPageFooter';
import GraphBox from './myPage/bottomBox/graphBox';

const MyPageEdit = () => {
    const [role, setRole] = useState('user');
    const [userInfo, setUserInfo] = useState({
        userId: '2',
        name: '뚱인데용',
        message: '사뢍해용~~'
    });
    const [trainerInfo, setTrainerInfo] = useState({
        userId: '1',
        name: '나불끈',
        message: '사람이든 몸이든 조져드립니다!!'
    });

    const toggleRole = () => {
        setRole(prevRole => prevRole === 'user' ? 'trainer' : 'user');
    };
    return (
        <div className="main-box">
            <button onClick={toggleRole} className="role-toggle-button">
                {role === 'user' ? '트레이너로 전환' : '일반 사용자로 전환'}
            </button>
            <div className='top-box'>
                <TopMainBoxEdit  role={role}
                            userInfo={userInfo}
                            trainerInfo={trainerInfo}
                            information={undefined} />
            </div>
            <div className='bottom-box'>
                <GraphBox />
            </div>
            <footer className='mypage-footer-cirle'>
                <MyPageFooter />
            </footer>
        </div>
    )
};

export default MyPageEdit;
