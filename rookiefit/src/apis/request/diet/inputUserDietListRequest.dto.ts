export default interface InputUserDietListRequestDto {
    diet_created_date: string
    total_calories: number
    dietDetails: DietDetail[]
}

export interface DietDetail {
    foodName: string;
    foodFirstCategory: string;
    chocdf: number;
    prot: number;
    fat: number;
    enerc: number;
}
