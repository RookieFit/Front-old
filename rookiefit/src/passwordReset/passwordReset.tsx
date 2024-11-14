import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../inputbox/inputbox';
import './passwordReset.css';

function PasswordReset() {
    const navigate = useNavigate();

    // 비밀번호 관련 상태
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);


    // 비밀번호 입력 핸들러
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setPassword(input);

        if (!input) {
            setPasswordMessage('비밀번호를 입력해주세요.');
            setIsPasswordError(true)
        } else {
            setPasswordMessage('사용 가능한 비밀번호입니다.');
            setIsPasswordError(false);
        }
    };

    // 비밀번호 확인 입력 핸들러
    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setConfirmPassword(input);

        if (!input) {
            setConfirmPasswordMessage('비밀번호를 한번 더 입력해주세요.');
            setIsConfirmPasswordError(true);
        } else if (input !== password) {
            setConfirmPasswordMessage('비밀번호가 일치하지 않습니다.');
            setIsConfirmPasswordError(true);
        } else {
            setConfirmPasswordMessage('비밀번호가 일치합니다.');
            setIsConfirmPasswordError(false);
        }
    };

    // 비밀번호 재설정 버튼 클릭 핸들러
    const handleResetPasswordClick = () => {
        let isValid = true;

        // 비밀번호 입력 확인
        if (!password) {
            setPasswordMessage('비밀번호를 입력해주세요.');
            setIsPasswordError(true);
            isValid = false;
        }

        // 비밀번호 확인 입력 확인
        if (!confirmPassword) {
            setConfirmPasswordMessage('비밀번호를 한번 더 입력해주세요.');
            setIsConfirmPasswordError(true);
            isValid = false;
        }

        // 모든 검증을 통과한 경우
        if (isValid && !isPasswordError && !isConfirmPasswordError) {
            alert('비밀번호가 성공적으로 변경되었습니다.');
            navigate('/login'); // 로그인 페이지로 이동
        }
    };

    // Enter 키 입력 핸들러
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleResetPasswordClick();
        }
    };

    return (
        <div id="reset-password-wrapper">
            <h2 className="reset-password-title">비밀번호 재설정</h2>
            <InputBox
                title="새 비밀번호"
                placeholder="새 비밀번호를 입력해주세요"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                message={passwordMessage}
                isErrorMessage={isPasswordError}
                onKeyDown={handleKeyDown}
            />

            <InputBox
                title={"새 비밀번호\n확인"}
                placeholder="새 비밀번호를 다시 입력해주세요"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                message={confirmPasswordMessage}
                isErrorMessage={isConfirmPasswordError}
                onKeyDown={handleKeyDown}
            />

            <div className="underline"></div>

            <button
                className="reset-password-button"
                onClick={handleResetPasswordClick}
            >
                비밀번호 재설정
            </button>
        </div>
    );
}

export default PasswordReset;