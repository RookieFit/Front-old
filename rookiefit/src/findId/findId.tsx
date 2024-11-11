import { useState } from 'react';
import InputBox from '../inputbox/inputbox'; // InputBox 컴포넌트 임포트
import './findId.css';

function FindId() {
    const [phonenumber, setPhonenumber] = useState('');
    const [certificationnumber, setCertificationNumber] = useState('');
    const [phonenumberMessage, setPhonenumberMessage] = useState('');
    const [certificationNumberMessage, setCertificationNumberMessage] = useState('');
    const [isPhonenumberError, setIsPhonenumberError] = useState(false);
    const [isCertificationNumberError, setIsCertificationNumberError] = useState(false);
    const [isSendingCertification, setIsSendingCertification] = useState(false); // 인증번호 전송 상태
    const [completionMessage, setCompletionMessage] = useState(''); // ID 찾기 완료 메시지

    // 전화번호 입력 시 호출되는 핸들러
    const handlePhonenumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhonenumber(event.target.value);
        setIsPhonenumberError(false);  // 새로운 입력 시 오류 상태 초기화
    };

    // 인증번호 입력 시 호출되는 핸들러
    const handleCertificationNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCertificationNumber(event.target.value);
        setIsCertificationNumberError(false);  // 새로운 입력 시 오류 상태 초기화
    };

    // Enter 키 입력 시 호출되는 핸들러
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleFindIdClick();
        }
    };

    // ID 찾기 버튼 클릭 시 호출되는 함수
    const handleFindIdClick = () => {
        let isValid = true;

        if (phonenumber === '') {
            setPhonenumberMessage('번호를 입력하세요.');
            setIsPhonenumberError(true);
            isValid = false;
        } else {
            setPhonenumberMessage('');
        }

        if (certificationnumber === '') {
            setCertificationNumberMessage('인증 번호를 입력하세요.');
            setIsCertificationNumberError(true);
            isValid = false;
        } else {
            setCertificationNumberMessage('');
        }

        if (isValid) {
            setCompletionMessage("ID 찾기가 완료되었습니다."); // 완료 메시지 표시
        }
    };

    // 인증 요청 버튼 클릭 시 호출되는 함수
    const handleCertificationRequest = () => {
        setIsSendingCertification(true); // 인증번호 전송중 상태 설정
        setPhonenumberMessage("인증번호 전송중...")
    };

    return (
        <div id="findId-wrapper">
            <h2 className="findId-title">ID 찾기</h2>
            <InputBox
                title="휴대 전화"
                placeholder="번호를 입력해주세요"
                type="text"
                value={phonenumber}
                message={phonenumberMessage}
                isErrorMessage={isPhonenumberError}
                buttonTitle="인증 요청"
                onChange={handlePhonenumberChange}
                onKeyDown={handleKeyDown}
                onButtonClick={handleCertificationRequest} // 인증 요청 버튼에 새 함수 연결
            />

            <InputBox
                title="인증 번호"
                placeholder="번호를 입력해주세요"
                type="text"
                value={certificationnumber}
                message={certificationNumberMessage}
                isErrorMessage={isCertificationNumberError}
                buttonTitle="인증 확인"
                onChange={handleCertificationNumberChange}
                onKeyDown={handleKeyDown}
                onButtonClick={handleFindIdClick}
            />

            <div className="underline"></div>
        </div>
    );
}

export default FindId;
