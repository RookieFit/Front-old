import { useEffect, useState } from 'react';
import './infoLine.css';

interface props {
    title: string;
    name: string;
    type: 'text';
    value: string;
} 
const InfoLine = () => {
const [title, isTitle] = useState();

    return (
        <div className="myinfo-box">
            <div className="myinfo-little-box">{title}</div>
            <div className="myinfo-box-box"></div>
        </div>
    )
};

export default InfoLine;