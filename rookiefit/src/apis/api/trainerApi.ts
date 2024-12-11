import { axiosInstance, responseHandler, errorHandler } from "./index";
import LicenseApproveRequestDto from "../request/trainer/LicenseApproveRequest.dto";
import InputTrainerRequestDto from "../request/trainer/InputTrainerRequest.dto";
import LicenseApproveResponseDto from "../response/trainer/LicenseApproveResponse.dto";
import InputTrainerResponseDto from "../response/trainer/InputTrainerResponse.dto";
import axios from "axios";
import dotenv from "dotenv";

// 환경 변수 초기화
dotenv.config();

// 트레이너 인증 요청(POST)
export const LicenseApproveRequest = async (requestBody: LicenseApproveRequestDto) => {
    return axiosInstance.post('/user/trainer-register', requestBody)
        .then(responseHandler<LicenseApproveResponseDto>)
        .catch(errorHandler);
};

// 트레이너 사업자 인증API(POST)
export const InputTrainerRequest = async (requestBody: InputTrainerRequestDto) => {
    const SERVICE_KEY = process.env.OD_API_KEY;
    if (!SERVICE_KEY) {
        throw new Error("OD_API_KEY is not defined in environment variables");
    }
    const API_URL = 'http://api.odcloud.kr/api/nts-businessman/v1/validate';
    const url = `${API_URL}?serviceKey=${SERVICE_KEY}`;

    return axios.post(url, requestBody)
        .then(responseHandler<InputTrainerResponseDto>)
        .catch(errorHandler);
};
