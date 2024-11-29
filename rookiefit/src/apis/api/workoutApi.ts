import { DeleteUserWorkoutListRequestDto, GetUserWorkoutListRequestDto, InputUserWorkoutListRequestDto } from "../request/workout";
import GetUserWorkoutDetailRequestDto from "../request/workout/getUserWorkoutDetailRequest.dto";
import { DeleteUserWorkoutListResponseDto, GetUserWorkoutDetailResponseDto, GetUserWorkoutListResponseDto, InputUserWorkoutListResponseDto } from "../response/workout";
import { axiosInstance, responseHandler, errorHandler } from "./index";


export const InputUserWorkoutListRequest = async (requestBody: InputUserWorkoutListRequestDto) => {
    return axiosInstance.post('/user/input-userworkoutlistdata', requestBody)
        .then(responseHandler<InputUserWorkoutListResponseDto>)
        .catch(errorHandler);
};

export const GetUserWorkoutListRequest = async (requestBody: GetUserWorkoutListRequestDto) => {
    return axiosInstance.get('/user/userworkoutlistdata', {
        params: {
            token: requestBody.token,
        },
    })
        .then(responseHandler<GetUserWorkoutListResponseDto>)
        .catch(errorHandler);
};

export const GetUserWorkoutDetailRequest = async (requestBody: GetUserWorkoutDetailRequestDto) => {
    return axiosInstance.get('/user/userworkoutdetaildata', {
        params: {
            workoutDetailCreatedDate: requestBody.workoutDetailCreatedDate,
        },
    })
        .then(responseHandler<GetUserWorkoutDetailResponseDto>)
        .catch(errorHandler);
};

export const DeleteUserWorkoutListRequest = async (requestBody: DeleteUserWorkoutListRequestDto) => {
    return axiosInstance.delete('/user/delete-userworkoutlistdata', {
        params: {
            workoutCreatedDate: requestBody.workoutCreatedDate,
            token: requestBody.token,
        },
    })
        .then(responseHandler<DeleteUserWorkoutListResponseDto>)
        .catch(errorHandler);
};
