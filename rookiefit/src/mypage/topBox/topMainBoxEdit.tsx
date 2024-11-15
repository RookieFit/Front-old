import InfoMiniBoxEdit from './infoBox/infoMiniBox/infoMiniBoxEdit';
import ProfileEdit from './profileBox/profile/profileEdit';
import './topMainBox.css';
import '../../index.css'

const TopMainBoxEdit = () => {
    return (
        <div className="left-right-page">
            <ProfileEdit/>
            <InfoMiniBoxEdit /> 
        </div>
    )
};

export default TopMainBoxEdit;
