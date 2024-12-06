import { DeleteUserDietListRequest, GetDietDataDetailRequest, GetDietDataRequest, InputUserDietListRequest } from "../../apis/api/dietApi";
import { InputUserDietListRequestDto } from "../../apis/request/diet";

// 음식 데이터 가져오기
export const fetchDietDataDetail = async (selectedDate: string) => {
    const response = await GetDietDataDetailRequest(selectedDate);
    console.log(response); // 응답 확인

    if (response && response.length > 0) {
        const dietDetails = response[0].dietDetails;
        console.log(dietDetails); // dietDetails 확인

        const data = dietDetails.map((item: any) => ({
            userDietDetailId: item.userDietDetailId,
            food_name: item.foodName,
            enerc: item.enerc,
            food_first_category: item.foodFirstCategory || "",
            chocdf: item.chocdf || 0,
            prot: item.prot || 0,
            fatce: item.fat || 0,
        }));
        return data;
    }
    return [];
};

// 음식 검색
export const fetchDietDataRequest = async (searchTerm: string) => {
    const response = await GetDietDataRequest(searchTerm);
    return response;
};

// 음식 추가
export const addFoodToDiet = async (selectedDate: string, updatedDietDetails: any[]) => {
    const requestBody: InputUserDietListRequestDto = {
        diet_created_date: selectedDate,
        total_calories: updatedDietDetails.reduce((sum, item) => sum + item.enerc, 0),
        dietDetails: updatedDietDetails,
    };

    await InputUserDietListRequest(requestBody);
};

// 음식 삭제
export const deleteFoodFromDiet = async (id: number) => {
    await DeleteUserDietListRequest({ userDietDetailId: id });
};
