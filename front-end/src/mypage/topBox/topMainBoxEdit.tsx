import ProfileEdit from './profileBox/profile/profileEdit';
import './topMainBox.css';
import '../../index.css'
import InformationMiniBoxEdit from './informationBox/informationMiniBox/informationMiniBoxEdit';

const TopMainBoxEdit = () => {
    return (
        <div className="top-mainbox-left-right-page">
            <ProfileEdit/>
            <InformationMiniBoxEdit /> 
        </div>
    )
};

export default TopMainBoxEdit;
