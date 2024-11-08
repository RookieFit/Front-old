import { ChangeEvent, forwardRef } from "react";
import './InfoLine.css';

interface props {
    title: string;
    type: 'text';
    value: string;
    //onChange : (event: ChangeEvent<HTMLInputElement>) => void;
    //onKeydown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}
const InfoLine = () => {
    return (
        <div className="myinfo_box">
            <div className="myinfo_little_box">{'title'}</div>
            <div className="myinfo_box_box"></div>
        </div>
    )
};
export default InfoLine;