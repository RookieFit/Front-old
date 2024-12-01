export const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refresh_token');
    // 리디렉션 처리
    window.location.href = '/signin';
};
