// Header.js
import React from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
//TODO: 로그인 여부를 판단해 로그인 필요 시 링크 전환 구현이 필요합니다.
//MARK: 하이
const Header = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';
    const isSignUpPage = location.pathname === '/signup';

    const menuItems = [
        { label: "캘린더", path: "/calendar" },
        { label: "식단", path: "/diet" },
        { label: "커뮤니티", path: "/community" }
    ];
    return (
        <div>
            <header className="navbar">
                <Link to="/" className="navbar-logo">
                    ROOKIE FIT
                </Link>
                <nav className="nav-links">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="mypage-login">
                    {isHomePage || isLoginPage || isSignUpPage ? (
                        <div className="auth-links">
                            <Link to="/login" className={`nav-link ${isLoginPage ? 'active' : ''}`}>
                                로그인
                            </Link>
                            <Link to="/signup" className={`nav-link ${isSignUpPage ? 'active' : ''}`}>
                                회원가입
                            </Link>
                        </div>
                    ) : (
                        <Link to="/mypage" className="mypage" />
                    )}
                </div>
            </header>
            <hr />
        </div>
    );
};

export default Header;
