import "./inputProfileComponent.css";

interface Props {
    title: string;
    placeholder: string;
    value: string;// string 타입으로 수정
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
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
                />
            </div>
        </div>
    );
};
