/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface GetDietDataDetailResponseDto extends ResponseDto {
    dietCreatedDate: string;
    totalCalories: number;
    dietDetails: DietDetail[];
}
interface DietDetail {
    foodName: string;
    foodFirstCategory: string;
    chocdf: number;
    prot: number;
    fat: number;
    enerc: number;
}