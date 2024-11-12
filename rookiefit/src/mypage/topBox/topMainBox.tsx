import './topMainBox.css';
import InfoMiniBox from "./infoBox/infoMiniBox/infoMiniBox";
import Profile from "./profileBox/profile/profile";

interface props {
    title: string;
    placeholder: string;
    type: 'text';
    value: string;
    //onChange : (event: ChangeEvent<HTMLInputElement>) => void;
    //onKeydown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}
const TopMainBox = () => {
    return (
        <div className="topMainBox">
            <Profile/>
            <InfoMiniBox /> 
        </div>
    )
};
export default TopMainBox;
