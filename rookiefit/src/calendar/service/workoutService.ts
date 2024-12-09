import moment from 'moment';
import { axiosInstance } from '../../apis/api';

interface SubmitWorkoutData {
    title: string;
    diaryContent: string;
    localDetails: string[][];
    uploadedImages: File[];
    selectedDate: Date;
}

export const submitWorkoutData = async (data: SubmitWorkoutData) => {
    try {
        const formData = new FormData();
        formData.append('comment', data.diaryContent);
        formData.append('workout_title', data.title);
        formData.append('workoutCreatedData', moment(data.selectedDate).format('YYYY-MM-DD'));

        // Add workout details to FormData
        data.localDetails.forEach((detail, index) => {
            formData.append(`workoutDetails[${index}].workout_name`, detail[0]); // 운동명
            formData.append(`workoutDetails[${index}].reps`, detail[1]);         // 횟수
            formData.append(`workoutDetails[${index}].sets`, detail[2]);         // 세트수
            formData.append(`workoutDetails[${index}].rest_time`, detail[3]);    // 휴식시간
            formData.append(`workoutDetails[${index}].workoutDetailCreatedDate`, moment(data.selectedDate).format('YYYY-MM-DD')); // 날짜
        });

        // Add uploaded images to FormData
        data.uploadedImages.forEach(image => {
            formData.append('workoutImageFiles', image);
        });

        const response = await axiosInstance.post('/user/input-userworkoutlistdata', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error submitting workout data:', error);
        throw new Error('Failed to submit workout data');
    }
};
