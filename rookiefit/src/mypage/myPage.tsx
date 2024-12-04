import './myPage.css';
import React, { useState } from 'react';
import TopMainBox from './myPage/topBox/topMainBox/topMainBox';
import TopMainBoxEdit from './myPage/topBox/topMainBox/topMainBoxEdit';
import MyPageFooter from './components/myPageFooter';
import GraphBox from './myPage/bottomBox/graphBox';

const MyPage = () => {
    const [role, setRole] = useState('user');
    const [isEditing, setIsEditing] = useState(false);
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

    const handleInfoUpdate = (newInfo: { userId: string; name: string; message: string; }) => {
        if (role === 'trainer') {
            setTrainerInfo(prev => ({ ...prev, ...newInfo }));
        } else {
            setUserInfo(prev => ({ ...prev, ...newInfo }));
        }
    };

    return (
        <div className="main-box">
            <button onClick={toggleRole} className="role-toggle-button">
                {role === 'user' ? '트레이너로 전환' : '일반 사용자로 전환'}
            </button>
            <div>
                <div className='top-box'>
                    {isEditing ? (
                        <TopMainBoxEdit
                            role={role}
                            userInfo={userInfo}
                            trainerInfo={trainerInfo}
                            information={undefined}
                        />
                    ) : (
                        <TopMainBox
                            role={role}
                            userInfo={userInfo}
                            trainerInfo={trainerInfo}
                            information={undefined}
                        />
                    )}
                </div>
            </div>
            <div className='bottom-box'>
                <GraphBox />
            </div>
            <div className='mypage-footer-cirle'>
                <MyPageFooter />
            </div>
        </div>
    )
};

export default MyPage;