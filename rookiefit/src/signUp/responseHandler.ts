import { ResponseBody } from '../apis/types';
import { ResponseCode } from '../apis/types/enums';
import { IdCheckResponseDto, SmsCertificationResponseDto, CheckCertificationResponseDto, SignUpResponseDto } from '../apis/response/auth';
import { NavigateFunction } from 'react-router-dom';

export const handleIdCheckResponse = (responseBody: ResponseBody<IdCheckResponseDto>, setIsIdError: React.Dispatch<React.SetStateAction<boolean>>, setIdMessage: React.Dispatch<React.SetStateAction<string>>, setIsIdCheck: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!responseBody) return;
    const { code } = responseBody;

    switch (code) {
        case ResponseCode.VALIDATION_ERROR:
            alert('아이디를 입력하세요.');
            break;
        case ResponseCode.DATABASE_ERROR:
            alert('데이터베이스 오류입니다.');
            break;
        case ResponseCode.DUPLICATE_ID:
            setIsIdError(true);
            setIdMessage('이미 사용중인 아이디 입니다.');
            setIsIdCheck(false);
            break;
        case ResponseCode.SUCCESS:
            setIsIdError(false);
            setIdMessage('사용 가능한 아이디 입니다.');
            setIsIdCheck(true);
            break;
    }
};

export const handleSmsCertificationResponse = (responseBody: ResponseBody<SmsCertificationResponseDto>, setPhoneNumberMessage: React.Dispatch<React.SetStateAction<string>>, setIsPhoneNumberError: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!responseBody) return;
    const { code } = responseBody;

    switch (code) {
        case ResponseCode.VALIDATION_ERROR:
            setPhoneNumberMessage('아이디와 전화번호를 입력하세요.');
            setIsPhoneNumberError(true);
            break;
        case ResponseCode.DATABASE_ERROR:
            setPhoneNumberMessage('데이터베이스 오류입니다.');
            setIsPhoneNumberError(true);
            break;
        case ResponseCode.SMS_FAIL:
            setPhoneNumberMessage('SMS 전송에 실패했습니다.');
            setIsPhoneNumberError(true);
            break;
        case ResponseCode.SUCCESS:
            setPhoneNumberMessage('인증번호가 발송되었습니다.');
            setIsPhoneNumberError(false);
            break;
        default:
            setPhoneNumberMessage('인증번호 발송에 실패했습니다.');
            setIsPhoneNumberError(true);
    }
};

export const handleCheckCertificationResponse = (responseBody: ResponseBody<CheckCertificationResponseDto>, setCertificationMessage: React.Dispatch<React.SetStateAction<string>>, setIsCertificationError: React.Dispatch<React.SetStateAction<boolean>>, setIsCertificationCheck: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!responseBody) return;
    const { code } = responseBody;

    switch (code) {
        case ResponseCode.VALIDATION_ERROR:
            alert('아이디, 이메일, 인증번호를 입력하세요.');
            break;
        case ResponseCode.DATABASE_ERROR:
            alert('데이터베이스 오류입니다.');
            break;
        case ResponseCode.CERTIFICATION_FAIL:
            setIsCertificationError(true);
            setCertificationMessage('인증번호가 일치하지 않습니다.');
            setIsCertificationCheck(false);
            break;
        case ResponseCode.SUCCESS:
            setIsCertificationError(false);
            setCertificationMessage('인증이 완료되었습니다.');
            setIsCertificationCheck(true);
            break;
    }
};

export const handleSignUpResponse = (responseBody: ResponseBody<SignUpResponseDto>, navigate: NavigateFunction) => {
    if (!responseBody) return;
    const { code } = responseBody;

    switch (code) {
        case ResponseCode.VALIDATION_ERROR:
            alert('모든 항목을 입력하세요.');
            break;
        case ResponseCode.DATABASE_ERROR:
            alert('데이터베이스 오류입니다.');
            break;
        case ResponseCode.DUPLICATE_ID:
            alert('이미 사용중인 아이디 입니다.');
            break;
        case ResponseCode.SUCCESS:
            alert('회원 가입이 완료되었습니다.');
            navigate('/signin');  // 이 부분에서 navigate 함수가 사용됩니다.
            break;
    }
};