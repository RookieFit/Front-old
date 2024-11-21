import './topMainBox.css';
import MyProfile from '../profileBox/myProfile/myProfile';
import InformationMiniBox from '../informationBox/informationMiniBox/informationMiniBox';

const TopMainBox = () => {
    return (
        <div className="top-mainbox-left-right-page">
            <MyProfile/>
            <InformationMiniBox /> 
        </div>
    )
};
export default TopMainBox;
