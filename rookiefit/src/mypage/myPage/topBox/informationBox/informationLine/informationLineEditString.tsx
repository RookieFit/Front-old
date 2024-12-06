import React, { useState } from 'react';
import './informationLine.css';

interface InformationLineEditProps {
    title: string;
    value: string;
    onChange?: (value: string) => void;
}

const InformationLineEditString = ({ title, value, onChange }: InformationLineEditProps) => {
    const [inputValue, setInputValue] = useState(value);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isInformationTextareaClicked, setIsInformationTextareaClicked] = useState(false);

    // 더미 데이터로 중복 체크
    const mockDuplicateNicknames = ['asd', 'asdasd', 'asd123'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: string = e.target.value;
        setInputValue(newValue);

        // 중복 여부 확인
        if (title === '닉네임') {
            setIsDuplicate(mockDuplicateNicknames.includes(newValue));
        }
        // 상위 컴포넌트로 변경 내용 전달
        if (onChange) {
            onChange(newValue);
        }
    };
    const showNotification = (message: string) => {
        return (
            <div className="my-information-nickname-alter">
                {message}
            </div>
        );
    };

    return (
        <div className="my-information-box" style={{ position: 'relative' }}>
            <div className="my-information-little-box">{title}</div>
            <input
                type="text"
                maxLength={30}
                value={inputValue}
                onChange={handleChange}
                className="my-information-edit-box-textbox"
                spellCheck="false"
                onFocus={() => setIsInformationTextareaClicked(true)}
                onBlur={() => setIsInformationTextareaClicked(false)}
                placeholder={isInformationTextareaClicked ? "" : "입력하세요"}
            />
            {isDuplicate && title === '닉네임' && showNotification('닉네임 중복입니다.')}
        </div>
    );
};

export default InformationLineEditString;