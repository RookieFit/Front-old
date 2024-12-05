/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface GetDietDataDetailResponseDto extends ResponseDto {
    dietCreatedDate: string;
    totalCalories: number;
    dietDetails: DietDetail[];
}
interface DietDetail {
    food_name: string;
    food_first_category: string;
    chocdf: number;
    prot: number;
    fatce: number;
    enerc: number;
}