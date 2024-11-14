import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import InputBox from '../inputbox/inputbox';
import './signUpPage.css';
import { IdCheckRequestDto } from '../apis/request/auth';
import { ResponseCode } from '../apis/types/enums';
import { IdCheckResponseDto } from '../apis/response/auth';
import { ResponseBody } from '../apis/types';
import { IdCheckRequest } from '../apis/apiClient';

function SignUpPage() {
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [certificationNumber, setCertificationNumber] = useState<string>('');

    const [idMessage, setIdMessage] = useState<string>('');
    const [isIdErrorMessage, setIsIdErrorMessage] = useState<boolean>(false);

    const [isIdError, setIsIdError] = useState<boolean>(false);
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [isPasswordErrorMessage, setIsPasswordErrorMessage] = useState<boolean>(false);

    const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>('');
    const [isPhoneNumberError, setIsPhoneNumberError] = useState<boolean>(false);

    const [certificationMessage, setCertificationMessage] = useState<string>('');
    const [isCertificationError, setIsCertificationError] = useState<boolean>(false);
    const [isIdCheck, setIsIdCheck] = useState<boolean>(false);

    const idAllowedRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]*$/;
    const numericRegex = /^[0-9]*$/;
    const idCheckResponse = (responseBody: ResponseBody<IdCheckResponseDto>) => {
        if (!responseBody) return;
        const { code } = responseBody;

        if (code === ResponseCode.VALIDATION_ERROR) alert('아이디를 입력하세요.');

        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');

        if (code === ResponseCode.DUPLICATE_ID) {
            setIsIdError(true);
            setIdMessage('이미 사용중인 아이디 입니다.');
            setIsIdCheck(false);
        };
        if (code !== ResponseCode.SUCCESS) return;

        setIsIdError(false);
        setIdMessage('사용 가능한 아이디 입니다.');
        setIsIdCheck(true);
    };

    // 아이디 입력 핸들러
    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!idAllowedRegex.test(value)) {
            setIdMessage('형식에 맞지 않습니다.');
            setIsIdErrorMessage(true);
        } else {
            setUserId(value);
            setIdMessage('');
            setIsIdErrorMessage(false);
        }
    };

    // 전화번호 입력 핸들러
    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!numericRegex.test(value)) {
            setPhoneNumberMessage('형식에 맞지 않습니다.');
            setIsPhoneNumberError(true);
        } else {
            setPhoneNumber(value);
            setPhoneNumberMessage('');
            setIsPhoneNumberError(false);
        }
    };

    // 인증번호 입력 핸들러
    const handleCertificationNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!numericRegex.test(value)) {
            setCertificationMessage('형식에 맞지 않습니다.');
            setIsCertificationError(true);
        } else {
            setCertificationNumber(value);
            setCertificationMessage('');
            setIsCertificationError(false);
        }
    };

    // 패스워드와 확인 패스워드가 일치하는지 확인
    useEffect(() => {
        if (confirmPassword) {
            if (password !== confirmPassword) {
                setPasswordMessage("패스워드를 다시 입력해주세요.");
                setIsPasswordErrorMessage(true);
            } else {
                setPasswordMessage("패스워드가 일치합니다.");
                setIsPasswordErrorMessage(false);
            }
        }
    }, [password, confirmPassword]);
    const onIdButtonClickHandler = () => {
        if (!userId) return;
        const requestBody: IdCheckRequestDto = { userId };

        IdCheckRequest(requestBody).then(idCheckResponse);
    };

    return (
        <div id="sign-up-wrapper">
            <div className="signup-title">회원 가입</div>

            <InputBox
                title="아이디"
                placeholder="아이디를 입력해주세요"
                type="text"
                value={userId}
                onChange={handleIdChange}
                message={idMessage}
                isErrorMessage={isIdErrorMessage}
                buttonTitle="중복체크"
                onButtonClick={(onIdButtonClickHandler)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        setIdMessage("사용 가능한 아이디입니다.");
                        setIsIdErrorMessage(false);
                    }
                }}
            />

            <InputBox
                title="패스워드"
                placeholder="패스워드를 입력해주세요"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                onKeyDown={() => { }}
            />

            <InputBox
                title={"패스워드\n확인"}
                placeholder="패스워드를 다시 입력해주세요"
                type="password"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                message={passwordMessage}
                isErrorMessage={isPasswordErrorMessage}
                onKeyDown={() => { }}
            />

            <InputBox
                title="휴대전화"
                placeholder="전화번호를 입력해주세요"
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                message={phoneNumberMessage}
                isErrorMessage={isPhoneNumberError}
                buttonTitle="인증 요청"
                onButtonClick={() => alert("인증 번호 전송 중 ---")}
                onKeyDown={() => { }}
            />

            <InputBox
                title="인증번호"
                placeholder="인증번호를 입력해주세요"
                type="text"
                value={certificationNumber}
                onChange={handleCertificationNumberChange}
                message={certificationMessage}
                isErrorMessage={isCertificationError}
                buttonTitle="인증 확인"
                onButtonClick={() => alert("인증이 완료되었습니다")}
                onKeyDown={() => { }}
            />

            <div className="underline"></div>

            <button className="sign-up-button" onClick={() => alert("가입 완료! 환영합니다.")}>
                회원가입
            </button>

            <div className="sns-login-container">
                <button className="naver-login" onClick={() => alert("naver login~~")}></button>
                <button className="kakao-login" onClick={() => alert("kakao login~~")}></button>
                <button className="google-login" onClick={() => alert("google login~~")}></button>
            </div>
        </div>
    );
}

export default SignUpPage;
