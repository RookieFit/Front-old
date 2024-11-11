import InfoLine from '../infoLine/infoLine';
import './infoMiniBox.css';
import { Link, useNavigate } from "react-router-dom";

interface props {
    title: string;
    type: 'text';
    value: string;
    burronTitle?:string;
    //onChange : (event: ChangeEvent<HTMLInputElement>) => void;
    //onKeydown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}


    

const InfoMiniBox = () => {
    return (
        <div className="myinfo-main">
            <div className='myinfo-click'> 내 정보</div>
            <div className='myinfo-edit'>
                <input type="button" value="수정하기" className='myinfo-button'/>
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