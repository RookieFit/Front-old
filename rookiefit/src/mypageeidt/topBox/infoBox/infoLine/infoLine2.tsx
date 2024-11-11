import { useState } from 'react';
import './infoLine2.css';

const InfoLine2 = () => {
const [isInFotextareaclicked,setIsInFoTextAreaClicked] = useState(false);
    return (
        <div className="myinfo-box2">
            <div className="myinfo-little-box2">{'title'}</div>
            <div className="myinfo-box-box2" >
                <input  type='text'
                    className='myinfo-message-textarea'
                    onFocus={() => setIsInFoTextAreaClicked(false)}
                    onBlur={() => setIsInFoTextAreaClicked(true)}
                    placeholder={isInFotextareaclicked === true ? "" : "input"}>
                </input>
            </div>
        </div>
    )
};
export default InfoLine2;