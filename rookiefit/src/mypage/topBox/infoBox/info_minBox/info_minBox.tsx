import InfoLine from '../infoLine/infoLine';
import './info_minBox.css';
import { Link } from "react-router-dom";

interface props {
    title: string;
    type: 'text';
    value: string;
    burronTitle?:string;
    //onChange : (event: ChangeEvent<HTMLInputElement>) => void;
    //onKeydown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}
    const info_minBox = () => {
    const myinfo_edit = [
        {myinfo_button: "수정하기", path: "/myPage_Edit"}
    ];
    return (
        <div className="myinfo_main">
            <div className='myinfo_click'> 내 정보</div>
            <nav className='myinfo_button'>
                    {myinfo_edit.map((item, index) => (
                    <Link key={index} to={item.path} className='myinfo_button'>
                    {item.myinfo_button}
                    </Link>
                    ))}
                </nav>                
            <div className='myinfo_box_info'>
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

export default info_minBox;