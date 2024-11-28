/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { CheckCertificationRequestDto, IdCheckRequestDto, SignInRequestDto, SignUpRequestDto, SmsCertificationRequestDto } from "./request/auth";
import { CheckCertificationResponseDto, IdCheckResponseDto, SignInResponseDto, SignUpResponseDto, SmsCertificationResponseDto } from "./response/auth";
import ResponseDto from "./response/response.dto";
import FindUserIdRequestDto from "./request/account/findUserIdRequest.dto";
import FindUserIdResponseDto from "./response/account/findUserIdResponse.dto";
import { CheckFindUserIdRequestDto, CheckFindUserPasswordRequestDto, FindUserPasswordRequestDto, UserDeleteRequestDto } from "./request/account";
import { CheckFindUserIdResponseDto, CheckFindUserPasswordResponseDto, FindUserPasswordResponseDto, UserDeleteResponseDto } from "./response/account";
import { UserCommunityAnswerRequestDto, UserCommunityResquestDto } from "./request/community";
import { getByContentTypeUserCommunityResponseDto, getSearchUserCommunityResponseDto, getUserCommunityResponseDto, userCommunityAnswerResponseDto, userCommunityResponseDto } from "./response/community";
import getAllUserCommunityResponseDto from "./response/community/getAllUserCommunityResponse.dto";
import DeleteUserCommunityResponseDto from "./response/community/deleteUserCommunityResponse.dto";

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
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const FIND_USER_ID_URL = () => `${API_DOMAIN}/auth/find-id`;
const CHECK_FIND_USER_ID_URL = () => `${API_DOMAIN}/auth/check-find-id`;
const CHECK_FIND_USER_PASSWORD_URL = () => `${API_DOMAIN}/auth/check-find-password`;
const USER_COMMUNITY_URL = () => `${API_DOMAIN}/user/input-usercommunit`;
const USER_COMMUNITY_ANSWER_URL = () => `${API_DOMAIN}/user/input-usercommunity-answer`;
const GET_ALL_USER_COMMUNITY_URL = () => `${API_DOMAIN}/user/get-all-usercommunity`;
const GET_BY_CONTENT_TYPE_USER_COMMUNITY_URL = () => `${API_DOMAIN}/user/get-bycontenttype-usercommunity`;
const GET_USER_COMMUNITY_URL = () => `${API_DOMAIN}/user/getusercommunity/{id}`;
const DELETE_USER_COMMUNITY_URL = () => `${API_DOMAIN}/user/delete-usercommunity`;
const DELETE_USER_COMMUNITY_ANSWER_URL = () => `${API_DOMAIN}/user/delete-usercommunity-answer`;
const GET_SEARCH_USER_COMMUNITY_URL = () => `${API_DOMAIN}/user/communitysearch`;
const USER_DELETE_URL = () => `${API_DOMAIN}/user-delete`;


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

export const SignInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(responseHandler<SignInResponseDto>)
        .catch(errorHandler)
    return result;
}

export const FindUserIdRequest = async (requestBody: FindUserIdRequestDto) => {
    const result = await axios.post(FIND_USER_ID_URL(), requestBody)
        .then(responseHandler<FindUserIdResponseDto>)
        .catch(errorHandler)
    return result;
}

export const CheckFindUserIdRequest = async (requestBody: CheckFindUserIdRequestDto) => {
    const result = await axios.post(CHECK_FIND_USER_ID_URL(), requestBody)
        .then(responseHandler<CheckFindUserIdResponseDto>)
        .catch(errorHandler)
    return result;
}

export const CheckFindUserPasswordRequest = async (requestBody: CheckFindUserPasswordRequestDto) => {
    const result = await axios.post(CHECK_FIND_USER_PASSWORD_URL(), requestBody)
        .then(responseHandler<CheckFindUserPasswordResponseDto>)
        .catch(errorHandler)
    return result;
}

export const FindUserPasswordRequest = async (requestBody: FindUserPasswordRequestDto) => {
    const result = await axios.post(FIND_USER_ID_URL(), requestBody)
        .then(responseHandler<FindUserPasswordResponseDto>)
        .catch(errorHandler)
    return result;
}

export const UserDeleteRequest = async (requestBody: UserDeleteRequestDto) => {
    const result = await axios.post(USER_DELETE_URL(), requestBody)
        .then(responseHandler<UserDeleteResponseDto>)
        .catch(errorHandler)
    return result;
}

export const UserCommunityRequest = async (requestBody: UserCommunityResquestDto) => {
    const result = await axios.post(USER_COMMUNITY_URL(), requestBody)
        .then(responseHandler<userCommunityResponseDto>)
        .catch(errorHandler)
    return result;
}

export const UserCommunityAnswerRequest = async (requestBody: UserCommunityAnswerRequestDto) => {
    const result = await axios.post(USER_COMMUNITY_ANSWER_URL(), requestBody)
        .then(responseHandler<userCommunityAnswerResponseDto>)
        .catch(errorHandler)
    return result;
}

export const getAllUserCommunityRequest = async () => {
    const result = await axios.get(GET_ALL_USER_COMMUNITY_URL())
        .then(responseHandler<getAllUserCommunityResponseDto>)
        .catch(errorHandler)
    return result;
}

export const getByContentTypeUserCommunityRequest = async () => {
    const result = await axios.get(GET_BY_CONTENT_TYPE_USER_COMMUNITY_URL())
        .then(responseHandler<getByContentTypeUserCommunityResponseDto>)
        .catch(errorHandler)
    return result;
}

export const getUserCommunityRequest = async () => {
    const result = await axios.get(GET_USER_COMMUNITY_URL())
        .then(responseHandler<getUserCommunityResponseDto>)
        .catch(errorHandler)
    return result;
}

export const deleteUserCommunityRequest = async () => {
    const result = await axios.delete(DELETE_USER_COMMUNITY_URL())
        .then(responseHandler<DeleteUserCommunityResponseDto>)
        .catch(errorHandler)
    return result;
}

export const deleteUserCommunityAnswerRequest = async () => {
    const result = await axios.delete(DELETE_USER_COMMUNITY_ANSWER_URL())
        .then(responseHandler<DeleteUserCommunityResponseDto>)
        .catch(errorHandler)
    return result;
}

export const getSearchUserCommunityRequest = async () => {
    const result = await axios.get(GET_SEARCH_USER_COMMUNITY_URL())
        .then(responseHandler<getSearchUserCommunityResponseDto>)
        .catch(errorHandler)
    return result;
}

