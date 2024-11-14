import { useState } from 'react';
import './infoLine.css';

interface props {
    title: string;
    placeholder: string;
    name: string;
    type: 'text';
    value: string;
}
const InfoLineEdit = () => {
    const [title, setTitle] = useState();

    const [isInFotextareaclicked, setIsInFoTextAreaClicked] = useState(false);

    return (
        <div className="myinfo-box">
            <div className="myinfo-little-box">{title}</div>
            <div className="myinfoedit-box-box" >
                <input type='text'
                    className='myinfoedit-message-textarea'
                    onFocus={() => setIsInFoTextAreaClicked(false)}
                    onBlur={() => setIsInFoTextAreaClicked(true)}
                    placeholder={isInFotextareaclicked === true ? "" : "입력하세요"}>
                </input>
            </div>
        </div>
    )
};

export default InfoLineEdit;