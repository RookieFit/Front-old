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
                    <InformationMiniBoxEdit
                        role={'trainer'}
                        value={false}
                        information={information}
                        onInformationUpdate={function (newInformation: Partial<{ weight: string; height: string; muscle: string; fat: string; address: string; }>): void {
                            throw new Error('Function not implemented.');
                        }} />
                </>
            ) : (
                <>
                    <MyProfileEdit {...userInfo} />
                    <InformationMiniBoxEdit
                        role={'user'}
                        value={false}
                        information={information}
                        onInformationUpdate={function (newInformation: Partial<{ nickname: string; weight: string; height: string; muscle: string; fat: string; address: string; gym: string; }>): void {
                            throw new Error('Function not implemented.');
                        }} />
                </>
            )}
        </div>
    )
};

export default TopMainBoxEdit;