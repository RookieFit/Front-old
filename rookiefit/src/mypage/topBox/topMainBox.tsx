import './topMainBox.css';
import InfoMiniBox from "./infoBox/infoMiniBox/infoMiniBox";
import Profile from "./profileBox/profile/profile";
import '../../index.css'

const TopMainBox = () => {
    return (
        <div className="left-right-page">
            <Profile/>
            <InfoMiniBox /> 
        </div>
    )
};
export default TopMainBox;
