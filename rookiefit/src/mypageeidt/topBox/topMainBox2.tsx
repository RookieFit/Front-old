import './topMainBox2.css';
import InfoMiniBox2 from "./infoBox/infoMiniBox/infoMiniBox2";
import Profile2 from './profileBox/profile/profile2';

const TopMainBox2 = () => {
    return (
        <div className="topMainBox2">
            <Profile2/>
            <InfoMiniBox2 /> 
        </div>
    )
};
export default TopMainBox2;
