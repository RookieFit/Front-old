import { axiosInstance, responseHandler, errorHandler } from "./index";
import { GetDietDataDetailResponseDto, GetDietDataResponseDto, InputFoodInfoResponseDto, InputUserDietListResponseDto } from "../response/diet";
import InputUserDietListRequestDto from "../request/diet/inputUserDietListRequest.dto";
import { DeleteUserDietListRequestDto, GetDietDataDetailRequestDto, InputFoodInfoRequestDto } from "../request/diet";

export const GetDietDataRequest = async (keyword: string): Promise<GetDietDataResponseDto[]> => {
    return axiosInstance.get('/user/dietsearch', {
        params: { keyword },
    })
        .then(response => responseHandler<GetDietDataResponseDto[]>(response)) // 배열 반환
        .catch(error => {
            console.error("Error fetching diet data:", error);
            return []; // 에러 발생 시 빈 배열 반환
        });
};

export const InputUserDietListRequest = async (requestBody: InputUserDietListRequestDto) => {
    return axiosInstance.post('/user/input-userdietlistdata', requestBody)
        .then(responseHandler<InputUserDietListResponseDto>)
        .catch(errorHandler);
};

export const InputFoodInfoRequest = async (requestBody: InputFoodInfoRequestDto) => {
    return axiosInstance.post('/user/insert-foodinfo', requestBody)
        .then(responseHandler<InputFoodInfoResponseDto>)
        .catch(errorHandler);
};

export const DeleteUserDietListRequest = async (requestBody: DeleteUserDietListRequestDto) => {
    return axiosInstance.delete('/user/delete-userdietlistdata', {
        params: {
            token: requestBody.token,
            diet_created_date: requestBody.diet_created_date
        }
    })
        .then(responseHandler<InputFoodInfoResponseDto>)
        .catch(errorHandler);
};

export const GetDietDataDetailRequest = async (requestBody: GetDietDataDetailRequestDto) => {
    return axiosInstance.get('/user/userdietlistdata', {
        params: {
            token: requestBody.token,
            diet_created_date: requestBody.diet_created_date
        }
    })
        .then(responseHandler<GetDietDataDetailResponseDto>)
        .catch(errorHandler);
};
