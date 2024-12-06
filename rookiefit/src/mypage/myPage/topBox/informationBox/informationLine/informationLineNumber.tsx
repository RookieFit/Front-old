import './informationLine.css';

interface Props {
    title: string;
    value: number;
}

const InformationLineNumber = ({ title, value, }: Props) => {
    return (
        <div className="my-information-box">
            <div className="my-information-little-box">{title}</div>
            <div className="my-information-box-textbox">{value}</div>
        </div>
    )
};

export default InformationLineNumber;