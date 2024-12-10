import { axiosInstance, errorHandler, responseHandler } from ".";
import { InputUserProfileRequestDto } from "../request/profile";
import { InputUserProfileResponseDto } from "../response/profile";

export const InputUserProfileRequest = async (requestBody: InputUserProfileRequestDto) => {
    return axiosInstance.post('/user/input-userprofile', requestBody)
        .then(responseHandler<InputUserProfileResponseDto>)
        .catch(errorHandler);
};

export const GetUserProfileRequest = async () => {
    return axiosInstance.get('/user/userprofile')
        .then(responseHandler)
        .catch(errorHandler);
};

