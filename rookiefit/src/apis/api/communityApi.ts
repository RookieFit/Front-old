import { axiosInstance, responseHandler, errorHandler } from "./index";
import {
    UserCommunityResquestDto,
    UserCommunityAnswerRequestDto
} from "../request/community";
import {
    UserCommunityResponseDto,
    UserCommunityAnswerResponseDto,
    GetAllUserCommunityResponseDto,
    GetByContentTypeUserCommunityResponseDto,
    GetUserCommunityResponseDto,
    DeleteUserCommunityResponseDto,
    GetSearchUserCommunityResponseDto
} from "../response/community";

export const UserCommunityRequest = async (requestBody: UserCommunityResquestDto) => {
    return axiosInstance.post('/user/input-usercommunity', requestBody)
        .then(responseHandler<UserCommunityResponseDto>)
        .catch(errorHandler);
};

export const UserCommunityAnswerRequest = async (requestBody: UserCommunityAnswerRequestDto) => {
    return axiosInstance.post('/user/input-usercommunity-answer', requestBody)
        .then(responseHandler<UserCommunityAnswerResponseDto>)
        .catch(errorHandler);
};

export const GetAllUserCommunityRequest = async () => {
    return axiosInstance.get('/user/get-all-usercommunity')
        .then(responseHandler<GetAllUserCommunityResponseDto>)
        .catch(errorHandler);
};

export const GetByContentTypeUserCommunityRequest = async () => {
    return axiosInstance.get('/user/get-bycontenttype-usercommunity')
        .then(responseHandler<GetByContentTypeUserCommunityResponseDto>)
        .catch(errorHandler);
};

export const GetUserCommunityRequest = async (id: string) => {
    return axiosInstance.get(`/user/getusercommunity/${id}`)
        .then(responseHandler<GetUserCommunityResponseDto>)
        .catch(errorHandler);
};

export const DeleteUserCommunityRequest = async () => {
    return axiosInstance.delete(`/user/delete-usercommunity`)
        .then(responseHandler<DeleteUserCommunityResponseDto>)
        .catch(errorHandler);
};

export const DeleteUserCommunityAnswerRequest = async () => {
    return axiosInstance.delete(`/user/delete-usercommunity-answer`)
        .then(responseHandler<DeleteUserCommunityResponseDto>)
        .catch(errorHandler);
};

export const GetSearchUserCommunityRequest = async () => {
    return axiosInstance.get(`/user/communitysearch`)
        .then(responseHandler<GetSearchUserCommunityResponseDto>)
        .catch(errorHandler);
};
