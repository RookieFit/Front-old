import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../inputBox/inputBox';
import './signInPage.css';
import { ResponseBody } from '../apis/types';
import { SignInResponseDto } from '../apis/response/auth';
import { ResponseCode } from '../apis/types/enums';
import { getJwtToken, saveTokens } from '../authCheck/storageUtils';
import { SignInRequestDto } from '../apis/request/auth';
import { SignInRequest } from '../apis/api/authApi';

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
        setId(newValue);
        if (!alphanumericRegex.test(newValue)) {
            setIdMessage('형식에 맞지 않습니다.');
            setIsIdError(true);
        } else {
            setIdMessage('');
            setIsIdError(false);
        }
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordMessage('');
        setIsPasswordError(false);
    };

    const signInResponse = (responseBody: ResponseBody<SignInResponseDto>) => {
        if (!responseBody) return;

        const { code, token, expirationTime } = responseBody as SignInResponseDto;

        if (code === ResponseCode.VALIDATION_ERROR) {
            alert('아이디와 비밀번호를 입력하세요.');
        } else if (code === ResponseCode.DATABASE_ERROR) {
            alert('데이터베이스 오류입니다.');
        } else if (code === ResponseCode.Sign_IN_FAIL) {
            setIsPasswordError(true);
            setPasswordMessage('로그인 정보가 일치하지 않습니다.');
        } else if (code === ResponseCode.SUCCESS && token) {
            // MARK: 추가예정
            // const expires = new Date((new Date().getTime()) * 1000 + expirationTime);
            saveTokens(token, expirationTime.toString());

            console.log('Stored Access Token:', getJwtToken());

            navigate('/userProfile');
        }
    };

    const handleSignInClick = async () => {
        if (!id) {
            setIdMessage('아이디를 입력하세요.');
            setIsIdError(true);
        }
        if (!password) {
            setPasswordMessage('비밀번호를 입력하세요.');
            setIsPasswordError(true);
        }

        if (id && password) {
            const requestBody: SignInRequestDto = { userId: id, user_password: password };
            SignInRequest(requestBody).then(signInResponse);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') handleSignInClick();
    };

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
                <button className="find-id-password-button" onClick={() => navigate('/signup')}>회원 가입</button>
                <span className="vertical-line"></span>
                <button className="find-id-password-button" onClick={() => navigate('/findid')}>아이디 찾기</button>
                <span className="vertical-line"></span>
                <button className="find-id-password-button" onClick={() => navigate('/findpassword')}>비밀번호 찾기</button>
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
