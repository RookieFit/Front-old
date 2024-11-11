import './MainBox.css';
import Info_minBox from "./infoBox/info_minBox/info_minBox";
import Profile from "./profileBox/profile/profile";

interface props {
    title: string;
    placeholder: string;
    type: 'text';
    value: string;
    //onChange : (event: ChangeEvent<HTMLInputElement>) => void;
    //onKeydown? : (event: KeyboardEvent<HTMLInputElement>) => void;
}
const MainBox = () => {
    return (
        <div className="mainBoxMyPage">
            <Profile/>
            <Info_minBox /> 
        </div>
    )
};
export default MainBox;
