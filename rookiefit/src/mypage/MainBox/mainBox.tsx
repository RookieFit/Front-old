import { ChangeEvent, forwardRef, useEffect } from "react";
import './MainBox.css';
import Info_sedBox from "../infoBox/info_sedBox/info_sedBox";
import PorfilePofile from "../porfileBox/porfilePofile/porfilePofile";

interface props {
    title: string;
    placeholder: string;
    type: 'text';
    value: string;
    //onChange : (event: ChangeEvent<HTMLInputElement>) => void;
    //onKeydown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}
const MainBox = () => {
    return (
        <div className="mainBoxMyPage">
            <PorfilePofile/>
            <Info_sedBox /> 
        </div>
    )
};
export default MainBox;
