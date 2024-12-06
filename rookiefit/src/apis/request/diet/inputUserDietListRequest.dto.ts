export default interface InputUserDietListRequestDto {
    diet_created_date: string
    total_calories: number
    dietDetails: DietDetail[]
}

export interface DietDetail {
    food_name: string;
    food_first_category: string;
    chocdf: number;
    prot: number;
    fatce: number;
    enerc: number;
}
