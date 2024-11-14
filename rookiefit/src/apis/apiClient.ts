/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { IdCheckRequestDto } from "./request/auth";
import { IdCheckResponseDto } from "./response/auth";
import ResponseDto from "./response/response.dto";

const responseHandler = <T>(response: AxiosResponse<any, any>) => {
    const responseBody: T = response.data;
    return responseBody;
};

const errorHandler = (error: any) => {
    if (!error.response || !error.response.data) return null;
    const responseBody: ResponseDto = error.response.data;
    return responseBody;
};

const DOMAIN = 'http://localhost:4040';

const API_DOMAIN = `${DOMAIN}/api/v1`;

export const SNS_SIGN_IN_URL = (type: 'kakao' | 'naver') => `${API_DOMAIN}/auth/oauth2/${type}`;
const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;

export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios.post(ID_CHECK_URL(), requestBody)
        .then(responseHandler<IdCheckResponseDto>)
        .catch(errorHandler)
    return result;
}