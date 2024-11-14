import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import InputBox from '../inputbox/inputbox';  // 'InputBox' 컴포넌트를 가져옵니다. 이 컴포넌트는 텍스트 입력 및 버튼 기능을 제공
import './signUpPage.css';  // CSS 파일을 임포트하여 스타일을 적용합니다.

function SignUpPage() {
    // 사용자가 입력한 값들을 저장하는 상태 변수들
    const [id, setId] = useState<string>('');  // 아이디 입력값을 저장합니다.
    const [password, setPassword] = useState<string>('');  // 비밀번호 입력값을 저장합니다.
    const [confirmPassword, setConfirmPassword] = useState<string>('');  // 비밀번호 확인 입력값을 저장합니다.
    const [phoneNumber, setPhoneNumber] = useState<string>('');  // 전화번호 입력값을 저장합니다.
    const [certificationNumber, setCertificationNumber] = useState<string>('');  // 인증번호 입력값을 저장합니다.

    // 각 입력란에 대한 에러 메시지와 오류 상태를 관리하는 상태 변수들
    const [idMessage, setIdMessage] = useState<string>('');  // 아이디 입력란의 에러 메시지를 저장
    const [isIdErrorMessage, setIsIdErrorMessage] = useState<boolean>(false);  // 아이디 오류 상태 (true이면 오류 있음)

    const [passwordMessage, setPasswordMessage] = useState<string>('');  // 패스워드 입력란의 에러 메시지를 저장
    const [isPasswordErrorMessage, setIsPasswordErrorMessage] = useState<boolean>(false);  // 패스워드 오류 상태

    const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>('');  // 전화번호 입력란의 에러 메시지
    const [isPhoneNumberError, setIsPhoneNumberError] = useState<boolean>(false);  // 전화번호 오류 상태

    const [certificationMessage, setCertificationMessage] = useState<string>('');  // 인증번호 입력란의 에러 메시지
    const [isCertificationError, setIsCertificationError] = useState<boolean>(false);  // 인증번호 오류 상태

    // 아이디와 인증번호, 전화번호에 대해 정규식을 사용하여 유효성 검사를 합니다.
    const idAllowedRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]*$/;  // 아이디는 영문자, 숫자, 특수문자(!@#$%^&*()_+=-)만 허용
    const numericRegex = /^[0-9]*$/;  // 전화번호와 인증번호는 숫자만 허용하는 정규식

    // 아이디 입력란의 값이 변경될 때 호출되는 함수
    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // 아이디 값이 정규식에 맞지 않으면 오류 메시지 설정
        if (!idAllowedRegex.test(value)) {
            setIdMessage('형식에 맞지 않습니다.');
            setIsIdErrorMessage(true);  // 오류 상태를 true로 설정
        } else {
            setId(value);  // 올바른 형식이라면 id 상태를 업데이트
            setIdMessage('');  // 오류 메시지를 비웁니다.
            setIsIdErrorMessage(false);  // 오류 상태를 false로 설정
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
            setPhoneNumber(value);  // 전화번호 값을 상태에 저장
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
    }, [password, confirmPassword]);  // password 또는 confirmPassword가 변경될 때마다 검사

    return (
        <div id="sign-up-wrapper">
            <div className="sign-up-title">회원 가입</div>  {/* 회원 가입 제목 */}

            {/* 아이디 입력란 */}
            <InputBox
                title="아이디"  // 입력란 제목
                placeholder="아이디를 입력해주세요"  // 입력란에 보일 기본 텍스트
                type="text"  // 텍스트 타입 입력란
                value={id}  // 현재 아이디 상태 값
                onChange={handleIdChange}  // 아이디 입력 값 변경 시 호출되는 함수
                message={idMessage}  // 아이디 관련 오류 메시지
                isErrorMessage={isIdErrorMessage}  // 아이디 오류 여부 상태
                buttonTitle="중복체크"  // 버튼 제목
                onButtonClick={() => {
                    setIdMessage("사용 가능한 아이디입니다.");  // 버튼 클릭 시 메시지 표시
                    setIsIdErrorMessage(false);  // 오류 상태를 false로 설정
                }}
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
                type="password"  // 비밀번호 입력란
                value={password}  // 현재 비밀번호 상태 값
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}  // 비밀번호 변경 시 호출되는 함수
                onKeyDown={() => { }}
            />

            {/* 패스워드 확인 입력란 */}
            <InputBox
                title={"패스워드\n확인"}  // 패스워드 확인란
                placeholder="패스워드를 다시 입력해주세요"
                type="password"  // 비밀번호 확인 입력란
                value={confirmPassword}  // 현재 비밀번호 확인 상태 값
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}  // 값 변경 시 호출되는 함수
                message={passwordMessage}  // 비밀번호 확인 관련 메시지
                isErrorMessage={isPasswordErrorMessage}  // 비밀번호 확인 오류 여부
                onKeyDown={() => { }}
            />

            {/* 휴대전화 입력란 */}
            <InputBox
                title="휴대전화"
                placeholder="전화번호를 입력해주세요"
                type="text"  // 전화번호 입력란
                value={phoneNumber}  // 현재 전화번호 상태 값
                onChange={handlePhoneNumberChange}  // 전화번호 값 변경 시 호출되는 함수
                message={phoneNumberMessage}  // 전화번호 관련 오류 메시지
                isErrorMessage={isPhoneNumberError}  // 전화번호 오류 여부 상태
                buttonTitle="인증 요청"  // 버튼 제목
                onButtonClick={() => alert("인증 번호 전송 중 ---")}  // 인증 요청 버튼 클릭 시 알림
                onKeyDown={() => { }}
            />

            {/* 인증번호 입력란 */}
            <InputBox
                title="인증번호"
                placeholder="인증번호를 입력해주세요"
                type="text"  // 인증번호 입력란
                value={certificationNumber}  // 인증번호 상태 값
                onChange={handleCertificationNumberChange}  // 인증번호 값 변경 시 호출되는 함수
                message={certificationMessage}  // 인증번호 관련 메시지
                isErrorMessage={isCertificationError}  // 인증번호 오류 여부
                buttonTitle="인증 확인"  // 인증 확인 버튼 제목
                onButtonClick={() => alert("인증이 완료되었습니다")}  // 인증 확인 버튼 클릭 시 알림
                onKeyDown={() => { }}
            />

            <div className="underline"></div>  {/* 입력란 아래에 밑줄을 표시하는 div */}

            {/* 회원가입 버튼 */}
            <button className="sign-up-button" onClick={() => alert("가입 완료! 환영합니다.")}>
                회원가입
            </button>

            {/* SNS 로그인 버튼들 */}
            <div className="sns-sign-in-container">
                <button className="naver-sign-in" onClick={() => alert("naver login~~")}></button>
                <button className="kakao-sign-in" onClick={() => alert("kakao login~~")}></button>
                <button className="google-sign-in" onClick={() => alert("google login~~")}></button>
            </div>
        </div>
    );
}

export default SignUpPage;
