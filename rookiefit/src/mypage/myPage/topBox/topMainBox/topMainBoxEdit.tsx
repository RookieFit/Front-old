import './topMainBox.css';
import MyProfileEdit from '../profileBox/myProfile/myProfileEdit';
import InformationMiniBoxEdit from '../informationBox/informationMiniBox/informationMiniBoxEdit';
import SeenProfileEdit from '../../../seenPage/seenProfile/seenProfileEdit';

const TopMainBoxEdit = ({ role, userInfo, trainerInfo, information }) => {
    return (
        <div className="top-mainbox-left-right-page">
            {role === 'trainer' ? (
                <>
                    <SeenProfileEdit {...trainerInfo} />
                    <InformationMiniBoxEdit role={role} value={false} information={{
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
                    } }                        />
                </>
            ) : (
                <>
                    <MyProfileEdit {...userInfo} />
                    <InformationMiniBoxEdit role={role} value={false} information={{
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
                        } }                        />
                </>
            )}
        </div>
    )
};

export default TopMainBoxEdit;