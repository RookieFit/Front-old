import InfoLineEdit from '../infoLine/infoLineEdit';
import './infoMiniBox.css';
import { Link, useNavigate } from "react-router-dom";

const InfoMiniBoxEdit = () => {
    const navigate = useNavigate();
    const myPage = () => {
        navigate('/myPage')
    };
    return (
        <div className="right-back">
            <div className='myinfo-text'> 내 정보</div>
            <div className='myinfo-edit' >
                <input type="button" value="완료하기" onClick={myPage} className='myinfo-button' />
            </div>
            <div className='myinfo-box-info'>
                <InfoLineEdit title={'닉네임'} /> 
                <InfoLineEdit title={'이름'} />
                <InfoLineEdit title={'나이'} />
                <InfoLineEdit title={'몸무게'} />
                <InfoLineEdit title={'키'} />
                <InfoLineEdit title={'근육량'} />
                <InfoLineEdit title={'체지방량'} />
                <InfoLineEdit title={'주소'} />
                <InfoLineEdit title={'헬스장명'} />
            </div>
        </div>
    )
};

export default InfoMiniBoxEdit;