
import InformationLineEdit from '../informationLine/informationLineEdit';
import './informationMiniBox.css';
import { useNavigate } from "react-router-dom";

const InformationMiniBoxEdit = () => {
    const navigate = useNavigate();
    const myPage = () => {
        navigate('/myPage')
    };
    return (
        <div className="information-right-back">
            <div className='my-information-text'> 내 정보</div>
            <div className='my-information-edit' >
                <input type="button" value="완료하기" onClick={myPage} className='my-information-button' />
            </div>
            <div className='my-information-box-information'>
                <InformationLineEdit title={'닉네임'} />
                <InformationLineEdit title={'이름'} />
                <InformationLineEdit title={'나이'} />
                <InformationLineEdit title={'몸무게'} />
                <InformationLineEdit title={'키'} />
                <InformationLineEdit title={'근육량'} />
                <InformationLineEdit title={'체지방량'} />
                <InformationLineEdit title={'주소'} />
                <InformationLineEdit title={'헬스장명'} />
            </div>
        </div>
    )
};

export default InformationMiniBoxEdit;