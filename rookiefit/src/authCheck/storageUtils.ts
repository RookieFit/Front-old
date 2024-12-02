export const getJwtToken = () => {
    return localStorage.getItem('jwt');
};

export const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('jwt', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
};
