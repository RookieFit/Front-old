import "./inputProfileComponent.css";

interface Props {
    title: string;
    placeholder: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    type: string; // 추가: 입력 타입 설정 (기본값은 'text')
}

export const InputProfileComponent = (props: Props) => {
    return (
        <div className="input-profile-wrapper">
            <div className="input-profile-title">{props.title}</div>
            <div className="input-box-wrapper">
                <input
                    className="input-profile-box"
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    readOnly={props.disabled}
                    type={props.type || "text"} // 기본 타입: 'text'
                />
            </div>
        </div>
    );
};
