import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import InputBox from '../inputbox/inputbox';
import './signUpPage.css';

function SignUpPage() {
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [certificationNumber, setCertificationNumber] = useState<string>('');

    const [idMessage, setIdMessage] = useState<string>('');
    const [isIdErrorMessage, setIsIdErrorMessage] = useState<boolean>(false);

    const [passwordMessage, setPasswordMessage] = useState<string>('');  // 패스워드 메시지 상태 추가
    const [isPasswordErrorMessage, setIsPasswordErrorMessage] = useState<boolean>(false);

    /* 간편 로그인 클릭 */
    const naverClickHandler = () => alert("naver login~~");
    const kakaoClickHandler = () => alert("kakao login~~");
    const googleClickHandler = () => alert("google login~~");

    const duplicateIdCheckClickHandler = () => {
        setIdMessage("사용 가능한 아이디입니다.");
        setIsIdErrorMessage(false);
    };

    const certificateNumberClickHandler = () => alert("인증 번호 전송 중 ---");
    const certificateCompleteClickHandler = () => alert("인증이 완료되었습니다.");
    const signUpCompleteClickHandler = () => alert("가입 완료! 환영합니다.");

    // 패스워드와 확인 패스워드가 일치하는지 확인하는 useEffect 추가
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

    return (
        <div id="sign-up-wrapper">
            <div className="signup_title">회원 가입</div>

            <InputBox
                title="아이디"
                placeholder="아이디를 입력해주세요"
                type="text"
                value={id}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setId(e.target.value)}
                message={idMessage}
                isErrorMessage={isIdErrorMessage}
                buttonTitle="중복체크"
                onButtonClick={duplicateIdCheckClickHandler}
                onKeydown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        duplicateIdCheckClickHandler();
                    }
                }}
            />

            <InputBox
                title="패스워드"
                placeholder="패스워드를 입력해주세요"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                onKeydown={() => {}}
            />

            <InputBox
                title={"패스워드\n확인"}
                placeholder="패스워드를 다시 입력해주세요"
                type="password"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                message={passwordMessage}  // 패스워드 메시지 표시
                isErrorMessage={isPasswordErrorMessage}  // 메시지 오류 여부 적용
                onKeydown={() => {}}
            />

            <InputBox
                title="휴대전화"
                placeholder="전화번호를 입력해주세요"
                type="text"
                value={phoneNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                buttonTitle="인증 요청"
                onButtonClick={certificateNumberClickHandler}
                onKeydown={() => {}}
            />

            <InputBox
                title="인증번호"
                placeholder="인증번호를 입력해주세요"
                type="text"
                value={certificationNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCertificationNumber(e.target.value)}
                buttonTitle="인증 확인"
                onButtonClick={certificateCompleteClickHandler}
                onKeydown={() => {}}
            />

            <div className="underline"></div>

            <button className="sign_up_button" onClick={signUpCompleteClickHandler}>
                회원가입
            </button>

            <div className="sns_login_container">
                <button className="naver_login" onClick={naverClickHandler}></button>
                <button className="kakao_login" onClick={kakaoClickHandler}></button>
                <button className="google_login" onClick={googleClickHandler}></button>
            </div>
        </div>
    );
}

export default SignUpPage;
