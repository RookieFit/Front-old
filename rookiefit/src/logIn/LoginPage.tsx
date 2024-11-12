import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate import
import InputBox from '../inputbox/inputbox';
import './loginPage.css';

function LoginPage() {
    // 상태 변수 선언
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [idMessage, setIdMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [isIdError, setIsIdError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    // useNavigate 훅 사용
    const navigate = useNavigate();  // 페이지 이동을 위한 navigate 훅

    // 정규식 패턴
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const alphanumericRegex = /^[A-Za-z0-9]*$/;

    // 입력 핸들러
    const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        
        if (koreanRegex.test(newValue)) {
            setIdMessage('형식에 맞지 않습니다.');
            setIsIdError(true);
            return;
        }

        if (alphanumericRegex.test(newValue) || newValue === '') {
            setId(newValue);
            setIdMessage('');
            setIsIdError(false);
        }
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setPassword(newValue);
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
            alert("로그인 시도 중...");
        }
    };

    // Enter 키 이벤트 핸들러
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleLoginClick();
        }
    };

    // 아이디 찾기 클릭 시
    const handleFindIdClick = () => {
        navigate('/findId');  // 아이디 찾기 페이지로 이동
    };

    // 비밀번호 찾기 클릭 시
    const handleFindPasswordClick = () => {
        navigate('/findPassword');  // 비밀번호 찾기 페이지로 이동
    };

    return (
        <div id="log-in-wrapper">
            <h2 className="login-title">로그인</h2>
            
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

            <button className="sign-in-button" onClick={handleLoginClick}>
                로그인
            </button>

            <div className="find-id-password-container">
                <button className="find-id-password-button" onClick={handleFindIdClick}>
                    아이디 찾기
                </button>
                <span className="vertical-line"></span>
                <button className="find-id-password-button" onClick={handleFindPasswordClick}>
                    비밀번호 찾기
                </button>
            </div>
            
            <div className="underline"></div>

            <div className="easy-login-text">간편 로그인</div>
            <div className="sns-login-container">
                <button className="naver-login"></button>
                <button className="kakao-login"></button>
                <button className="google-login"></button>
            </div>
        </div>
    );
}

export default LoginPage;
