import React from 'react';
import './header.css';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isLoginPage = location.pathname === '/signin';
    const isSignUpPage = location.pathname === '/signup';

    const menuItems = [
        { label: "FitLog", path: "/calendar" },
        { label: "Eats", path: "/diet" },
        { label: "Forum", path: "/community" },
        { label: "Market", path: "/market" },
    ];

    const isCalendarPage = location.pathname.startsWith('/calendar');

    const handleLogout = () => {
        console.log('로그아웃 완료');
        localStorage.removeItem('token');
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
                    {isHomePage || isLoginPage || isSignUpPage ? (
                        <div className="auth-links">
                            <Link to="/signin" className={`nav-link ${isLoginPage ? 'active' : ''}`}>
                                로그인
                            </Link>
                            <Link to="/signup" className={`nav-link ${isSignUpPage ? 'active' : ''}`}>
                                회원가입
                            </Link>
                        </div>
                    ) : (
                        <div className="auth-links horizontal">
                            <Link to="/mypage" className={`nav-link ${isLoginPage ? 'active' : ''}`}>
                                마이페이지
                            </Link>
                            <Link to="/" onClick={handleLogout} className={`nav-link ${isLoginPage ? 'active' : ''}`}>
                                로그아웃
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Header;
