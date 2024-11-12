import { useEffect, useState } from 'react';
import './infoLine.css';

interface props {
    title: string;
    name: string;
    type: 'text';
    value: string;
}
/*const [name, setName] = useState('');                                      // 이름을 저장할 상태
    useEffect(() => {                                                     // 컴포넌트가 마운트될 때 API로 데이터 가져오기
    const fetchName = async () => { 
        try {
            const response = await axios.get('/api/user/name');       // 백엔드 API 엔드포인트에 맞춰 설정
            setName(response.data.name);                             // API로부터 받은 이름을 상태에 저장
        } catch (error) {
            console.error('Error fetching name:', error);
        }
    };
    fetchName();
}, [])*/
const InfoLine = () => {
    return (
        <div className="myinfo-box">
            <div className="myinfo-little-box">title</div>
            <div className="myinfo-box-box"></div>
        </div>
    )
};

export default InfoLine;