export default interface InputUserWorkoutListRequestDto {
    comment: string;
    workout_title: string;
    workoutCreatedData: string;
    workoutDetails: WorkoutDetails[];
    workoutImageUris: string[];
}

export interface WorkoutDetails {
    workoutDetailCreatedDate: string;
    workout_name: string;
    reps: number;
    sets: number;
    rest_time: string;
}
