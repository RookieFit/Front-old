import InfoLine from '../infoLine/InfoLine';
import './info_sedBox.css';
import { Link } from "react-router-dom";

interface props {
    title: string;
    type: 'text';
    value: string;
    burronTitle?:string;
    //onChange : (event: ChangeEvent<HTMLInputElement>) => void;
    //onKeydown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}
    const Info_sedBox = () => {
    const myinfo_edit = [
        {button2: "수정하기", path: "/myPage_Edit"}
    ];
    return (
        <div className="myinfo_main">
            <div className='myinfo_click'> 내 정보</div>
            <nav className='button2'>
                    {myinfo_edit.map((item, index) => (
                    <Link key={index} to={item.path} className='button2'>
                    {item.button2}
                    </Link>
                    ))}
                </nav>
                <Link to='/myPage_Edit' className='button2' />
                
            
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

export default Info_sedBox;