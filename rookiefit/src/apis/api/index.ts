import axios, { AxiosResponse } from "axios";
import ResponseDto from "../response/response.dto"; // ResponseDto 타입 정의 필요
import { getJwtToken } from "../../authCheck/storageUtils";
const token = getJwtToken()

const DOMAIN = 'http://localhost:4040';
export const API_DOMAIN = `${DOMAIN}/api/v1`;

export const axiosInstance = axios.create({
    baseURL: API_DOMAIN,
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
    },
});

// 1. Response 타입을 일반화
export const responseHandler = <T>(response: AxiosResponse<T>): T => {
    return response.data;
};

// 2. 에러 타입 명시
export const errorHandler = (error: unknown): ResponseDto | null => {
    if (axios.isAxiosError(error)) {
        // AxiosError 타입의 경우만 처리
        return error.response?.data ?? null;
    }
    // AxiosError가 아닌 경우 null 반환
    return null;
};
