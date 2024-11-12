import InfoMiniBoxEdit from './infoBox/infoMiniBox/infoMiniBoxEdit';
import ProfileEdit from './profileBox/profile/profileEdit';
import './topMainBox.css';

const TopMainBoxEdit = () => {
    return (
        <div className="topMainBox">
            <ProfileEdit/>
            <InfoMiniBoxEdit /> 
        </div>
    )
};

export default TopMainBoxEdit;
