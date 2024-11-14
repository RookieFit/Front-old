import { useEffect, useState } from 'react';
import './infoLine.css';

interface props {
    title: string;
    placeholder: string;
    name: string;
    type: 'text';
    value: DataView;
}
const InfoLine = () => {
    const [title, setTitle] = useState();
    
    return (
        <div className="myinfo-box">
            <div className="myinfo-little-box">{title}</div>
            <div className="myinfo-box-box"></div>
        </div>
    )
};

export default InfoLine;