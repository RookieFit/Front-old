import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getJwtToken } from "../../authCheck/storageUtils";
import { ResponseDto } from "../response";

//const DOMAIN = 'http://localhost:4040';
const DOMAIN = 'http://13.124.147.123:4040';
export const API_DOMAIN = `${DOMAIN}/api/v1`;

export const axiosInstance = axios.create({
    baseURL: API_DOMAIN,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getJwtToken(); // 최신 토큰 동적으로 가져오기
        if (token) {
            // AxiosHeaders를 사용해 Authorization 헤더 추가
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config; // config를 그대로 반환
    },
    (error) => {
        console.error('요청 인터셉터 에러:', error);
        return Promise.reject(error); // 에러를 그대로 전달
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('응답 성공:', response);
        return response; // 응답 데이터를 그대로 반환
    },
    (error) => {
        console.error('응답 인터셉터 에러:', error.response || error.message);
        return Promise.reject(error); // 에러를 그대로 전달
    }
);

// Response 핸들러
export const responseHandler = <T>(response: AxiosResponse<T>): T => {
    console.log("응답 데이터:", response.data);
    return response.data;
};

// Error 핸들러
export const errorHandler = (error: unknown): ResponseDto | null => {
    if (axios.isAxiosError(error)) {
        console.error('Error Response:', error.response); // 에러 발생 시 서버 응답 확인
        return error.response?.data ?? null;
    }
    return null; // AxiosError가 아닌 경우 null 반환
};