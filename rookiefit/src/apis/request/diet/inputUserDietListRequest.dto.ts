export default interface InputUserDietListRequestDto {
    token: string
    diet_created_date: string
    total_calories: number
    dietDetails: []
}

export interface DietDetail {
    food_name: string;
    food_first_category: string;
    chocdf: number;
    prot: number;
    fatce: number;
    enerc: number;
}