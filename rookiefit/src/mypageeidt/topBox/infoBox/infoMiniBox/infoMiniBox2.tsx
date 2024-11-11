import InfoLine from '../infoLine/infoLine2';
import './infoMiniBox2.css';
import { Link, useNavigate } from "react-router-dom";

const InfoMiniBox2 = () => {
const navigate = useNavigate();
const myPage = () => {
    navigate('/myPage')
};
    return (
        <div className="myinfo-main2">
            <div className='myinfo-click2'> 내 정보</div>
            <div className='myinfo-edit2'  onClick={myPage}>
            <input type="button" value="수정하기" className='myinfo-button2'/>
            </div>          
            <div className='myinfo-box-info2'>
            <InfoLine />
            <InfoLine />
            <InfoLine />
            <InfoLine />
            <InfoLine />
            <InfoLine />
            <InfoLine />
            <InfoLine />
            <InfoLine />
            </div>
        </div>
    )
};

export default InfoMiniBox2;