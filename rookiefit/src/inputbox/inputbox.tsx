import { ChangeEvent, forwardRef, KeyboardEvent, useState } from 'react';
import './style.css';

interface Props {
    title?: string;
    placeholder: string;
    type: 'text' | 'password';
    value: string;
    message?: string;
    isErrorMessage?: boolean;
    buttonTitle?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    onButtonClick?: () => void;
}

const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    const {
        title,
        placeholder,
        type,
        value,
        message,
        isErrorMessage = false,
        buttonTitle,
        onChange,
        onKeyDown,
        onButtonClick,
    } = props;

    const [inputValue, setInputValue] = useState(value);

    
	const [isInputClicked, setIsInputClicked] = useState(false);

    // 버튼 스타일 및 메시지 스타일 클래스명 설정
    const buttonClassName = buttonTitle === '' ? 'input-box-button-disable' : 'input-box-button';
    const messageClassName = isErrorMessage ? 'input-box-message-error' : 'input-box-message';

    return (
        <div className="input-box full-width">
            {title && <div className="input-box-title">{title}</div>}
            <div className="input-box-content">
                <div className="input-box-body">
                    <input
                        ref={ref}
                        className={`input-box-input ${buttonTitle ? '' : 'input-box-button-disable'}`}
                        type={type}
                        value={inputValue}
                        onFocus={() => {
                            setIsInputClicked(true);
                        }}
                        onBlur={() => {
				        	setIsInputClicked(false);
			        	}}
				        placeholder={isInputClicked === true ? "" : placeholder}     
                        onChange={(e) => {
                            onChange(e); // Keep the original onChange
                            setInputValue(e.target.value); // Update local input value
                        }}
                        onKeyDown={onKeyDown}
                    />
                    {buttonTitle && onButtonClick && (
                        <button className={buttonClassName} onClick={onButtonClick}>
                            {buttonTitle}
                        </button>
                    )}
                </div>
                {<div className={messageClassName}>{message || '\u00A0'}</div>}
            </div>
        </div>
    );
});

export default InputBox;
