import { axiosInstance, responseHandler, errorHandler } from "./index";
import {
    IdCheckRequestDto,
    SmsCertificationRequestDto,
    CheckCertificationRequestDto,
    SignUpRequestDto,
    SignInRequestDto
} from "../request/auth";
import {
    IdCheckResponseDto,
    SmsCertificationResponseDto,
    CheckCertificationResponseDto,
    SignUpResponseDto,
    SignInResponseDto
} from "../response/auth";

export const IdCheckRequest = async (requestBody: IdCheckRequestDto) => {
    return axiosInstance.post('/auth/id-check', requestBody)
        .then(responseHandler<IdCheckResponseDto>)
        .catch(errorHandler);
};

export const SmsCertificationRequest = async (requestBody: SmsCertificationRequestDto) => {
    return axiosInstance.post('/auth/sms-certification', requestBody)
        .then(responseHandler<SmsCertificationResponseDto>)
        .catch(errorHandler);
};

export const CheckCertificationRequest = async (requestBody: CheckCertificationRequestDto) => {
    return axiosInstance.post('/auth/check-certification', requestBody)
        .then(responseHandler<CheckCertificationResponseDto>)
        .catch(errorHandler);
};

export const SignUpRequest = async (requestBody: SignUpRequestDto) => {
    return axiosInstance.post('/auth/sign-up', requestBody)
        .then(responseHandler<SignUpResponseDto>)
        .catch(errorHandler);
};

export const SignInRequest = async (requestBody: SignInRequestDto) => {
    return axiosInstance.post('/auth/sign-in', requestBody)
        .then(responseHandler<SignInResponseDto>)
        .catch(errorHandler);
};
