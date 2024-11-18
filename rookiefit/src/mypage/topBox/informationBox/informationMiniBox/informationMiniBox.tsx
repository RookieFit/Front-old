import { useNavigate } from 'react-router-dom';
import './informationMiniBox.css';
import InformationLine from '../informationLine/informationLine';

const InformationMiniBox = () => {
    const navigate = useNavigate();
    const myPageEdit = () => {
        navigate('/myPageEdit')
    };
    return (
        <div className="information-right-back">
            <div className='my-information-text'> 내 정보</div>
            <div className='my-information-edit' >
                <input type="button" value="수정하기" onClick={myPageEdit} className='my-information-button' />
            </div>
            <div className='my-information-box-information'>
                <InformationLine title={'닉네임'} value={'뚱인데요?'} />
                <InformationLine title={'이름'} value={'불가사리'} />
                <InformationLine title={'나이'} value={'??'} />
                <InformationLine title={'몸무게'} value={'??'} />
                <InformationLine title={'키'} value={'??'} />
                <InformationLine title={'근육량'} value={'0'} />
                <InformationLine title={'체지방량'} value={'0'} />
                <InformationLine title={'주소'} value={'비키니시티'} />
                <InformationLine title={'헬스장명'} value={'없는데용?'} />
            </div>
        </div>
    )
};

export default InformationMiniBox;