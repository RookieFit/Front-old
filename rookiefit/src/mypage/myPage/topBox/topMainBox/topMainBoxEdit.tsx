import InformationMiniBoxEdit from '../informationBox/informationMiniBox/informationMiniBoxEdit';
import MyProfileEdit from '../profileBox/myProfile/myProfileEdit';
import './topMainBox.css';


const TopMainBoxEdit = () => {
    return (
        <div className="top-mainbox-left-right-page">
            <MyProfileEdit/>
            <InformationMiniBoxEdit /> 
        </div>
    )
};

export default TopMainBoxEdit;
