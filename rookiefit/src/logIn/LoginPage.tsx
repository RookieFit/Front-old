import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // ID와 Password 변경 핸들러 함수
    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div id="sign-in-wrapper">
            <div className="login">로그인</div>
            <div className="login_email_id_box">
                <input
                    type="text"
                    placeholder="이메일 아이디"
                    value={id}
                    onChange={handleIdChange}
                    className="email_id_letter"
                />
            </div>

            {/* Password Input Field */}
            <div className="Rectangle_22">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="password_letter"
                />
            </div>

            {/* Login Button */}
            <div className="Rectangle_21">
                <button className="login_letter">로그인</button>
            </div>

            {/* Sign Up Button */}
            <div className="Rectangle_23">
                <button className="sign_up_letter">회원가입</button>
            </div>

            {/* Forgot ID / Password */}
            <div className="find_id password_letter">아이디 찾기 | 비밀번호 찾기</div>

            {/* Social Login Section */}
            <div className="easy_login">간편 로그인</div>
            <div className="seperate_line_bottom"></div>
            <div className="naver_circle">
                <div className="naver_letter">네이버</div>
            </div>
            <div className="kakao_circle">
                <div className="kakao_letter">카카오</div>
            </div>
            <div className="google_circle">
                <div className="googl_letter">구글</div>
            </div>
        </div>
    );
}

export default LoginPage;
