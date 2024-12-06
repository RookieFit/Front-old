import React, { useState, useEffect } from 'react';
import './informationLine.css';

interface InformationLineEditProps {
    title: string;
    value: number;
    onChange?: (value: number) => void;
}

const InformationLineEditNumber = ({ title, value, onChange }: InformationLineEditProps) => {
    const [inputValue, setInputValue] = useState(value.toString());
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isInformationTextareaClicked, setIsInformationTextareaClicked] = useState(false);

    // 더미 데이터로 중복 체크
    const mockDuplicateNicknames = ['asd', 'asdasd', 'asd123'];

    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // 중복 여부 확인 (닉네임의 경우에만)
        if (title === '닉네임') {
            setIsDuplicate(mockDuplicateNicknames.includes(newValue));
        }

        // 숫자로 변환 가능한 경우에만 상위 컴포넌트로 전달
        const numValue = parseFloat(newValue);
        if (!isNaN(numValue) && onChange) {
            onChange(numValue);
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

export default InformationLineEditNumber;