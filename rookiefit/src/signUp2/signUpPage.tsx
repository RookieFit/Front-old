import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import InputBox from '../inputBox2/inputBox';  // 'InputBox' 컴포넌트를 가져옵니다. 이 컴포넌트는 텍스트 입력 및 버튼 기능을 제공
import './signUpPage.css';  // CSS 파일을 임포트하여 스타일을 적용합니다.
import { CheckCertificationRequestDto, IdCheckRequestDto, SignUpRequestDto, SmsCertificationRequestDto } from '../apis/request/auth';
import { ResponseCode } from '../apis/types/enums';
import { CheckCertificationResponseDto, IdCheckResponseDto, SignUpResponseDto, SmsCertificationResponseDto } from '../apis/response/auth';
import { ResponseBody } from '../apis/types';
import { CheckCertificationRequest, IdCheckRequest, SignUpRequest, SmsCertificationRequest } from '../apis/apiClient';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
    const navigate = useNavigate()

    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
    const [certificationNumber, setCertificationNumber] = useState<string>('');

    const [idMessage, setIdMessage] = useState<string>('');
    const [isIdErrorMessage, setIsIdErrorMessage] = useState<boolean>(false);

    const [isIdError, setIsIdError] = useState<boolean>(false);
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [isPasswordErrorMessage, setIsPasswordErrorMessage] = useState<boolean>(false);

    const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>('');  // 전화번호 입력란의 에러 메시지
    const [isPhoneNumberError, setIsPhoneNumberError] = useState<boolean>(false);  // 전화번호 오류 상태

    const [certificationMessage, setCertificationMessage] = useState<string>('');
    const [isCertificationError, setIsCertificationError] = useState<boolean>(false);

    const [isIdCheck, setIsIdCheck] = useState<boolean>(false);
    const [isCertificationCheck, setIsCertificationCheck] = useState<boolean>(false);

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

    const smsCertificationResponse = (responseBody: ResponseBody<SmsCertificationResponseDto>) => {
        if (!responseBody) return;
        const { code } = responseBody;

        if (code === ResponseCode.VALIDATION_ERROR) alert('아이디와 이메일을 입력하세요.');

        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');

        if (code === ResponseCode.SMS_FAIL) alert('SMS 전송에 실패했습니다.');

        if (code === ResponseCode.DUPLICATE_ID) {
            setIsIdError(true);
            setIdMessage('이미 사용중인 아이디 입니다.');
            setIsIdCheck(false);
        };

        if (code !== ResponseCode.SUCCESS) return;

        setIsPhoneNumberError(false);
        setPhoneNumberMessage('인증 번호가 전송 되었습니다.');
        console.log('SmsCertificationResponse:', responseBody);
    };

    const checkCertificationResponse = (responseBody: ResponseBody<CheckCertificationResponseDto>) => {
        if (!responseBody) return;
        const { code } = responseBody;

        if (code === ResponseCode.VALIDATION_ERROR) alert('아이디, 이메일, 인증번호를 입력하세요.');

        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');

        if (code === ResponseCode.CERTIFICATION_FAIL) {
            setIsCertificationError(true);
            setCertificationMessage('이미 사용중인 아이디 입니다.');
            setIsCertificationCheck(false);
        };

        if (code === ResponseCode.DUPLICATE_ID) {
            setIsIdError(true);
            setIdMessage('이미 사용중인 아이디 입니다.');
            setIsIdCheck(false);
        };

        if (code !== ResponseCode.SUCCESS) return;

        setIsCertificationError(false);
        setCertificationMessage('인증이 완료되었습니다.');
        setIsCertificationCheck(true);
    };

    const signUpResponse = (responseBody: ResponseBody<SignUpResponseDto>) => {
        if (!responseBody) return;
        const { code } = responseBody;

        if (code === ResponseCode.VALIDATION_ERROR) alert('모든 항목을 입력하세요.');

        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');

        if (code === ResponseCode.CERTIFICATION_FAIL) {
            setIsCertificationError(true);
            setCertificationMessage('이미 사용중인 아이디 입니다.');
            setIsCertificationCheck(false);
        };

        if (code === ResponseCode.DUPLICATE_ID) {
            setIsIdError(true);
            setIdMessage('이미 사용중인 아이디 입니다.');
            setIsIdCheck(false);
        };

        if (code !== ResponseCode.SUCCESS) return;
        navigate("/signin");
    };

    // 아이디 입력란의 값이 변경될 때 호출되는 함수
    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // 아이디 값이 정규식에 맞지 않으면 오류 메시지 설정
        if (!idAllowedRegex.test(value)) {
            setIdMessage('형식에 맞지 않습니다.');
            setIsIdErrorMessage(true);  // 오류 상태를 true로 설정
        } else {
            setUserId(value);
            setIdMessage('');
            setIsIdErrorMessage(false);
        }
    };

    // 전화번호 입력란의 값이 변경될 때 호출되는 함수
    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // 전화번호가 숫자 외의 문자가 포함되면 오류 메시지를 설정
        if (!numericRegex.test(value)) {
            setPhoneNumberMessage('형식에 맞지 않습니다.');
            setIsPhoneNumberError(true);
        } else {
            setUserPhoneNumber(value);  // 전화번호 값을 상태에 저장
            setPhoneNumberMessage('');  // 오류 메시지를 비웁니다.
            setIsPhoneNumberError(false);  // 오류 상태를 false로 설정
        }
    };

    // 인증번호 입력란의 값이 변경될 때 호출되는 함수
    const handleCertificationNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // 인증번호가 숫자 외의 문자가 포함되면 오류 메시지를 설정
        if (!numericRegex.test(value)) {
            setCertificationMessage('형식에 맞지 않습니다.');
            setIsCertificationError(true);
        } else {
            setCertificationNumber(value);  // 인증번호 값을 상태에 저장
            setCertificationMessage('');  // 오류 메시지를 비웁니다.
            setIsCertificationError(false);  // 오류 상태를 false로 설정
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

    const onIdButtonClickHandler = () => {
        if (!userId) return;
        const requestBody: IdCheckRequestDto = { userId };

        IdCheckRequest(requestBody).then(idCheckResponse);
    };

    const onCertificationNumberButtonClickHandler = () => {
        if (!userId || !userPhoneNumber || !certificationNumber) return;

        const requestBody: CheckCertificationRequestDto = {
            userId,
            user_phonenumber: userPhoneNumber, // 변환
            certificationNumber,
        };

        CheckCertificationRequest(requestBody).then(checkCertificationResponse);
    };

    const smsCertificationButtonClickHandler = async () => {
        if (!userId || !userPhoneNumber) {
            setPhoneNumberMessage('아이디와 전화번호를 입력하세요.');
            setIsPhoneNumberError(true);
            return;
        }

        const requestBody: SmsCertificationRequestDto = {
            userId,
            user_phonenumber: userPhoneNumber,
        };

        setPhoneNumberMessage('인증 번호 전송 중...');
        setIsPhoneNumberError(false);

        try {
            const response = await SmsCertificationRequest(requestBody);
            smsCertificationResponse(response);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setPhoneNumberMessage('인증 번호 전송에 실패했습니다.');
            setIsPhoneNumberError(true);
        }
    };

    const onSignUpButtonClickHandler = () => {
        if (!userId || !password || !certificationNumber) return;

        const requestBody: SignUpRequestDto = {
            userId,
            user_password: password,
            user_phonenumber: userPhoneNumber,
            user_email: "asd@asd.com"
        };
        SignUpRequest(requestBody).then(signUpResponse);
    };

    return (
        <div id="sign-up-wrapper">
            <div className="sign-up-title">회원 가입</div>  {/* 회원 가입 제목 */}

            {/* 아이디 입력란 */}
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

            {/* 패스워드 입력란 */}
            <InputBox
                title="패스워드"
                placeholder="패스워드를 입력해주세요"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                onKeyDown={() => { }}
            />

            {/* 패스워드 확인 입력란 */}
            <InputBox
                title={"패스워드\n확인"}  // 패스워드 확인란
                placeholder="패스워드를 다시 입력해주세요"
                type="password"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                message={passwordMessage}
                isErrorMessage={isPasswordErrorMessage}
                onKeyDown={() => { }}
            />

            {/* 휴대전화 입력란 */}
            <InputBox
                title="휴대전화"
                placeholder="전화번호를 입력해주세요"
                type="text"
                value={userPhoneNumber}
                onChange={handlePhoneNumberChange}
                message={phoneNumberMessage}
                isErrorMessage={isPhoneNumberError}
                buttonTitle="인증 요청"
                onButtonClick={smsCertificationButtonClickHandler}
                onKeyDown={() => { }}
            />

            {/* 인증번호 입력란 */}
            <InputBox
                title="인증번호"
                placeholder="인증번호를 입력해주세요"
                type="text"
                value={certificationNumber}
                onChange={handleCertificationNumberChange}
                message={certificationMessage}
                isErrorMessage={isCertificationError}
                buttonTitle="인증 확인"
                onButtonClick={onCertificationNumberButtonClickHandler}
                onKeyDown={() => { }}
            />

            <div className="underline"></div>  {/* 입력란 아래에 밑줄을 표시하는 div */}

            {/* 회원가입 버튼 */}
            <button className="sign-up-button" onClick={onSignUpButtonClickHandler}>
                회원가입
            </button>
        </div>
    );
}

export default SignUpPage;
