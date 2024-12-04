
import { useNavigate } from 'react-router-dom';
import './informationMiniBox.css';
import InformationLine from '../informationLine/informationLine';
import { useState } from 'react';
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

  const [isUserNickName, setIsUserNickName] = useState(information.usernickname);
  const [isUserName, setIsUserName] = useState(information.username);
  const [isUserAge, setIsUserAge] = useState(information.userage);
  const [isUserWeight, setIsUserWeight] = useState(information.userweight);
  const [isUserHeight, setIsUserHeight] = useState(information.userheight);
  const [isUserMuscle, setIsUserMuscle] = useState(information.usermuscle);
  const [isUserFat, setIsUserFat] = useState(information.userfat);
  const [isUserAddress, setUserIsAddress] = useState(information.useraddress);
  const [isUserGym, setUserIsGym] = useState(information.usergym);
  const onChangeUserName = (value) => setIsUserName(value);
  const onChangeUserNickName = (value) => setIsUserNickName(value);
  const onChangeUserAge = (value) => setIsUserAge(value);
  const onChangeUserWeight = (value) => setIsUserWeight(value);
  const onChangeUserHeight = (value) => setIsUserHeight(value);
  const onChangeUserMuscle = (value) => setIsUserMuscle(value);
  const onChangeUserFat = (value) => setIsUserFat(value);
  const onChangeUserAddress = (value) => setUserIsAddress(value);
  const onChangeUserGym = (value) => setUserIsGym(value);

  const [isTrainerNickName, setIsTrainerNickName] = useState(information.trainernickname);
  const [isTrainerName, setIsTrainerName] = useState(information.trainername);
  const [isTrainerAge, setIsTrainerAge] = useState(information.trainerage);
  const [isTrainerWeight, setIsTrainerWeight] = useState(information.trainerweight);
  const [isTrainerHeight, setIsTrainerHeight] = useState(information.trainerheight);
  const [isTrainerMuscle, setIsTrainerMuscle] = useState(information.trainermuscle);
  const [isTrainerFat, setIsTrainerFat] = useState(information.trainerfat);
  const [isTrainerAddress, setIsTrainerAddress] = useState(information.traineraddress);
  const [isTrainerGym, setIsTrainerGym] = useState(information.trainergym);
  const onChangeTrainerName = (value) => setIsTrainerName(value);
  const onChangeTrainerNickName = (value) => setIsTrainerNickName(value);
  const onChangeTrainerAge = (value) => setIsTrainerAge(value);
  const onChangTrainerWeight = (value) => setIsTrainerWeight(value);
  const onChangeTrainerHeight = (value) => setIsTrainerHeight(value);
  const onChangeTrainerMuscle = (value) => setIsTrainerMuscle(value);
  const onChangeTrainerFat = (value) => setIsTrainerFat(value);
  const onChangeTrainerAddress = (value) => setIsTrainerAddress(value);
  const onChangeTrainerGym = (value) => setIsTrainerGym(value);

  const handleEditToggle = () => {
    if (isEditing) {
      onInformationUpdate({
        usernickname: isUserNickName,
        username: isUserName,
        userage: isUserAge,
        userweight: isUserWeight,
        userheight: isUserHeight,
        usermuscle: isUserMuscle,
        userfat: isUserFat,
        useraddress: isUserAddress,
        usergym: isUserGym,
        trainernickname: isTrainerNickName,
        trainername: isTrainerName,
        trainerage: isTrainerAge,
        trainerweight: isTrainerWeight,
        trainerheight: isTrainerHeight,
        trainermuscle: isTrainerMuscle,
        trainerfat: isTrainerFat,
        traineraddress: isTrainerAddress,
        trainergym: isTrainerGym,
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
        <div className='my-information-one'>
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
                    <InformationLineEdit title={'닉네임'} value={isTrainerNickName} onChange={onChangeTrainerNickName} />
                    <InformationLineEdit title={'이름'} value={isTrainerName} onChange={onChangeTrainerName} />
                    <InformationLineEdit title={'나이'} value={isTrainerAge} onChange={onChangeTrainerAge} />
                    <InformationLineEdit title={'몸무게'} value={isTrainerWeight} onChange={onChangTrainerWeight} />
                    <InformationLineEdit title={'키'} value={isTrainerHeight} onChange={onChangeTrainerHeight} />
                    <InformationLineEdit title={'근육량'} value={isTrainerMuscle} onChange={onChangeTrainerMuscle} />
                    <InformationLineEdit title={'체지방량'} value={isTrainerFat} onChange={onChangeTrainerFat} />
                    <InformationLineEdit title={'주소'} value={isTrainerAddress} onChange={onChangeTrainerAddress} />
                    <InformationLineEdit title={'헬스장명'} value={isTrainerGym} onChange={onChangeTrainerGym} />
                  </>
                ) : (
                  <>
                    <InformationLineEdit title={'닉네임'} value={isUserNickName} onChange={onChangeUserNickName} />
                    <InformationLineEdit title={'이름'} value={isUserName} onChange={onChangeUserName} />
                    <InformationLineEdit title={'나이'} value={isUserAge} onChange={onChangeUserAge} />
                    <InformationLineEdit title={'몸무게'} value={isUserWeight} onChange={onChangeUserWeight} />
                    <InformationLineEdit title={'키'} value={isUserHeight} onChange={onChangeUserHeight} />
                    <InformationLineEdit title={'근육량'} value={isUserMuscle} onChange={onChangeUserMuscle} />
                    <InformationLineEdit title={'체지방량'} value={isUserFat} onChange={onChangeUserFat} />
                    <InformationLineEdit title={'주소'} value={isUserAddress} onChange={onChangeUserAddress} />
                    <InformationLineEdit title={'헬스장명'} value={isUserGym} onChange={onChangeUserGym} />
                  </>
                )
              ) : (
                role === 'trainer' ? (
                  <>
                    <InformationLine title={'닉네임'} value={isTrainerNickName} />
                    <InformationLine title={'이름'} value={isTrainerName} />
                    <InformationLine title={'나이'} value={isTrainerAge} />
                    <InformationLine title={'몸무게'} value={isTrainerWeight} />
                    <InformationLine title={'키'} value={isTrainerHeight} />
                    <InformationLine title={'근육량'} value={isTrainerMuscle} />
                    <InformationLine title={'체지방량'} value={isTrainerFat} />
                    <InformationLine title={'주소'} value={isTrainerAddress} />
                    <InformationLine title={'헬스장명'} value={isTrainerGym} />
                  </>
                ) : (
                  <>
                    <InformationLine title={'닉네임'} value={isUserNickName} />
                    <InformationLine title={'이름'} value={isUserName} />
                    <InformationLine title={'나이'} value={isUserAge} />
                    <InformationLine title={'몸무게'} value={isUserWeight} />
                    <InformationLine title={'키'} value={isUserHeight} />
                    <InformationLine title={'근육량'} value={isUserMuscle} />
                    <InformationLine title={'체지방량'} value={isUserFat} />
                    <InformationLine title={'주소'} value={isUserAddress} />
                    <InformationLine title={'헬스장명'} value={isUserGym} />
                  </>
                )
              )}
            </>
          </div>
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
    </div>
  );
};

export default InformationMiniBox;
