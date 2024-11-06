import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
    const menuItems = [
        { label: "캘린더", path: "/calendar" },
        { label: "식단", path: "/diet" },
        { label: "커뮤니티", path: "/community" }
    ];
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
