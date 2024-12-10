import React from 'react'

// 예: YYYY-MM-DD HH:mm:ss 형식으로 변환
const currentDateToString = (): string => {
    const now = new Date();
    const year = String(now.getFullYear()).slice(2);
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작
    const date = String(now.getDate()).padStart(2, "0");
    return `${year}${month}${date}`; // "ex) 241209"
};


export default currentDateToString