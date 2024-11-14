import InfoLineEdit from '../infoLine/infoLineEdit';
import './infoMiniBox.css';
import { Link, useNavigate } from "react-router-dom";

const InfoMiniBoxEdit = () => {
    const navigate = useNavigate();
    const myPage = () => {
        navigate('/myPage')
    };
    return (
        <div className="myinfo-main">
            <div className='myinfo-click'> 내 정보</div>
            <div className='myinfo-edit' >
                <input type="button" value="완료하기" onClick={myPage} className='myinfo-button' />
            </div>
            <div className='myinfo-box-info'>
                <InfoLineEdit />
                <InfoLineEdit />
                <InfoLineEdit />
                <InfoLineEdit />
                <InfoLineEdit />
                <InfoLineEdit />
                <InfoLineEdit />
                <InfoLineEdit />
                <InfoLineEdit />
            </div>
        </div>
    )
};

export default InfoMiniBoxEdit;