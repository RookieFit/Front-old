import './topMainBox.css';
import MyProfile from '../profileBox/myProfile/myProfile';
import InformationMiniBox from '../informationBox/informationMiniBox/informationMiniBox';
import SeenProfile from '../../../seenPage/seenProfile/seenProfile';

const TopMainBox = ({ role, userInfo, trainerInfo, information }) => {
    return (
        <div className="top-mainbox-left-right-page">
            {role === 'trainer' ? (
                <>
                    <SeenProfile {...trainerInfo} />
                    <InformationMiniBox role={''} value={false} information={{
                        nickname: '',
                        name: '',
                        age: '',
                        weight: '',
                        height: '',
                        muscle: '',
                        fat: '',
                        address: '',
                        gym: ''
                    }}                
                     />
                </>
            ) : (
                <>
                    <MyProfile {...userInfo} />
                    <InformationMiniBox role={'user'} value={false} information={information} />
                </>
            )}
        </div>
    )
};

export default TopMainBox;