import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../inputBox/inputBox';
import './findPassword.css';

function FindPassword() {
    const navigate = useNavigate();

    // 아이디 관련 상태
    const [id, setId] = useState<string>('');
    const [idMessage, setIdMessage] = useState<string>('');
    const [isIdError, setIsIdError] = useState<boolean>(false);
    const [isIdErrorMessage, setIsIdErrorMessage] = useState<boolean>(false);

    // 전화번호 관련 상태
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>('');
    const [isPhoneNumberError, setIsPhoneNumberError] = useState<boolean>(false);

    // 인증번호 관련 상태
    const [certificationNumber, setCertificationNumber] = useState<string>('');
    const [certificationMessage, setCertificationMessage] = useState<string>('');
    const [isCertificationError, setIsCertificationError] = useState<boolean>(false);

    // 아이디 입력 핸들러 - 한글 입력 방지
    const handleIdChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        if (koreanRegex.test(input)) {
            setIdMessage('올바르지 않은 형식입니다.');
            setIsIdError(true);
            setIsIdErrorMessage(true);
            return;
        }

        setId(input);

        if (input.trim() === '') {
            setIdMessage('아이디를 입력해 주세요.');
            setIsIdError(true);
            setIsIdErrorMessage(true);
        } else {
            setIdMessage('');
            setIsIdError(false);
            setIsIdErrorMessage(false);
        }
    }, []);

    // 전화번호 입력 핸들러 - 숫자만 입력 가능
    const handlePhoneNumberChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const numberRegex = /^[0-9]*$/;

        if (!numberRegex.test(input)) {
            setPhoneNumberMessage('숫자를 입력하세요.');
            setIsPhoneNumberError(true);
            return;
        }

        setPhoneNumber(input);

        if (input.trim() === '') {
            setPhoneNumberMessage('번호를 입력해주세요');
            setIsPhoneNumberError(true);
        } else {
            setPhoneNumberMessage('');
            setIsPhoneNumberError(false);
        }
    }, []);

    // 인증번호 입력 핸들러 - 숫자만 입력 가능
    const handleCertificationNumberChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const numberRegex = /^[0-9]*$/;

        if (!numberRegex.test(input)) {
            setCertificationMessage('숫자를 입력하세요.');
            setIsCertificationError(true);
            return;
        }

        setCertificationNumber(input);

        if (input.trim() === '') {
            setCertificationMessage('인증번호를 입력해 주세요.');
            setIsCertificationError(true);
        } else {
            setCertificationMessage('');
            setIsCertificationError(false);
        }
    }, []);

    // Enter 키 입력 핸들러
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIdMessage("확인 완료");
            setIsIdErrorMessage(false);
        }
    }, []);

    // 다음 버튼 클릭 핸들러
    const handleNextButtonClick = useCallback(() => {
        // 모든 필드가 입력되었는지 확인
        if (!id.trim()) {
            alert('아이디를 입력해주세요.');
            return;
        }
        if (!phoneNumber.trim()) {
            alert('번호를 입력해주세요.');
            return;
        }
        if (!certificationNumber.trim()) {
            alert('인증번호를 입력해주세요.');
            return;
        }

        // 에러 상태 확인
        if (isIdError || isPhoneNumberError || isCertificationError) {
            alert('입력 정보를 확인해주세요.');
            return;
        }

        // 비밀번호 재설정 페이지로 이동
        navigate('/passwordreset', {
            state: { id: id } // 필요한 경우 아이디를 다음 페이지로 전달
        });
    }, [id, phoneNumber, certificationNumber, isIdError, isPhoneNumberError, isCertificationError, navigate]);

    return (
        <div id="find-password-wrapper">
            <h2 className="find-password-title">비밀번호 찾기</h2>
            <InputBox
                title="아이디"
                placeholder="아이디를 입력해주세요"
                type="text"
                value={id}
                onChange={handleIdChange}
                message={idMessage}
                isErrorMessage={isIdErrorMessage}
                buttonTitle="확인"
                onButtonClick={() => {
                    setIdMessage("확인 완료");
                    setIsIdErrorMessage(false);
                }}
                onKeyDown={handleKeyDown}
            />
            <InputBox
                title="휴대 전화"
                placeholder="번호를 입력해주세요"
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
                title="인증 번호"
                placeholder="인증 번호를 입력해주세요"
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
            <button
                className="find-password-button"
                onClick={handleNextButtonClick}
            >
                다음
            </button>
        </div>
    );
}

export default FindPassword;