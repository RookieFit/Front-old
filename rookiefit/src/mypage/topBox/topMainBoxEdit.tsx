import InfoMimiBoxEdit from './infoBox/infoMiniBox/infoMimiBoxEdit';
import ProfileEdit from './profileBox/profile/profileEdit';
import './topMainBox.css';


const TopMainBoxEdit = () => {
    return (
        <div className="topMainBox">
            <ProfileEdit/>
            <InfoMimiBoxEdit /> 
        </div>
    )
};

export default TopMainBoxEdit;
