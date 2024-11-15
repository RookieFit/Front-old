import { useState } from "react";
import "./infoLine.css";

interface Props {
    title: string;
}

const InfoLineEdit = ({ title }: Props) => {
    const [isInFotextareaclicked, setIsInFoTextAreaClicked] = useState(false);

    return (
        <div className="myinfo-box">
            <div className="myinfo-little-box">{title}</div>
            <div className="myinfoedit-box-box">
                <input
                    type="text"
                    maxLength={30}
                    className="myinfoedit-message-textarea"
                    onFocus={() => setIsInFoTextAreaClicked(true)}
                    onBlur={() => setIsInFoTextAreaClicked(false)}
                    placeholder={isInFotextareaclicked ? "" : "입력하세요"}
                />
            </div>
        </div>
    );
};

export default InfoLineEdit;
