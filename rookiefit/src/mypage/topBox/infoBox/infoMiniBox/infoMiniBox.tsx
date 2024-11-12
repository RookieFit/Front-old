import { useNavigate } from 'react-router-dom';
import InfoLine from '../infoLine/infoLine';
import './infoMiniBox.css';

interface props {
    title: string;
    type: 'text';
    value: string;
    burronTitle?:string;
    onClick: Location
    //onChange : (event: ChangeEvent<HTMLInputElement>) => void;
    //onKeydown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}


const InfoMiniBox = () => {
const navigate = useNavigate();
const myPageEdit = () => {
    navigate('/myPageEdit')
};
    return (
        <div className="myinfo-main">
            <div className='myinfo-click'> 내 정보</div>
            <div className='myinfo-edit' >
                <input type="button" value="수정하기" onClick={myPageEdit} className='myinfo-button'/>
            </div>          
            <div className='myinfo-box-info'>
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

export default InfoMiniBox;