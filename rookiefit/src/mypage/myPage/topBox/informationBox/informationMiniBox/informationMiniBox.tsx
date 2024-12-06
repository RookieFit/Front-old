
import { useNavigate } from 'react-router-dom';
import './informationMiniBox.css';
import InformationLine from '../informationLine/informationLine';
import { useEffect, useState } from 'react';
import SeenFeed from '../../../../seenPage/seenFeed/seenFeed';
import SeenFeedGridBox from '../../../../seenPage/seenFeed/seenFeedcommunityComponents/seenFeedGridBox';
import InformationLineEdit from '../informationLine/informationLineEdit';

interface Props {
    role: string;
    value: string;
    information: {
        usernickname: string;
        trainernickname: string;
        username: string;
        trainername: string;
        userage: string;
        trainerage: string;
        userweight: string;
        trainerweight: string;
        userheight: string;
        trainerheight: string;
        usermuscle: string;
        trainermuscle: string;
        userfat: string;
        trainerfat: string;
        useraddress: string;
        traineraddress: string;
        usergym: string;
        trainergym: string;
    };
    onInformationUpdate: (newInformation: Partial<Props['information']>) => void;
}

const InformationMiniBox = ({ role, value, information, onInformationUpdate }: Props) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'info' | 'post' | 'photo'>('info');

    const [userInfo, setUserInfo] = useState({
        nickname: information.usernickname,
        name: information.username,
        age: information.userage,
        weight: information.userweight,
        height: information.userheight,
        muscle: information.usermuscle,
        fat: information.userfat,
        address: information.useraddress,
        gym: information.usergym
    });

    const [trainerInfo, setTrainerInfo] = useState({
        nickname: information.trainernickname,
        name: information.trainername,
        age: information.trainerage,
        weight: information.trainerweight,
        height: information.trainerheight,
        muscle: information.trainermuscle,
        fat: information.trainerfat,
        address: information.traineraddress,
        gym: information.trainergym
    });

    const updateInfo = (setFunction) => (field: string, value: string) => {
        setFunction((prevInfo: any) => ({
            ...prevInfo,
            [field]: value
        }));
    };

    const onChangeUserInfo = updateInfo(setUserInfo);
    const onChangeTrainerInfo = updateInfo(setTrainerInfo);

    useEffect(() => {
        if (information) {
            setTrainerInfo({
                nickname: information.trainernickname,
                name: information.trainername,
                age: information.trainerage,
                weight: information.trainerweight,
                height: information.trainerheight,
                muscle: information.trainermuscle,
                fat: information.trainerfat,
                address: information.traineraddress,
                gym: information.trainergym
            });
        }
    }, [information]);

    const handleEditToggle = () => {
        if (isEditing) {
            onInformationUpdate({
                ...userInfo,
                ...trainerInfo
            });
        }
        setIsEditing(prev => !prev);
    };
    const CommunityDetail = () => {
        navigate('/community/detail/:id')
    };
    const handleToggleTab = (tab: 'info' | 'post' | 'photo') => {
        setActiveTab(tab);
    };
    const getInputBackgroundColor = (tab: 'info' | 'post' | 'photo') => {
        return activeTab === tab ? { backgroundColor: '#D9D9D9' } : { backgroundColor: 'transparent' };
    };

    return (
        <div className="information-right-back">
            <div className='my-information-three-class'>
                <button onClick={() => handleToggleTab('info')} className='my-information-info' style={getInputBackgroundColor('info')}>내 정보</button>
                <button onClick={() => handleToggleTab('post')} className='my-information-post' style={getInputBackgroundColor('post')}>작성글</button>
                <button onClick={() => handleToggleTab('photo')} className='my-information-photo' style={getInputBackgroundColor('photo')}>사진첩</button>
            </div>
            {activeTab === 'info' && (
                <div className='my-information-box-information'>
                    <input
                        type="button"
                        value={isEditing ? "수정 완료" : "수정하기"}
                        onClick={handleEditToggle}
                        className='my-information-button'
                    />
                    <>
                        {isEditing ? (
                            role === 'trainer' ? (
                                <>
                                    <InformationLineEdit title={'닉네임'} value={trainerInfo.nickname} onChange={(value) => onChangeTrainerInfo('nickname', value)} />
                                    <InformationLineEdit title={'이름'} value={trainerInfo.name} onChange={(value) => onChangeTrainerInfo('name', value)} />
                                    <InformationLineEdit title={'나이'} value={trainerInfo.age} onChange={(value) => onChangeTrainerInfo('age', value)} />
                                    <InformationLineEdit title={'몸무게'} value={trainerInfo.weight} onChange={(value) => onChangeTrainerInfo('weight', value)} />
                                    <InformationLineEdit title={'키'} value={trainerInfo.height} onChange={(value) => onChangeTrainerInfo('height', value)} />
                                    <InformationLineEdit title={'근육량'} value={trainerInfo.muscle} onChange={(value) => onChangeTrainerInfo('muscle', value)} />
                                    <InformationLineEdit title={'체지방량'} value={trainerInfo.fat} onChange={(value) => onChangeTrainerInfo('fat', value)} />
                                    <InformationLineEdit title={'주소'} value={trainerInfo.address} onChange={(value) => onChangeTrainerInfo('address', value)} />
                                    <InformationLineEdit title={'헬스장명'} value={trainerInfo.gym} onChange={(value) => onChangeTrainerInfo('gym', value)} />
                                </>
                            ) : (
                                <>
                                    <InformationLineEdit title={'닉네임'} value={userInfo.nickname} onChange={(value) => onChangeUserInfo('nickname', value)} />
                                    <InformationLineEdit title={'이름'} value={userInfo.name} onChange={(value) => onChangeUserInfo('name', value)} />
                                    <InformationLineEdit title={'나이'} value={userInfo.age} onChange={(value) => onChangeUserInfo('age', value)} />
                                    <InformationLineEdit title={'몸무게'} value={userInfo.weight} onChange={(value) => onChangeUserInfo('weight', value)} />
                                    <InformationLineEdit title={'키'} value={userInfo.height} onChange={(value) => onChangeUserInfo('height', value)} />
                                    <InformationLineEdit title={'근육량'} value={userInfo.muscle} onChange={(value) => onChangeUserInfo('muscle', value)} />
                                    <InformationLineEdit title={'체지방량'} value={userInfo.fat} onChange={(value) => onChangeUserInfo('fat', value)} />
                                    <InformationLineEdit title={'주소'} value={userInfo.address} onChange={(value) => onChangeUserInfo('address', value)} />
                                    <InformationLineEdit title={'헬스장명'} value={userInfo.gym} onChange={(value) => onChangeUserInfo('gym', value)} />
                                </>
                            )
                        ) : (
                            role === 'trainer' ? (
                                <>
                                    <InformationLine title={'닉네임'} value={trainerInfo.nickname} />
                                    <InformationLine title={'이름'} value={trainerInfo.name} />
                                    <InformationLine title={'나이'} value={trainerInfo.age} />
                                    <InformationLine title={'몸무게'} value={trainerInfo.weight} />
                                    <InformationLine title={'키'} value={trainerInfo.height} />
                                    <InformationLine title={'근육량'} value={trainerInfo.muscle} />
                                    <InformationLine title={'체지방량'} value={trainerInfo.fat} />
                                    <InformationLine title={'주소'} value={trainerInfo.address} />
                                    <InformationLine title={'헬스장명'} value={trainerInfo.gym} />
                                </>
                            ) : (
                                <>
                                    <InformationLine title={'닉네임'} value={userInfo.nickname} />
                                    <InformationLine title={'이름'} value={userInfo.name} />
                                    <InformationLine title={'나이'} value={userInfo.age} />
                                    <InformationLine title={'몸무게'} value={userInfo.weight} />
                                    <InformationLine title={'키'} value={userInfo.height} />
                                    <InformationLine title={'근육량'} value={userInfo.muscle} />
                                    <InformationLine title={'체지방량'} value={userInfo.fat} />
                                    <InformationLine title={'주소'} value={userInfo.address} />
                                    <InformationLine title={'헬스장명'} value={userInfo.gym} />
                                </>
                            ))}
                    </>
                </div>
            )}
            {activeTab === 'post' && (
                <div className='my-information-box-information'>
                    <input type="button" value="보러가기" onClick={CommunityDetail} className='my-information-button' />
                    <div className='my-information-seen-grid'>
                        <SeenFeedGridBox />
                    </div>
                </div>
            )}
            {activeTab === 'photo' && (
                <div className='my-information-box-information'>
                    <input type="button" value="수정하기" onClick={handleEditToggle} className='my-information-button' />
                    <SeenFeed role={role} showBackground={false} />
                </div>
            )}
        </div >
    );
};

export default InformationMiniBox;
