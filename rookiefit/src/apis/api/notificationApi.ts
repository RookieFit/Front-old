import { axiosInstance, responseHandler, errorHandler } from "./index";
import NotificationRequestDto from "../request/notification/NotificationRequest.dto";
import { GetNotificationListResponseDto, InputNotificationResponse, DeleteNotificationResponseDto, GetNotificationResponseDto } from "../response/notification";

// 공지사항 입력(POST)
export const NotificationRequest = async (requestBody: NotificationRequestDto) => {
    return axiosInstance.post('/admin/create-notification', requestBody)
        .then(responseHandler<InputNotificationResponse>)
        .catch(errorHandler);
};

// 공지사항 수정(PUT)
export const UpdateNotificationRequest = async (id: number, requestBody: NotificationRequestDto) => {
    return axiosInstance.put(`/admin/update-notification/${id}`, requestBody)
        .then(responseHandler<InputNotificationResponse>)
        .catch(errorHandler);
};

// 공지사항 전부 가져오기(GET)
export const GetAllNotificationRequest = async (): Promise<GetNotificationListResponseDto[]> => {
    return axiosInstance.get('/user/get-all-notification')
        .then(responseHandler<GetNotificationListResponseDto[]>)
        .catch(error => {
            console.error("Error fetching diet data:", error);
            return [];
        });
};

// 공지사항 검색 가져오기(GET)
export const SearchNotificationRequest = async (keyword: string, field: string): Promise<GetNotificationListResponseDto[]> => {
    return axiosInstance.get('/user/get-notification/search-notification', {
        params: { keyword, field },
    })
        .then(responseHandler<GetNotificationListResponseDto[]>)
        .catch(error => {
            console.error("Error fetching diet data:", error);
            return [];
        });
};

// 공지사항 선택 가져오기(GET)
export const GetNotificationRequest = async (id: string): Promise<GetNotificationResponseDto[]> => {
    return axiosInstance.get(`/user/get-notification/${id}`, {
        params: { id },
    })
        .then(responseHandler<GetNotificationResponseDto[]>)
        .catch(error => {
            console.error("Error fetching diet data:", error);
            return [];
        });
};

// 공지사항 삭제(DELETE)
export const DeleteNotificationRequest = async (notificationId: number): Promise<DeleteNotificationResponseDto> => {
    return axiosInstance.delete(`/admin/delete-notification/${notificationId}`)
        .then(responseHandler<DeleteNotificationResponseDto>)
        .catch(error => {
            console.error("Error deleting notification:", error);
            throw new Error("Error occurred while deleting notification"); // 오류 메시지 추가
        });
};