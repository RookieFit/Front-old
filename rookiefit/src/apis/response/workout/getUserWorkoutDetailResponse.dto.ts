/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface GetUserWorkoutDetailResponseDto extends ResponseDto {
    workoutDetailCreatedDate: string;
    workout_name: string;
    reps: string;
    sets: string;
    rest_time: [];
}