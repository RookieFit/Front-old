/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { CheckCertificationRequestDto, IdCheckRequestDto, SignUpRequestDto, SmsCertificationRequestDto } from "./request/auth";
import { CheckCertificationResponseDto, IdCheckResponseDto, SignUpResponseDto, SmsCertificationResponseDto } from "./response/auth";
import ResponseDto from "./response/response.dto";

const responseHandler = <T>(response: AxiosResponse<any, any>) => {
    const responseBody: T = response.data;
    return responseBody;
};

const errorHandler = (error: any) => {
    if (!error.response || !error.response.data) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
};

const DOMAIN = 'http://localhost:4040';

const API_DOMAIN = `${DOMAIN}/api/v1`;

export const SNS_SIGN_IN_URL = (type: 'kakao' | 'naver') => `${API_DOMAIN}/auth/oauth2/${type}`;
const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;
const SMS_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/sms-certification`;
const CHECK_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/check-certification`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const IdCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios.post(ID_CHECK_URL(), requestBody)
        .then(responseHandler<IdCheckResponseDto>)
        .catch(errorHandler)
    return result;
}

export const SmsCertificationRequest = async (requestBody: SmsCertificationRequestDto) => {
    const result = await axios.post(SMS_CERTIFICATION_URL(), requestBody)
        .then(responseHandler<SmsCertificationResponseDto>)
        .catch(errorHandler)
    return result;
}

export const CheckCertificationRequest = async (requestBody: CheckCertificationRequestDto) => {
    const result = await axios.post(CHECK_CERTIFICATION_URL(), requestBody)
        .then(responseHandler<CheckCertificationResponseDto>)
        .catch(errorHandler)
    return result;
}

export const SignUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(responseHandler<SignUpResponseDto>)
        .catch(errorHandler)
    return result;
}
