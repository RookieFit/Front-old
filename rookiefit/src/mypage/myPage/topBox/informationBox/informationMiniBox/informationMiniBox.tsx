
import { useNavigate } from 'react-router-dom';
import './informationMiniBox.css';
import InformationLine from '../informationLine/informationLineNumber';
import { useEffect, useState } from 'react';
import SeenFeed from '../../../../seenPage/seenFeed/seenFeed';
import { dummyPosts } from '../../../../../community/communityList/dummydata';
import SeenPostGridProps from '../../../../seenPage/seenFeed/seenFeedcommunityComponents/seenPostGridProps';
import InformationLineEditString from '../informationLine/informationLineEditString';
import InformationLineEditNumber from '../informationLine/informationLineEditNumber';
import InformationLineString from '../informationLine/informationLineString';
import InformationLineNumber from '../informationLine/informationLineNumber';

interface Props {
    role: string;
    informationUserNumber: {
        userage: number;
        userweight: number;
        userheight: number;
        usermuscle: number;
        userfat: number;
    };
    informationUserString: {
        usernickname: string;
        username: string;
        useraddress: string;
        usergym: string;
    };
    informationTrainerNumber: {
        trainerage: number;
        trainerweight: number;
        trainerheight: number;
        trainermuscle: number;
        trainerfat: number;
    };
    informationTrainerString: {
        trainernickname: string;
        trainername: string;
        traineraddress: string;
        trainergym: string;
    };
    onInformationUpdate: (newInformation: Partial<{
        informationUserNumber: Props['informationUserNumber'];
        informationUserString: Props['informationUserString'];
        informationTrainerNumber: Props['informationTrainerNumber'];
        informationTrainerString: Props['informationTrainerString'];
    }>) => void;

}

const InformationMiniBox = ({ role, informationUserNumber, informationUserString, informationTrainerNumber, informationTrainerString, onInformationUpdate }: Props) => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'info' | 'post' | 'photo'>('info');

    const [userNumberInfo, setUserNumberInfo] = useState({
        userage: informationUserNumber.userage,
        userweight: informationUserNumber.userweight,
        userheight: informationUserNumber.userheight,
        usermuscle: informationUserNumber.usermuscle,
        userfat: informationUserNumber.userfat,
    });

    const [userStringInfo, setUserStringInfo] = useState({
        usernickname: informationUserString.usernickname,
        username: informationUserString.username,
        useraddress: informationUserString.useraddress,
        usergym: informationUserString.usergym
    });

    const [trainerNumberInfo, setTrainerNumberInfo] = useState({
        trainerage: informationTrainerNumber.trainerage,
        trainerweight: informationTrainerNumber.trainerweight,
        trainerheight: informationTrainerNumber.trainerheight,
        trainermuscle: informationTrainerNumber.trainermuscle,
        trainerfat: informationTrainerNumber.trainerfat,
    });

    const [trainerStringInfo, setTrainerStringInfo] = useState({
        trainernickname: informationTrainerString.trainernickname,
        trainername: informationTrainerString.trainername,
        traineraddress: informationTrainerString.traineraddress,
        trainergym: informationTrainerString.trainergym
    });

    const updateInfo = (setFunction: any) => (field: string, value: string | number) => {
        setFunction((prevInfo: any) => ({
            ...prevInfo,
            [field]: value
        }));
    };

    const onChangeUserNumberInfo = updateInfo(setUserNumberInfo);
    const onChangeTrainerNumbeInfo = updateInfo(setTrainerNumberInfo);
    const onChangeUserStringInfo = updateInfo(setUserStringInfo);
    const onChangeTrainerStringInfo = updateInfo(setTrainerStringInfo);

    useEffect(() => {
        setTrainerNumberInfo(informationTrainerNumber);
        setTrainerStringInfo(informationTrainerString);
        setUserNumberInfo(informationUserNumber);
        setUserStringInfo(informationUserString);
    }, [informationTrainerNumber, informationTrainerString, informationUserNumber, informationUserString]);

    const handleEditToggle = () => {
        if (isEditing) {
            onInformationUpdate({
                informationTrainerNumber: trainerNumberInfo,
                informationTrainerString: trainerStringInfo,
                informationUserNumber: userNumberInfo,
                informationUserString: userStringInfo,
            });
        }
        setIsEditing((prev) => !prev);
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
                                    <InformationLineEditString title={'닉네임'} value={trainerStringInfo.trainernickname} onChange={(value) => onChangeTrainerStringInfo('nickname', value)} />
                                    <InformationLineEditString title={'이름'} value={trainerStringInfo.trainername} onChange={(value) => onChangeTrainerStringInfo('name', value)} />
                                    <InformationLineEditNumber title={'나이'} value={trainerNumberInfo.trainerage} onChange={(value) => onChangeTrainerNumbeInfo('age', value)} />
                                    <InformationLineEditNumber title={'몸무게'} value={trainerNumberInfo.trainerweight} onChange={(value) => onChangeTrainerNumbeInfo('weight', value)} />
                                    <InformationLineEditNumber title={'키'} value={trainerNumberInfo.trainerheight} onChange={(value) => onChangeTrainerNumbeInfo('height', value)} />
                                    <InformationLineEditNumber title={'근육량'} value={trainerNumberInfo.trainermuscle} onChange={(value) => onChangeTrainerNumbeInfo('muscle', value)} />
                                    <InformationLineEditNumber title={'체지방량'} value={trainerNumberInfo.trainerfat} onChange={(value) => onChangeTrainerNumbeInfo('fat', value)} />
                                    <InformationLineEditString title={'주소'} value={trainerStringInfo.traineraddress} onChange={(value) => onChangeTrainerStringInfo('address', value)} />
                                    <InformationLineEditString title={'헬스장명'} value={trainerStringInfo.trainergym} onChange={(value) => onChangeTrainerStringInfo('gym', value)} />
                                </>
                            ) : (
                                <>
                                    <InformationLineEditString title={'닉네임'} value={userStringInfo.usernickname} onChange={(value) => onChangeUserStringInfo('nickname', value)} />
                                    <InformationLineEditString title={'이름'} value={userStringInfo.username} onChange={(value) => onChangeUserStringInfo('name', value)} />
                                    <InformationLineEditNumber title={'몸무게'} value={userNumberInfo.userweight} onChange={(value) => onChangeUserNumberInfo('weight', value)} />
                                    <InformationLineEditNumber title={'키'} value={userNumberInfo.userheight} onChange={(value) => onChangeUserNumberInfo('height', value)} />
                                    <InformationLineEditNumber title={'근육량'} value={userNumberInfo.usermuscle} onChange={(value) => onChangeUserNumberInfo('muscle', value)} />
                                    <InformationLineEditNumber title={'체지방량'} value={userNumberInfo.userfat} onChange={(value) => onChangeUserNumberInfo('fat', value)}  />
                                    <InformationLineEditString title={'주소'} value={userStringInfo.useraddress} onChange={(value) => onChangeUserStringInfo('address', value)} />
                                    <InformationLineEditString title={'헬스장명'} value={userStringInfo.usergym} onChange={(value) => onChangeUserStringInfo('gym', value)} />
                                </>
                            )
                        ) : (
                            role === 'trainer' ? (
                                <>
                                    <InformationLineString title={'닉네임'} value={trainerStringInfo.trainernickname} />
                                    <InformationLineString title={'이름'} value={trainerStringInfo.trainername} />
                                    <InformationLineNumber title={'나이'} value={trainerNumberInfo.trainerage} />
                                    <InformationLineNumber title={'몸무게'} value={trainerNumberInfo.trainerweight} />
                                    <InformationLineNumber title={'키'} value={trainerNumberInfo.trainerheight} />
                                    <InformationLineNumber title={'근육량'} value={trainerNumberInfo.trainermuscle} />
                                    <InformationLineNumber title={'체지방량'} value={trainerNumberInfo.trainerfat} />
                                    <InformationLineString title={'주소'} value={trainerStringInfo.traineraddress} />
                                    <InformationLineString title={'헬스장명'} value={trainerStringInfo.trainergym} />
                                </>
                            ) : (
                                <>
                                    <InformationLineString title={'닉네임'} value={userStringInfo.usernickname} />
                                    <InformationLineString title={'이름'} value={userStringInfo.username} />
                                    <InformationLineNumber title={'나이'} value={userNumberInfo.userage} />
                                    <InformationLineNumber title={'몸무게'} value={userNumberInfo.userweight} />
                                    <InformationLineNumber title={'키'} value={userNumberInfo.userheight} />
                                    <InformationLineNumber title={'근육량'} value={userNumberInfo.usermuscle} />
                                    <InformationLineNumber title={'체지방량'} value={userNumberInfo.userfat} />
                                    <InformationLineString title={'주소'} value={userStringInfo.useraddress} />
                                    <InformationLineString title={'헬스장명'} value={userStringInfo.usergym} />
                                </>
                            ))}
                    </>
                </div>
            )}
            {activeTab === 'post' && (
                <div className='my-information-box-information'>
                    <input type="button" value="보러가기" onClick={CommunityDetail} className='my-information-button' />
                    <div className='my-information-seen-grid'>
                        <SeenPostGridProps posts={dummyPosts} />
                    </div>
                </div>
            )}
            {activeTab === 'photo' && (
                <div className='my-information-box-information'>
                    { // 버튼 고민//
                    /* <input type="button"
                         value="수정하기"
                         onClick={handleEditToggle}
                        className='my-information-button' /> */}
                    <SeenFeed role={role} showBackground={false} />
                </div>
            )}
        </div >
    );
};

export default InformationMiniBox;
