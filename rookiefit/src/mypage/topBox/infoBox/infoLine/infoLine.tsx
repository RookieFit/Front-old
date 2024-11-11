import './infoLine.css';

interface props {
    title: string;
    type: 'text';
    value: string;
    //onChange : (event: ChangeEvent<HTMLInputElement>) => void;
    //onKeydown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}
const InfoLine = () => {
    return (
        <div className="myinfo-box">
            <div className="myinfo-little-box">{'title'}</div>
            <div className="myinfo-box-box"></div>
        </div>
    )
};
export default InfoLine;