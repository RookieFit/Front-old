import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../inputBox/inputBox';
import './signInPage.css';

function SignInPage() {
    const navigate = useNavigate();

    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [idMessage, setIdMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [isIdError, setIsIdError] = useState<boolean>(false);
    const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

    const alphanumericRegex = /^[A-Za-z0-9]*$/;

    const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (!alphanumericRegex.test(newValue)) {
            setIdMessage('형식에 맞지 않습니다.');
            setIsIdError(true);
        } else {
            setId(newValue);
            setIdMessage('');
            setIsIdError(false);
        }
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordMessage('');
        setIsPasswordError(false);
    };

    const handleSignInClick = () => {
        if (id === '') {
            setIdMessage('아이디를 입력하세요.');
            setIsIdError(true);
        }
        if (password === '') {
            setPasswordMessage('비밀번호를 입력하세요.');
            setIsPasswordError(true);
        }
        if (id && password) {
            alert('로그인 시도 중...');  // 실제 로그인 API 호출 전 알림 메시지
            // 로그인 로직 추가 후 로그인 성공 시 마이페이지로 이동
            navigate('/mypage');  // 로그인 성공 후 마이페이지로 리다이렉션
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSignInClick();
    };

    const handleFindIdClick = () => navigate('/findid');
    const handleFindPasswordClick = () => navigate('/findpassword');
    const handleSignUpClick = () => navigate('/signup');

    return (
        <div id="sign-in-wrapper">
            <h2 className="sign-in-title">로그인</h2>

            <InputBox
                title="아이디"
                placeholder="아이디를 입력하세요."
                type="text"
                value={id}
                message={idMessage}
                isErrorMessage={isIdError}
                onChange={handleIdChange}
                onKeyDown={handleKeyDown}
            />

            <InputBox
                title="비밀번호"
                placeholder="비밀번호를 입력하세요."
                type="password"
                value={password}
                message={passwordMessage}
                isErrorMessage={isPasswordError}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyDown}
            />

            <button className="sign-in-button" onClick={handleSignInClick}>
                로그인
            </button>

            <div className="find-id-password-sign-up-container">
                <button className="find-id-password-button" onClick={handleSignUpClick}>
                    회원 가입
                </button>
                <span className="vertical-line"></span>
                <button className="find-id-password-button" onClick={handleFindIdClick}>
                    아이디 찾기
                </button>
                <span className="vertical-line"></span>
                <button className="find-id-password-button" onClick={handleFindPasswordClick}>
                    비밀번호 찾기
                </button>
            </div>

            <div className="underline"></div>

            <div className="easy-sign-in-text">간편 로그인 및 회원가입</div>

            <div className="sns-sign-in-container">
                <button className="naver-sign-in"></button>
                <button className="kakao-sign-in"></button>
                <button className="google-sign-in"></button>
            </div>
        </div>
    );
}

export default SignInPage;
