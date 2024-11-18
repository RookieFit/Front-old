import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import InputBox from '../inputBox/inputBox'; // InputBox 컴포넌트 임포트
import './findId.css'; // 스타일 파일 임포트

const numericRegex = /^[0-9]*$/; // 숫자만 허용하는 정규식

function FindId() {
    const [phoneNumber, setphoneNumber] = useState(''); // 전화번호 상태
    const [certificationnumber, setCertificationNumber] = useState(''); // 인증번호 상태
    const [phoneNumberMessage, setPhoneNumberMessage] = useState(''); // 전화번호 메시지 상태
    const [certificationNumberMessage, setCertificationNumberMessage] = useState(''); // 인증번호 메시지 상태
    const [isPhoneNumberError, setIsPhoneNumberError] = useState(false); // 전화번호 오류 여부
    const [isCertificationNumberError, setIsCertificationNumberError] = useState(false); // 인증번호 오류 여부
    const [isCertificationConfirmed, setIsCertificationConfirmed] = useState(false); // 인증 완료 여부

    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용

    // 전화번호 입력 핸들러
    const handlephoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;

        if (numericRegex.test(input)) { // 숫자만 입력되었는지 검사
            setphoneNumber(input);
            setPhoneNumberMessage('');
            setIsPhoneNumberError(false);
        } else {
            setPhoneNumberMessage('형식에 맞지 않습니다. 숫자만 입력하세요.');
            setIsPhoneNumberError(true);
        }
    };

    // 인증번호 입력 핸들러
    const handleCertificationNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;

        if (numericRegex.test(input)) { // 숫자만 입력되었는지 검사
            setCertificationNumber(input);
            setCertificationNumberMessage('');
            setIsCertificationNumberError(false);
        } else {
            setCertificationNumberMessage('형식에 맞지 않습니다. 숫자만 입력하세요.');
            setIsCertificationNumberError(true);
        }
    };

    // ID 찾기 버튼 클릭 시 호출되는 함수
    const handleFindIdClick = () => {
        let isValid = true;

        if (phoneNumber === '') {
            setPhoneNumberMessage('번호를 입력하세요.');
            setIsPhoneNumberError(true);
            isValid = false;
        }

        if (certificationnumber === '') {
            setCertificationNumberMessage('인증 번호를 입력하세요.');
            setIsCertificationNumberError(true);
            isValid = false;
        }

        if (isValid) {
            navigate('/findidresult'); // findidresult 페이지로 이동
        }
    };

    // 인증 확인 버튼 클릭 시 호출되는 함수
    const handleCertificationConfirm = () => {
        setIsCertificationConfirmed(true); // 인증 완료 메시지 표시
    };

    // 인증 요청 버튼 클릭 시 호출되는 함수 (숫자 입력 검증 추가)
    const handleCertificationRequest = () => {
        if (isPhoneNumberError || phoneNumber === '') {
            setPhoneNumberMessage('번호를 입력하세요.');
            return; // 휴대전화 번호가 유효하지 않으면 함수 종료
        }
        setPhoneNumberMessage("인증번호 전송중...");
    };

    return (
        <div id="find-id-wrapper">
            <h2 className="find-id-title">ID 찾기</h2>
            {/* 휴대전화 번호 입력 박스 */}
            <InputBox
                title="휴대 전화"
                placeholder="번호를 입력해주세요"
                type="text"
                value={phoneNumber}
                message={phoneNumberMessage}
                isErrorMessage={isPhoneNumberError}
                buttonTitle="인증 요청"
                onChange={handlephoneNumberChange}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && handleFindIdClick()}
                onButtonClick={handleCertificationRequest} // 인증 요청 버튼에 함수 연결
            />

            {/* 인증 번호 입력 박스 */}
            <InputBox
                title="인증 번호"
                placeholder="번호를 입력해주세요"
                type="text"
                value={certificationnumber}
                message={certificationNumberMessage || (isCertificationConfirmed ? "인증 완료" : "")}
                isErrorMessage={isCertificationNumberError}
                buttonTitle="인증 확인"
                onChange={handleCertificationNumberChange}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && handleFindIdClick()}
                onButtonClick={handleCertificationConfirm} // 인증 확인 버튼 클릭 시 함수 연결
            />

            <div className="underline"></div>

            <button className="find-id-button" onClick={handleFindIdClick}>
                아이디 찾기
            </button>
        </div>
    );
}

export default FindId;
