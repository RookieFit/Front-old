import { useState, ChangeEvent, KeyboardEvent } from 'react';  // 상태 관리와 이벤트 처리 위한 React 훅들 임포트
import { useNavigate } from 'react-router-dom';  // 페이지 이동을 위한 useNavigate 훅 임포트
import InputBox from '../inputBox/inputBox';  // 사용자 정의 입력박스 컴포넌트 임포트
import './signInPage.css';  // 컴포넌트 스타일을 위한 CSS 임포트

// 로그인 페이지 컴포넌트 정의
function SignInPage() {
    // 상태 변수 선언
    const [id, setId] = useState('');  // 사용자가 입력한 아이디를 저장하는 상태 변수
    const [password, setPassword] = useState('');  // 사용자가 입력한 비밀번호를 저장하는 상태 변수
    const [idMessage, setIdMessage] = useState('');  // 아이디 입력란에 대한 상태 메시지 (에러 메시지 또는 성공 메시지)
    const [passwordMessage, setPasswordMessage] = useState('');  // 비밀번호 입력란에 대한 상태 메시지
    const [isIdError, setIsIdError] = useState(false);  // 아이디 입력란의 에러 상태 (true: 에러, false: 정상)
    const [isPasswordError, setIsPasswordError] = useState(false);  // 비밀번호 입력란의 에러 상태

    // 페이지 이동을 위한 useNavigate 훅 사용
    const navigate = useNavigate();

    // 아이디 입력에 사용할 정규식 (알파벳 대소문자와 숫자만 허용)
    const alphanumericRegex = /^[A-Za-z0-9]*$/;  // 알파벳과 숫자만 허용하는 정규식

    // 아이디 입력 처리 함수
    const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;  // 사용자가 입력한 아이디 값

        // 아이디가 정규식에 맞지 않으면 오류 메시지 출력
        if (!alphanumericRegex.test(newValue)) {
            setIdMessage('형식에 맞지 않습니다.');  // 형식이 맞지 않으면 에러 메시지
            setIsIdError(true);  // 에러 상태 true로 설정
        } else {
            setId(newValue);  // 정상적인 입력이면 아이디 상태 업데이트
            setIdMessage('');  // 에러 메시지 초기화
            setIsIdError(false);  // 에러 상태 false로 설정
        }
    };

    // 비밀번호 입력 처리 함수
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);  // 사용자가 입력한 비밀번호 값으로 상태 업데이트
        setPasswordMessage('');  // 비밀번호 메시지 초기화
        setIsPasswordError(false);  // 비밀번호 오류 상태 초기화
    };

    // 로그인 버튼 클릭 시 처리 함수
    const handleSignInClick = () => {
        // 아이디가 비어있으면 오류 메시지 표시
        if (id === '') {
            setIdMessage('아이디를 입력하세요.');  // 아이디 입력이 비어있으면 에러 메시지
            setIsIdError(true);  // 아이디 오류 상태 true로 설정
        }
        // 비밀번호가 비어있으면 오류 메시지 표시
        if (password === '') {
            setPasswordMessage('비밀번호를 입력하세요.');  // 비밀번호 입력이 비어있으면 에러 메시지
            setIsPasswordError(true);  // 비밀번호 오류 상태 true로 설정
        }
        // 아이디와 비밀번호가 모두 입력되었을 때 로그인 시도
        if (id && password) {
            alert('로그인 시도 중...');  // 실제로 로그인 API 호출 전 알림 메시지
            // 이후 로그인 처리 로직을 추가할 수 있음
        }
    };

    // Enter 키 입력 시 로그인 시도 함수
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSignInClick();  // Enter 키가 눌리면 로그인 클릭 처리
    };

    // 아이디 찾기 페이지로 이동하는 함수
    const handleFindIdClick = () => navigate('/findid');  // /findId 경로로 이동

    // 비밀번호 찾기 페이지로 이동하는 함수
    const handleFindPasswordClick = () => navigate('/findpassword');  // /findPassword 경로로 이동

    return (
        <div id="sign-in-wrapper">  {/* 로그인 페이지 전체 컨테이너 */}
            <h2 className="sign-in-title">로그인</h2>  {/* 페이지 제목 */}

            {/* 아이디 입력박스 */}
            <InputBox
                title="아이디"
                placeholder="아이디를 입력하세요."
                type="text"
                value={id}  // 상태 변수로 입력값을 제어
                message={idMessage}  // 아이디에 대한 메시지 (에러 메시지 포함)
                isErrorMessage={isIdError}  // 아이디 오류 여부
                onChange={handleIdChange}  // 아이디 입력 처리 핸들러
                onKeyDown={handleKeyDown}  // 키 입력 시 처리 핸들러
            />

            {/* 비밀번호 입력박스 */}
            <InputBox
                title="비밀번호"
                placeholder="비밀번호를 입력하세요."
                type="password"
                value={password}  // 상태 변수로 입력값을 제어
                message={passwordMessage}  // 비밀번호에 대한 메시지 (에러 메시지 포함)
                isErrorMessage={isPasswordError}  // 비밀번호 오류 여부
                onChange={handlePasswordChange}  // 비밀번호 입력 처리 핸들러
                onKeyDown={handleKeyDown}  // 키 입력 시 처리 핸들러
            />

            {/* 로그인 버튼 */}
            <button className="sign-in-button" onClick={handleSignInClick}>
                로그인
            </button>

            {/* 아이디 찾기 및 비밀번호 찾기 링크 */}
            <div className="find-id-password-container">
                <button className="find-id-password-button" onClick={handleFindIdClick}>
                    아이디 찾기
                </button>
                <span className="vertical-line"></span>  {/* 두 버튼을 구분하는 세로선 */}
                <button className="find-id-password-button" onClick={handleFindPasswordClick}>
                    비밀번호 찾기
                </button>
            </div>

            <div className="underline"></div>  {/* 페이지 하단의 구분선 */}

            {/* 간편 로그인 섹션 */}
            <div className="easy-sign-in-text">간편 로그인</div>  {/* 간편 로그인 안내 텍스트 */}

            {/* SNS 로그인 버튼들 */}
            <div className="sns-sign-in-container">
                <button className="naver-sign-in"></button>  {/* 네이버 로그인 버튼 */}
                <button className="kakao-sign-in"></button>  {/* 카카오 로그인 버튼 */}
                <button className="google-sign-in"></button>  {/* 구글 로그인 버튼 */}
            </div>
        </div>
    );
}

export default SignInPage;  // 컴포넌트 내보내기
