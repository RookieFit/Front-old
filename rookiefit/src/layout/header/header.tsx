import React, { useEffect, useState } from 'react';
import './header.css';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../authCheck/authActions';
import { getJwtToken } from '../../authCheck/storageUtils';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isLoginPage = location.pathname === '/signin';
    const isSignUpPage = location.pathname === '/signup';

    useEffect(() => {
        // 로컬 스토리지에서 토큰을 가져와 로그인 상태를 설정
        const token = getJwtToken();
        if (token) {
            setIsLoggedIn(true);  // 토큰이 있으면 로그인 상태로 설정
        } else {
            setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태로 설정
        }
    }, [location]); // 위치 변경 시마다 로그인 상태 확인

    const menuItems = [
        { label: "FitLog", path: "/calendar" },
        { label: "Eats", path: "/diet" },
        { label: "Forum", path: "/community" },
        { label: "Market", path: "/market" },
    ];

    const isCalendarPage = location.pathname.startsWith('/calendar');

    const handleLogout = () => {
        console.log('로그아웃 완료');
        logout();
        window.location.href = '/';
    };

    return (
        <div>
            <div className="header-bar"></div>
            <header className="navbar">
                <Link to="/" className="navbar-logo">
                    ROOKIE FIT
                </Link>
                <nav className="nav-links">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`nav-link ${item.path === '/calendar' && isCalendarPage ? 'active' : location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mypage-login">
                    {isLoggedIn ? (
                        <div className="auth-links horizontal">
                            <Link to="/mypage" className={`nav-link ${isLoginPage ? 'active' : ''}`}>
                                마이페이지
                            </Link>
                            <Link to="/" onClick={handleLogout} className={`nav-link ${isLoginPage ? 'active' : ''}`}>
                                로그아웃
                            </Link>
                        </div>
                    ) : (
                        (isHomePage || isLoginPage || isSignUpPage) && (
                            <div className="auth-links">
                                <Link to="/signin" className={`nav-link ${isLoginPage ? 'active' : ''}`}>
                                    로그인
                                </Link>
                                <Link to="/signup" className={`nav-link ${isSignUpPage ? 'active' : ''}`}>
                                    회원가입
                                </Link>
                            </div>
                        )
                    )}
                </div>
            </header>
        </div>
    );
};

export default Header;
