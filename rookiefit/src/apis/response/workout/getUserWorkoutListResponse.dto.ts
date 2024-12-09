/* eslint-disable @typescript-eslint/no-empty-object-type */
import ResponseDto from "../response.dto";

export default interface GetUserWorkoutListResponseDto extends ResponseDto {
    comment: string;
    workout_title: string;
    workoutCreatedData: string;
    imageUris: string[];
}