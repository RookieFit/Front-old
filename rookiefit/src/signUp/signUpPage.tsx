import React, { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../inputBox/inputBox';
import ImageUploaderMany from '../components/ImageUploaderMany';
import './signUpPage.css';
import { CheckCertificationRequestDto, IdCheckRequestDto, SignUpRequestDto, SmsCertificationRequestDto } from '../apis/request/auth';
import { ResponseCode } from '../apis/types/enums';
import { CheckCertificationResponseDto, IdCheckResponseDto, SignUpResponseDto, SmsCertificationResponseDto } from '../apis/response/auth';
import { ResponseBody } from '../apis/types';
import { CheckCertificationRequest, IdCheckRequest, SignUpRequest, SmsCertificationRequest } from '../apis/apiClient';

function SignUpPage() {
    const navigate = useNavigate();
    // 기존 상태 변수들...
    const [trainerCertificationImages, setTrainerCertificationImages] = useState<File[]>([]);
    const [isCertified, setIsCertified] = useState<boolean>(false);

    // 기존 함수들...

    // 트레이너 자격증 이미지 업로드 처리
    const handleCertificationUpload = (files: File[]) => {
        setTrainerCertificationImages(files);
    };

    // 트레이너 인증 확인
    const verifyCertification = async () => {
        if (trainerCertificationImages.length === 0) {
            alert("트레이너 자격증 이미지를 업로드해주세요.");
            return;
        }

        // TODO: 서버로 이미지 전송 및 검증 로직 구현
        // const response = await uploadAndVerifyCertification(trainerCertificationImages);
        // if (response.isValid) {
        //   setIsCertified(true);
        // }

        // 임시로 항상 인증 성공으로 처리
        setIsCertified(true);
        alert("트레이너 인증이 완료되었습니다.");
    };

    // 회원가입 버튼 클릭 핸들러 수정
    const onSignUpButtonClickHandler = () => {
        if (!userId || !password || !certificationNumber || !isCertified) {
            alert("모든 정보를 입력하고 트레이너 인증을 완료해주세요.");
            return;
        }

        const requestBody: SignUpRequestDto = {
            userId,
            user_password: password,
            user_phonenumber: userPhoneNumber,
            user_email: "asd@asd.com",
            is_trainer: isCertified
        };

        SignUpRequest(requestBody).then(signUpResponse);
    };

    return (
        <div id="sign-up-wrapper">
            <div className="sign-up-title">회원 가입</div>
            {/* 기존 InputBox 컴포넌트들... */}

            {/* 트레이너 자격증 업로드 */}
            <div className="certification-upload">
                <div className="input-box-title">트레이너 자격증</div>
                <ImageUploaderMany maxImages={3} />
                <button className="verify-button" onClick={verifyCertification}>
                    인증 확인
                </button>
            </div>
            {isCertified && <div className="input-box-message">인증되었습니다!</div>}

            <div className="underline"></div>
            <button className="sign-up-button" onClick={onSignUpButtonClickHandler}>
                회원가입
            </button>
        </div>
    );
}

export default SignUpPage;