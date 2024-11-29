import { axiosInstance, responseHandler, errorHandler } from "./index";
import { MarketItemListRequestDto } from "../request/market/marketItemListRequest.dto";
import { GetAllMarketItemListResponseDto } from "../response/market";
import { DeleteUserWorkoutListResponseDto } from "../response/workout";

// 상품 등록 요청 함수 (POST)
export const MarketItemListRequest = async (requestBody: MarketItemListRequestDto) => {
    return axiosInstance.post('user/input-marketlist', requestBody)
        .then(responseHandler<MarketItemListRequestDto>)
        .catch(errorHandler);
};

// 상품 업데이트 요청 함수 (PUT)
export const UpdateMarketItemRequest = async (id: string, requestBody: MarketItemListRequestDto) => {
    return axiosInstance.put(`user/updatemarketlist/${id}`, requestBody)
        .then(responseHandler<MarketItemListRequestDto>)
        .catch(errorHandler);
};

// 상품 리스트 가져오기 함수 (Get)
export const GetAllMarketItemListRequest = async () => {
    return axiosInstance.get('/user/getallmarketlist')
        .then(responseHandler<GetAllMarketItemListResponseDto>)
        .catch(errorHandler);
};

// 상품 상태에 따라 마켓 리스트 가져오기 함수 (GET)
export const GetMarketListBySaleStatusRequest = async (saleStatus: 'SELLING' | 'BUYING' | 'SOLD' | 'BOUGHT') => {
    return axiosInstance.get('/user/getmarketlistbysalestatus', {
        params: {
            saleStatus, // saleStatus 값을 쿼리 파라미터로 전달
        },
    })
        .then(responseHandler<GetAllMarketItemListResponseDto>)
        .catch(errorHandler);
};

// 해당 마켓게시물 가져오기 함수 (GET)
export const GetMarketItemRequest = async (id: string) => {
    return axiosInstance.get(`/user/getmarketitem/${id}`)
        .then(responseHandler<GetAllMarketItemListResponseDto>)
        .catch(errorHandler);
};

// 해당 마켓게시물 검색 함수 (GET)
export const SearchMarketListRequest = async (keyword: string, field?: 'title' | 'description' | 'location') => {
    return axiosInstance.get('/user/marketlistsearch', {
        params: { keyword, field },
    })
        .then(responseHandler<GetAllMarketItemListResponseDto>)
        .catch(errorHandler);
};

// 마켓 상품 삭제 (DELETE)
export const DeleteUserWorkoutListRequest = async (id: string) => {
    return axiosInstance.delete(`/user/deletemarketitem/${id}`)
        .then(responseHandler<DeleteUserWorkoutListResponseDto>)
        .catch(errorHandler);
};
