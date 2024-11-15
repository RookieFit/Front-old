import './infoLine.css';

interface Props {
    title: string;
    value: string;

    
}
const InfoLine = ({ title, value, }: Props) => {
    return (
        <div className="myinfo-box">
            <div className="myinfo-little-box">{title}</div>
            <div className="myinfo-box-box">{value}</div>
        </div>
    )
};

export default InfoLine;