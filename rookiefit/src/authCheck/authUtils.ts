import axios from 'axios';
import { getJwtToken, saveTokens } from './storageUtils';
import { logout } from './authActions';
// 로그인 상태를 확인하는 함수
export const checkLoginStatus = async () => {
    const token = getJwtToken();  // 로컬 스토리지에서 토큰 가져오기

    if (token) {
        // 토큰이 있으면 로그인된 상태로 처리
        return true;
    } else {
        // 토큰이 없으면 로그인되지 않은 상태
        console.log('로그인되지 않음');
        return true;
    }
};

// 로그인 상태를 확인하는 함수
// export const checkLoginStatus = async () => {
//     const token = getJwtToken();  // 로컬 스토리지 또는 쿠키에서 토큰 가져오기

//     if (token) {
//         try {
//             const response = await axios.post('/auth/verify-token', { token });

//             if (response.data.valid) {
//                 // 토큰이 유효하면 로그인 상태로 처리
//                 return true;
//             } else {
//                 // 토큰이 만료되었으면 리프레시 토큰을 이용해 갱신
//                 const newToken = await refreshAccessToken();
//                 if (newToken) {
//                     return true;
//                 }
//             }
//         } catch (error) {
//             console.error('토큰 인증 오류:', error);
//             logout(); // 인증 오류 발생 시 로그아웃 처리
//         }
//     } else {
//         console.log('로그인되지 않음');
//         return false;
//     }
// };

// // 새 액세스 토큰을 리프레시 토큰을 이용해 갱신
// const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem('refresh_token');
//     if (refreshToken) {
//         try {
//             const response = await axios.post('/auth/refresh-token', { refresh_token: refreshToken });
//             const { access_token, new_refresh_token } = response.data;

//             // 새로운 액세스 토큰과 리프레시 토큰 저장
//             saveTokens(access_token, new_refresh_token); // 액세스 토큰과 리프레시 토큰을 저장하는 함수

//             return access_token;
//         } catch (error) {
//             console.error('리프레시 토큰 갱신 실패:', error);
//             logout(); // 리프레시 토큰도 만료되었을 경우 로그아웃 처리
//         }
//     }
// };
