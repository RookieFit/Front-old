import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './myPageFooter.css';

const MyPageFooter = () => {
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const footerRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    const handleFooterToggle = () => {
        setIsFooterVisible(!isFooterVisible);
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (footerRef.current && !footerRef.current.contains(event.target as Node)) {
            setIsFooterVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsFooterVisible(false);
    };
    return (
        <>
            <button onClick={scrollToTop} className="my-footer-floating-up-button" />
            <button
                ref={footerRef}
                className="my-footer-circle"
                onClick={handleFooterToggle}
            >
                {isFooterVisible && (
                    <div className="my-footer-visible-box">
                        나의 발자취
                        <div className="my-footer-visible-inbox">
                            <button
                                className="my-footer-visible-box-chat-log"
                                onClick={() => handleNavigation('/chat-')}
                            >
                                채팅 기록
                            </button>
                            <button
                                className="my-footer-visible-box-market-log"
                                onClick={() => handleNavigation('/market:nickname')}
                            >
                                거래 내역
                            </button>
                            <button
                                className="my-footer-visible-box-community-list"
                                onClick={() => handleNavigation('/communitylist')}
                            >
                                게시글 목록
                            </button>
                            <button
                                className="my-footer-visible-box-inquiry"
                                onClick={() => handleNavigation('/inquiry')}
                            >
                                기타
                            </button>
                        </div>
                    </div>
                )}
            </button>
        </>
    );
};

export default MyPageFooter;