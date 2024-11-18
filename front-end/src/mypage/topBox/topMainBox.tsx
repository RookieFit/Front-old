import './topMainBox.css';
import Profile from "./profileBox/profile/profile";
import '../../index.css'
import InformationMiniBox from './informationBox/informationMiniBox/informationMiniBox';

const TopMainBox = () => {
    return (
        <div className="top-mainbox-left-right-page">
            <Profile/>
            <InformationMiniBox /> 
        </div>
    )
};
export default TopMainBox;
