import './MainBox.css';
import Info_sedBox from "./topBox/Components/infoBox/info_minBox/info_minBox";
import ProfilePofile from "./topBox/profileBox/profile/profile";

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
            <ProfilePofile/>
            <Info_sedBox /> 
        </div>
    )
};
export default MainBox;
