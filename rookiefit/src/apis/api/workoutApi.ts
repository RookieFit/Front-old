import { DeleteUserWorkoutListRequestDto, GetUserWorkoutListRequestDto, InputUserWorkoutListRequestDto } from "../request/workout";
import GetUserWorkoutDetailRequestDto from "../request/workout/getUserWorkoutDetailRequest.dto";
import { DeleteUserWorkoutListResponseDto, GetUserWorkoutDetailResponseDto, GetUserWorkoutListResponseDto, InputUserWorkoutListResponseDto } from "../response/workout";
import { axiosInstance, responseHandler, errorHandler } from "./index";

export const InputUserWorkoutListRequest = async (requestBody: InputUserWorkoutListRequestDto) => {
    return axiosInstance.post('/user/input-userworkoutlistdata', requestBody)
        .then(responseHandler<InputUserWorkoutListResponseDto>)
        .catch(errorHandler);
};

export const GetUserWorkoutListRequest = async () => {
    return axiosInstance.get('/user/userworkoutlistdata')
        .then(response => responseHandler<GetUserWorkoutListResponseDto[]>(response)) // 응답 데이터 반환
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
        },
    })
        .then(responseHandler<DeleteUserWorkoutListResponseDto>)
        .catch(errorHandler);
};
