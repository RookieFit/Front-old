import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';  // 페이지 이동을 위한 useNavigate 훅
import InputBox from '../inputbox/inputbox';  // 입력박스 컴포넌트
import './signinPage.css';

function SigninPage() {  // 함수명 PascalCase로 수정
    // 상태 변수 선언
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [idMessage, setIdMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [isIdError, setIsIdError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    // useNavigate 훅을 사용하여 페이지 이동
    const navigate = useNavigate();

    // 정규식 패턴 설정 (알파벳과 숫자만 허용)
    const alphanumericRegex = /^[A-Za-z0-9]*$/;  // 알파벳, 숫자만 허용

    // 아이디 입력 처리
    const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        // 알파벳과 숫자만 허용
        if (!alphanumericRegex.test(newValue)) {
            setIdMessage('형식에 맞지 않습니다.');
            setIsIdError(true);
        } else {
            setId(newValue);
            setIdMessage('');
            setIsIdError(false);
        }
    };

    // 비밀번호 입력 처리
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordMessage('');
        setIsPasswordError(false);
    };

    // 로그인 버튼 클릭 시 처리
    const handleSigninClick = () => {
        if (id === '') {
            setIdMessage('아이디를 입력하세요.');
            setIsIdError(true);
        }
        if (password === '') {
            setPasswordMessage('비밀번호를 입력하세요.');
            setIsPasswordError(true);
        }
        if (id && password) {
            alert('로그인 시도 중...');
        }
    };

    // Enter 키 입력 시 로그인 시도
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSigninClick();
    };

    // 아이디 찾기 클릭
    const handleFindIdClick = () => navigate('/findId');

    // 비밀번호 찾기 클릭
    const handleFindPasswordClick = () => navigate('/findPassword');

    return (
        <div id="Signin-wrapper">
            <h2 className="Signin-title">로그인</h2>

            {/* 아이디 입력박스 */}
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

            {/* 비밀번호 입력박스 */}
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

            {/* 로그인 버튼 */}
            <button className="signin-button" onClick={handleSigninClick}>
                로그인
            </button>

            {/* 아이디/비밀번호 찾기 링크 */}
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

            {/* 간편 로그인 */}
            <div className="easy-signin-text">간편 로그인</div>
            <div className="sns-signin-container">
                <button className="naver-signin"></button>
                <button className="kakao-signin"></button>
                <button className="google-signin"></button>
            </div>
        </div>
    );
}

export default SigninPage;
