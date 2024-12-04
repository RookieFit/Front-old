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
                    <InformationMiniBox role={role} value={false} information={{
                        nickname: '',
                        name: '',
                        age: '',
                        weight: '',
                        height: '',
                        muscle: '',
                        fat: '',
                        address: '',
                        gym: ''
                    }} onInformationUpdate={function (newInformation: Partial<{ nickname: string; name: string; age: string; weight: string; height: string; muscle: string; fat: string; address: string; gym: string; }>): void {
                        throw new Error('Function not implemented.');
                    } }                     />
                </>
            ) : (
                <>
                    <MyProfile {...userInfo} />
                    <InformationMiniBox role={role} value={false} information={{
                            nickname: '',
                            name: '',
                            age: '',
                            weight: '',
                            height: '',
                            muscle: '',
                            fat: '',
                            address: '',
                            gym: ''
                        }} onInformationUpdate={function (newInformation: Partial<{ nickname: string; name: string; age: string; weight: string; height: string; muscle: string; fat: string; address: string; gym: string; }>): void {
                            throw new Error('Function not implemented.');
                        } }  />
                </>
            )}
        </div>
    )
};

export default TopMainBox;