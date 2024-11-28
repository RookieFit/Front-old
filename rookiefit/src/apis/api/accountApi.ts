import { axiosInstance, responseHandler, errorHandler } from "./index";
import { CheckFindUserIdRequestDto, CheckFindUserPasswordRequestDto, FindUserPasswordRequestDto, UserDeleteRequestDto } from "../request/account";
import { CheckFindUserIdResponseDto, CheckFindUserPasswordResponseDto, FindUserPasswordResponseDto, UserDeleteResponseDto } from "../response/account";
import FindUserIdRequestDto from "../request/account/findUserIdRequest.dto";
import FindUserIdResponseDto from "../response/account/findUserIdResponse.dto";

export const FindUserIdRequest = async (requestBody: FindUserIdRequestDto) => {
    return axiosInstance.post('/auth/find-id', requestBody)
        .then(responseHandler<FindUserIdResponseDto>)
        .catch(errorHandler);
};

export const CheckFindUserIdRequest = async (requestBody: CheckFindUserIdRequestDto) => {
    return axiosInstance.post('/auth/check-find-id', requestBody)
        .then(responseHandler<CheckFindUserIdResponseDto>)
        .catch(errorHandler);
};

export const FindUserPasswordRequest = async (requestBody: FindUserPasswordRequestDto) => {
    return axiosInstance.post('/auth/find-password', requestBody)
        .then(responseHandler<FindUserPasswordResponseDto>)
        .catch(errorHandler);
};

export const CheckFindUserPasswordRequest = async (requestBody: CheckFindUserPasswordRequestDto) => {
    return axiosInstance.post('/auth/check-find-password', requestBody)
        .then(responseHandler<CheckFindUserPasswordResponseDto>)
        .catch(errorHandler);
};

export const UserDeleteRequest = async (requestBody: UserDeleteRequestDto) => {
    return axiosInstance.get('/auth/user-delete', {
        params: {
            user_password: requestBody.user_password,
            token: requestBody.token,
        },
    })
        .then(responseHandler<UserDeleteResponseDto>)
        .catch(errorHandler);
};
