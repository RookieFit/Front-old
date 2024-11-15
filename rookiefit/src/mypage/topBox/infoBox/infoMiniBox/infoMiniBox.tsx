import { useNavigate } from 'react-router-dom';
import './infoMiniBox.css';
import InfoLine from '../infoLine/infoLine';

const InfoMiniBox = () => {
    const navigate = useNavigate();
    const myPageEdit = () => {
        navigate('/myPageEdit')
    };
    return (
        <div className="right-back">
            <div className='myinfo-text'> 내 정보</div>
            <div className='myinfo-edit' >
                <input type="button" value="수정하기" onClick={myPageEdit} className='myinfo-button' />
            </div>
            <div className='myinfo-box-info'>
            <InfoLine title={'닉네임'} value={'뚱인데요?'}/> 
            <InfoLine title={'이름'} value={'불가사리'}/> 
            <InfoLine title={'나이'} value={'??'}/> 
            <InfoLine title={'몸무게'} value={'??'}/> 
            <InfoLine title={'키'} value={'??'}/>
            <InfoLine title={'근육량'} value={'0'}/> 
            <InfoLine title={'체지방량'} value={'0'}/> 
            <InfoLine title={'주소'} value={'비키니시티'}/> 
            <InfoLine title={'헬스장명'} value={'없는데용?'}/> 
            
            </div>
        </div>
    )
};

export default InfoMiniBox;