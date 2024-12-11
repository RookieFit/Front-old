import { DeleteUserWorkoutListRequestDto, InputUserWorkoutListRequestDto } from "../request/workout";
import GetUserWorkoutDetailRequestDto from "../request/workout/getUserWorkoutDetailRequest.dto";
import { DeleteUserWorkoutListResponseDto, GetUserWorkoutDetailResponseDto, GetUserWorkoutListResponseDto, InputUserWorkoutListResponseDto } from "../response/workout";
import { axiosInstance, responseHandler, errorHandler } from "./index";

export const InputUserWorkoutListRequest = async (requestBody: InputUserWorkoutListRequestDto) => {
    return axiosInstance.post('/user/input-userworkoutlistdata', requestBody)
        .then(responseHandler<InputUserWorkoutListResponseDto>)
        .catch(errorHandler);
};

export const GetUserWorkoutListRequest = async (): Promise<GetUserWorkoutListResponseDto[]> => {
    try {
        const response = await axiosInstance.get('/user/userworkoutlistdata'); // API 호출
        return responseHandler<GetUserWorkoutListResponseDto[]>(response); // 성공적으로 데이터를 처리하여 반환
    } catch (error) {
        errorHandler(error); // 에러 처리
        throw new Error("API 요청 실패");
    }
};

export const GetUserWorkoutDetailRequest = (requestBody: GetUserWorkoutDetailRequestDto) => {
    return axiosInstance.get('/user/userworkoutdetaildata', {
        params: {
            workoutDetailCreatedDate: requestBody.workoutDetailCreatedDate,
        },
    })
        .then((response) => {
            console.log("api호출값:", response)
            // 성공적인 응답 처리
            return responseHandler<GetUserWorkoutDetailResponseDto>(response);
        })
        .catch((error) => {
            // 에러 처리
            console.error(error);
            throw new Error("API 요청 실패");
        });
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
