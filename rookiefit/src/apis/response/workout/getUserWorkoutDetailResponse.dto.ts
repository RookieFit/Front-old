/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface GetUserWorkoutDetailResponseDto extends ResponseDto {
    workoutDetailCreatedDate: string;
    workout_name: string;
    reps: number;
    sets: number;
    rest_time: string;
}