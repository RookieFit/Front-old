import { useState, ChangeEvent, KeyboardEvent } from 'react';
import InputBox from '../inputbox/inputbox'; // InputBox 컴포넌트를 가져옵니다.
import './loginPage.css';

function LoginPage() {
    // 상태 변수 선언
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [idMessage, setIdMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [isIdError, setIsIdError] = useState<boolean>(false);
    const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

    // 입력 핸들러
    const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
        setIdMessage('');
        setIsIdError(false);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordMessage('');
        setIsPasswordError(false);
    };

    // 로그인 버튼 클릭 시 이벤트
    const handleLoginClick = () => {
        if (id === '') {
            setIdMessage('아이디를 입력하세요.');
            setIsIdError(true);
        }
        if (password === '') {
            setPasswordMessage('비밀번호를 입력하세요.');
            setIsPasswordError(true);
        }
        if (id && password) {
            alert("로그인 시도 중..."); // 실제 로그인 로직이 들어갈 수 있습니다.
        }
    };

    // Enter 키 이벤트 핸들러
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleLoginClick();
    };

    return (
        <div id="log-in-wrapper">
            <h2 className="login_title">로그인</h2>
            {/* 아이디 입력 필드 */}
            <InputBox
                title="아이디"
                placeholder="아이디를 입력하세요."
                type="text"
                value={id}
                message={idMessage}
                isErrorMessage={isIdError}
                onChange={handleIdChange}
                onKeydown={handleKeyDown}
            />

            {/* 비밀번호 입력 필드 */}
            <InputBox
                title="비밀번호"
                placeholder="비밀번호를 입력하세요."
                type="password"
                value={password}
                message={passwordMessage}
                isErrorMessage={isPasswordError}
                onChange={handlePasswordChange}
                onKeydown={handleKeyDown}
            />

            {/* 로그인 버튼 */}
            <button className="sign_in_button" onClick={handleLoginClick}>
                로그인
            </button>

            {/* 아이디/비밀번호 찾기 버튼 */}
            <div className="find_id_password_container">
                <button className="find_id_password_button">아이디 찾기</button>
                <span className="vertical_line"></span>
                <button className="find_id_password_button">비밀번호 찾기</button>
            </div>
            
            <div className="underline"></div>

            {/* SNS 간편 로그인 */}
            <div className="easy_login_text">간편 로그인</div>
            <div className="sns_login_container">
                <button className="naver_login"></button>
                <button className="kakao_login"></button>
                <button className="google_login"></button>
            </div>
        </div>
    );
}

export default LoginPage;
