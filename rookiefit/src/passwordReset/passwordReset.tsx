import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../inputBox/inputBox';
import './passwordReset.css';

function PasswordReset() {
    const navigate = useNavigate();

    // 기존 비밀번호 더미 데이터로 설정
    const previousPassword = '1234'; // 더미 비밀번호

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
            setIsPasswordError(true);
        } else if (input === previousPassword) { // 이전 비밀번호와 동일한지 검사
            setPasswordMessage('이전과 동일한 비밀번호는 사용할 수 없습니다.');
            setIsPasswordError(true);
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

        if (!password) {
            setPasswordMessage('비밀번호를 입력해주세요.');
            setIsPasswordError(true);
            isValid = false;
        } else if (password === previousPassword) { // 이전 비밀번호와 동일한지 확인
            setPasswordMessage('이전과 동일한 비밀번호는 사용할 수 없습니다.');
            setIsPasswordError(true);
            isValid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordMessage('비밀번호를 한번 더 입력해주세요.');
            setIsConfirmPasswordError(true);
            isValid = false;
        }

        if (isValid && !isPasswordError && !isConfirmPasswordError) {
            alert('비밀번호가 성공적으로 변경되었습니다.');
            navigate('/login');
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
