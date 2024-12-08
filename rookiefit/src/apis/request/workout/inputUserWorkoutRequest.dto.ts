export default interface InputUserWorkoutListRequestDto {
    comment: string;
    workout_title: string;
    workoutCreatedData: string;
    workoutDetails: WorkoutDetails[];
}

export interface WorkoutDetails {
    workoutDetailCreatedDate: string;
    workout_name: string;
    reps: string;
    sets: string;
    rest_time: [];
}

export interface WorkoutImageUris {
    workoutImageUris: string[];
}