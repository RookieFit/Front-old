import { useState } from "react";
import "./informationLine.css";

interface Props {
    title: string;
}

const InformationLineEdit = ({ title }: Props) => {
    const [isInformationTextareaClicked, setIsInformationTextareaClicked] = useState(false);

    return (
        <div className="my-information-box">
            <div className="my-information-little-box">{title}</div>
            <input
                type="text"
                maxLength={30}
                className="my-information-box-textbox"
                onFocus={() => setIsInformationTextareaClicked(true)}
                onBlur={() => setIsInformationTextareaClicked(false)}
                placeholder={isInformationTextareaClicked ? "" : "입력하세요"}
            />
        </div>
    );
};

export default InformationLineEdit;
