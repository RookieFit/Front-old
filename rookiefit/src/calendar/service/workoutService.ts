// import { InputUserWorkoutListRequest } from '../../apis/api/workoutApi';
// import { InputUserWorkoutListRequestDto } from '../../apis/request/workout';
// import { WorkoutDetails } from '../types/workout'; // 필요 시 타입 임포트

// interface SubmitWorkoutParams {
//     token: string | null;
//     title: string;
//     diaryContent: string;
//     localDetails: string[][];
//     selectedDate: Date;
// }

// export const submitWorkoutData = async ({
//     token,
//     title,
//     diaryContent,
//     localDetails,
//     selectedDate,
// }: SubmitWorkoutParams) => {
//     if (!token) {
//         throw new Error('Token이 null입니다. 요청을 보낼 수 없습니다.');
//     }
//     // 데이터 변환
//     const requestData: InputUserWorkoutListRequestDto = {
//         token,
//         comment: diaryContent,
//         workout_title: title,
//         workoutCreatedData: selectedDate.toISOString(),
//         workoutDetails: localDetails.map(detail => ({
//             workoutDetailCreatedDate: selectedDate.toISOString(),
//             workout_name: detail[0],
//             reps: detail[1],
//             sets: detail[2],
//             rest_time: '',
//         })),
//     };

//     try {
//         // API 호출
//         const response = await InputUserWorkoutListRequest(requestData);
//         console.log('API 성공:', response);
//         return response;
//     } catch (error) {
//         console.error('API 실패:', error);
//         throw error; // 에러를 호출한 곳으로 전달
//     }
// };
