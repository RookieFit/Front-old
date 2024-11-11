import './MainBox.css';
import Info_minBox from "../MainBox/Components/infoBox/info_minBox/info_minBox";
import ProfilePofile from "../MainBox/Components/profileBox/profilePofile/profilePofile";

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
            <Info_minBox /> 
        </div>
    )
};
export default MainBox;
