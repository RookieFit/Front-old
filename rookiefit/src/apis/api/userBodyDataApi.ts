import { axiosInstance, errorHandler, responseHandler } from ".";
import { InputUserBodyDataRequestDto } from "../request/userBodyData";
import { InputUserBodyDataResponseDto } from "../response/userBodyData";

export const InputUserBodyDataRequest = async (requestBody: InputUserBodyDataRequestDto) => {
    return axiosInstance.post('/user/input-userbodydata', requestBody)
        .then(responseHandler<InputUserBodyDataResponseDto>)
        .catch(errorHandler);
};

export const GetUserBodyDataRequest = async () => {
    return axiosInstance.get('/user/userbodydata')
        .then(responseHandler)
        .catch(errorHandler);
};

