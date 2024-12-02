/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface GetDietDataResponseDto extends ResponseDto {
    id: number;
    foodName: string;
    food_First_Category: string;
    chocdf: number;// 탄수화물
    prot: number;// 단백질
    fatce: number;// 지방
    enerc: number;// 열량
}