import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../inputBox/inputBox';
import { IdCheckRequest, SmsCertificationRequest, CheckCertificationRequest, SignUpRequest } from '../apis/api/authApi';
import './signUpPage.css';
import { handleIdCheckResponse, handleSmsCertificationResponse, handleCheckCertificationResponse, handleSignUpResponse } from './responseHandler'; // 분리된 함수 불러오기
import { SignUpRequestDto } from '../apis/request/auth';

function SignUpPage() {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [certificationNumber, setCertificationNumber] = useState('');

    const [idMessage, setIdMessage] = useState('');
    const [isIdErrorMessage, setIsIdErrorMessage] = useState(false);
    const [isIdError, setIsIdError] = useState(false);

    const [passwordMessage, setPasswordMessage] = useState('');
    const [isPasswordErrorMessage, setIsPasswordErrorMessage] = useState(false);

    const [phoneNumberMessage, setPhoneNumberMessage] = useState('');
    const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);

    const [certificationMessage, setCertificationMessage] = useState('');
    const [isCertificationError, setIsCertificationError] = useState(false);

    const [isIdCheck, setIsIdCheck] = useState(false);
    const [isCertificationCheck, setIsCertificationCheck] = useState(false);

    const [isIdButtonDisabled, setIsIdButtonDisabled] = useState(false);  // 중복체크 버튼 비활성화
    const [isCertificationButtonDisabled, setIsCertificationButtonDisabled] = useState(false);  // 확인 버튼 비활성화

    const idAllowedRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]*$/;
    const numericRegex = /^[0-9]*$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 영문, 숫자 포함 최소 8자

    // 필드 유효성 검사 상태
    const isFormValid =
        userId &&
        !isIdError &&
        password &&
        confirmPassword &&
        password === confirmPassword &&
        !isPasswordErrorMessage &&
        userPhoneNumber &&
        !isPhoneNumberError &&
        certificationNumber &&
        !isCertificationError;


    // 이벤트 핸들러
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

        // 아이디 입력값이 변경되면 중복 체크 버튼을 활성화
        if (isIdButtonDisabled) setIsIdButtonDisabled(false);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);

        if (!passwordRegex.test(value)) {
            setPasswordMessage('패스워드는 영문, 숫자 포함 최소 8자 이상이어야 합니다.');
            setIsPasswordErrorMessage(true);
        } else {
            setPasswordMessage('');
            setIsPasswordErrorMessage(false);
        }
    };



    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!numericRegex.test(value)) {
            setPhoneNumberMessage('형식에 맞지 않습니다.');
            setIsPhoneNumberError(true);
        } else {
            setUserPhoneNumber(value);
            setPhoneNumberMessage('');
            setIsPhoneNumberError(false);
        }

        // 전화번호 입력값이 변경되면 인증 버튼을 활성화
        if (isCertificationButtonDisabled) setIsCertificationButtonDisabled(false);
    };

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

        // 인증번호 입력값이 변경되면 확인 버튼을 활성화
        if (isCertificationButtonDisabled) setIsCertificationButtonDisabled(false);
    };

    // API 요청
    const onIdButtonClickHandler = () => {
        if (!userId) return;
        setIsIdButtonDisabled(true);  // 중복체크 버튼 비활성화

        IdCheckRequest({ userId }).then(response => handleIdCheckResponse(response, setIsIdError, setIdMessage, setIsIdCheck));
    };

    const smsCertificationButtonClickHandler = async () => {
        if (!userId || !userPhoneNumber) {
            setPhoneNumberMessage('아이디와 전화번호를 입력하세요.');
            setIsPhoneNumberError(true);
            return;
        }

        if (!/^\d{10,11}$/.test(userPhoneNumber)) {
            setPhoneNumberMessage('올바른 전화번호를 입력해주세요.');
            setIsPhoneNumberError(true);
            return;
        }

        setPhoneNumberMessage('인증 번호 전송 중...');
        setIsPhoneNumberError(false);

        try {
            const response = await SmsCertificationRequest({
                userId,
                user_phonenumber: userPhoneNumber,
            });
            handleSmsCertificationResponse(response, setPhoneNumberMessage, setIsPhoneNumberError);
        } catch {
            setPhoneNumberMessage('인증 번호 전송에 실패했습니다.');
            setIsPhoneNumberError(true);
        }
    };

    const onCertificationNumberButtonClickHandler = async () => {
        if (!userId || !userPhoneNumber || !certificationNumber) return;

        setIsCertificationButtonDisabled(true);  // 확인 버튼 비활성화

        try {
            const response = await CheckCertificationRequest({
                userId,
                user_phonenumber: userPhoneNumber,
                certificationNumber,
            });
            handleCheckCertificationResponse(response, setCertificationMessage, setIsCertificationError, setIsCertificationCheck);
        } catch {
            setCertificationMessage('인증 확인에 실패했습니다.');
            setIsCertificationError(true);
        }
    };

    const onSignUpButtonClickHandler = async () => {

        const payload: SignUpRequestDto = {
            userId,
            user_password: password,
            user_phonenumber: userPhoneNumber,
        };

        try {
            const response = await SignUpRequest(payload);
            handleSignUpResponse(response, navigate);
        } catch {
            alert('회원가입 실패');
        }
    };

    // 패스워드와 비밀번호 확인 입력이 일치하는지 검사합니다.
    useEffect(() => {
        if (confirmPassword) {  // 비밀번호 확인란이 비어있지 않으면 검사 시작
            if (password !== confirmPassword) {
                setPasswordMessage("패스워드를 다시 입력해주세요.");  // 일치하지 않으면 메시지 설정
                setIsPasswordErrorMessage(true);
            } else {
                setPasswordMessage("패스워드가 일치합니다.");  // 일치하면 메시지 업데이트
                setIsPasswordErrorMessage(false);
            }
        }
    }, [password, confirmPassword]);

    return (
        <div id="sign-up-wrapper">
            <div className="sign-up-title">회원 가입</div>
            <InputBox
                title="아이디"
                placeholder="아이디를 입력해주세요"
                type="text"
                value={userId}
                onChange={handleIdChange}
                message={idMessage}
                isErrorMessage={isIdErrorMessage}
                buttonTitle="중복체크"
                onButtonClick={onIdButtonClickHandler}
                disabled={isIdButtonDisabled}  // 중복체크 버튼 비활성화
            />
            <InputBox
                title="패스워드"
                placeholder="패스워드를 입력해주세요"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                message={passwordMessage}
                isErrorMessage={isPasswordErrorMessage}
            />
            <InputBox
                title="패스워드 확인"
                placeholder="패스워드를 다시 입력해주세요"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                message={passwordMessage}
                isErrorMessage={isPasswordErrorMessage}
            />
            <InputBox
                title="전화번호"
                placeholder="전화번호를 입력해주세요"
                type="text"
                value={userPhoneNumber}
                onChange={handlePhoneNumberChange}
                message={phoneNumberMessage}
                isErrorMessage={isPhoneNumberError}
                buttonTitle="인증받기"
                onButtonClick={smsCertificationButtonClickHandler}
            />
            <InputBox
                title="인증번호"
                placeholder="인증번호를 입력해주세요"
                type="text"
                value={certificationNumber}
                onChange={handleCertificationNumberChange}
                message={certificationMessage}
                isErrorMessage={isCertificationError}
                buttonTitle="확인"
                onButtonClick={onCertificationNumberButtonClickHandler}
                disabled={isCertificationButtonDisabled}  // 확인 버튼 비활성화
            />

            <button
                className="sign-up-button"
                onClick={onSignUpButtonClickHandler}
                disabled={!isFormValid}  // 모든 필드가 유효할 때만 버튼 활성화
            >
                회원가입
            </button>
        </div>
    );
}

export default SignUpPage;