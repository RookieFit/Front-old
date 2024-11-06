import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

type HeaderProps = {
    menuItems: { label: string; path: string }[]; // 메뉴 아이템 배열
};

const Header = ({ menuItems }: HeaderProps) => {
    return (
        <div>
            <header className="navbar">
                <div className="navbar-logo ">ROOKIE FIT</div>
                <nav className="nav-links">
                    {menuItems.map((item, index) => (
                        <Link key={index} to={item.path} className="nav-link">
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <Link to="/mypage" className="mypage" />
            </header>
            <hr />
        </div>
    );
};

export default Header;
