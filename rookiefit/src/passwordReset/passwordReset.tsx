import { useState, ChangeEvent, KeyboardEvent } from 'react'; // React의 useState, ChangeEvent, KeyboardEvent 훅 임포트
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅 임포트
import InputBox from '../inputBox/inputBox'; // InputBox 컴포넌트 임포트
import './passwordReset.css'; // 스타일 시트 임포트

function PasswordReset() {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    // 비밀번호 관련 상태
    const [password, setPassword] = useState(''); // 새 비밀번호 상태
    const [confirmPassword, setConfirmPassword] = useState(''); // 새 비밀번호 확인 상태
    const [passwordMessage, setPasswordMessage] = useState(''); // 비밀번호 유효성 메시지
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(''); // 비밀번호 확인 유효성 메시지
    const [isPasswordError, setIsPasswordError] = useState(false); // 비밀번호 오류 상태
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false); // 비밀번호 확인 오류 상태

    // 비밀번호 입력 핸들러
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value; // 비밀번호 입력값 가져오기
        setPassword(input); // 비밀번호 상태 업데이트

        if (!input) { // 비밀번호가 비어 있을 경우
            setPasswordMessage('비밀번호를 입력해주세요.'); // 메시지 업데이트
            setIsPasswordError(true); // 오류 상태 true
        } else {
            setPasswordMessage('사용 가능한 비밀번호입니다.'); // 메시지 업데이트
            setIsPasswordError(false); // 오류 상태 false
        }
    };

    // 비밀번호 확인 입력 핸들러
    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value; // 비밀번호 확인 입력값 가져오기
        setConfirmPassword(input); // 비밀번호 확인 상태 업데이트

        if (!input) { // 비밀번호 확인이 비어 있을 경우
            setConfirmPasswordMessage('비밀번호를 한번 더 입력해주세요.'); // 메시지 업데이트
            setIsConfirmPasswordError(true); // 오류 상태 true
        } else if (input !== password) { // 비밀번호 확인이 원래 비밀번호와 다를 경우
            setConfirmPasswordMessage('비밀번호가 일치하지 않습니다.'); // 메시지 업데이트
            setIsConfirmPasswordError(true); // 오류 상태 true
        } else {
            setConfirmPasswordMessage('비밀번호가 일치합니다.'); // 메시지 업데이트
            setIsConfirmPasswordError(false); // 오류 상태 false
        }
    };

    // 비밀번호 재설정 버튼 클릭 핸들러
    const handleResetPasswordClick = () => {
        let isValid = true; // 유효성 검사 플래그

        // 비밀번호 입력 확인
        if (!password) { // 비밀번호가 비어 있을 경우
            setPasswordMessage('비밀번호를 입력해주세요.'); // 메시지 업데이트
            setIsPasswordError(true); // 오류 상태 true
            isValid = false; // 유효성 검사 실패
        }

        // 비밀번호 확인 입력 확인
        if (!confirmPassword) { // 비밀번호 확인이 비어 있을 경우
            setConfirmPasswordMessage('비밀번호를 한번 더 입력해주세요.'); // 메시지 업데이트
            setIsConfirmPasswordError(true); // 오류 상태 true
            isValid = false; // 유효성 검사 실패
        }

        // 모든 검증을 통과한 경우
        if (isValid && !isPasswordError && !isConfirmPasswordError) { // 오류가 없을 경우
            alert('비밀번호가 성공적으로 변경되었습니다.'); // 비밀번호 변경 성공 메시지
            navigate('/login'); // 로그인 페이지로 이동
        }
    };

    // Enter 키 입력 핸들러
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') { // Enter 키 입력 시
            handleResetPasswordClick(); // 비밀번호 재설정 함수 호출
        }
    };

    return (
        <div id="reset-password-wrapper"> {/* 비밀번호 재설정 화면 */}
            <h2 className="reset-password-title">비밀번호 재설정</h2> {/* 제목 */}

            {/* 새 비밀번호 입력 박스 */}
            <InputBox
                title="새 비밀번호"
                placeholder="새 비밀번호를 입력해주세요"
                type="password"
                value={password}
                onChange={handlePasswordChange} // 비밀번호 입력 핸들러
                message={passwordMessage} // 비밀번호 메시지
                isErrorMessage={isPasswordError} // 비밀번호 오류 여부
                onKeyDown={handleKeyDown} // Enter 키 입력 핸들러
            />

            {/* 새 비밀번호 확인 입력 박스 */}
            <InputBox
                title={"새 비밀번호\n확인"}
                placeholder="새 비밀번호를 다시 입력해주세요"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange} // 비밀번호 확인 입력 핸들러
                message={confirmPasswordMessage} // 비밀번호 확인 메시지
                isErrorMessage={isConfirmPasswordError} // 비밀번호 확인 오류 여부
                onKeyDown={handleKeyDown} // Enter 키 입력 핸들러
            />

            <div className="underline"></div> {/* 하단 구분선 */}

            {/* 비밀번호 재설정 버튼 */}
            <button
                className="reset-password-button"
                onClick={handleResetPasswordClick} // 비밀번호 재설정 클릭 시 핸들러 호출
            >
                비밀번호 재설정
            </button>
        </div>
    );
}

export default PasswordReset; // PasswordReset 컴포넌트 내보내기
