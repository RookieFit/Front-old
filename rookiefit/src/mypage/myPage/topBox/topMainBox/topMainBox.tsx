import React, { useState } from 'react';
import './topMainBox.css';
import MyProfile from '../profileBox/myProfile/myProfile';
import InformationMiniBox from '../informationBox/informationMiniBox/informationMiniBox';
import SeenProfile from '../../../seenPage/seenProfile/seenProfile';

interface TopMainBoxProps {
  role: string;
}

const TopMainBox = ({ role }: TopMainBoxProps) => {
  const [informationUserNumber, setInformationUserNumber] = useState({
    userage: 25,
    userweight: 70,
    userheight: 175,
    usermuscle: 30,
    userfat: 15,
  });

  const [informationUserString, setInformationUserString] = useState({
    usernickname: '뚱인데요??',
    username: '불가사리',
    useraddress: '스폰지밥 옆집',
    usergym: '없는데용',
  });

  const [informationTrainerNumber, setInformationTrainerNumber] = useState({
    trainerage: 35,
    trainerweight: 80,
    trainerheight: 180,
    trainermuscle: 40,
    trainerfat: 10,
  });

  const [informationTrainerString, setInformationTrainerString] = useState({
    trainernickname: '불끈트레이너',
    trainername: '김불끈',
    traineraddress: '비키니시티',
    trainergym: '집게리아 헬스장',
  });

  const onInformationUpdate = (newInformation: Partial<{
    informationUserNumber: typeof informationUserNumber;
    informationUserString: typeof informationUserString;
    informationTrainerNumber: typeof informationTrainerNumber;
    informationTrainerString: typeof informationTrainerString;
  }>) => {
    if (newInformation.informationUserNumber) {
      setInformationUserNumber(prev => ({ ...prev, ...newInformation.informationUserNumber }));
    }
    if (newInformation.informationUserString) {
      setInformationUserString(prev => ({ ...prev, ...newInformation.informationUserString }));
    }
    if (newInformation.informationTrainerNumber) {
      setInformationTrainerNumber(prev => ({ ...prev, ...newInformation.informationTrainerNumber }));
    }
    if (newInformation.informationTrainerString) {
      setInformationTrainerString(prev => ({ ...prev, ...newInformation.informationTrainerString }));
    }
  };

  return (
    <div className="top-mainbox-left-right-page">
      {role === 'trainer' ? (
        <>
          <SeenProfile name={informationTrainerString.trainername} message={'몸도 사람도 털어드립 어쩌고 저쩌고'} />
          <InformationMiniBox
            role={role}
            informationUserNumber={informationUserNumber}
            informationUserString={informationUserString}
            informationTrainerNumber={informationTrainerNumber}
            informationTrainerString={informationTrainerString}
            onInformationUpdate={onInformationUpdate}
          />
        </>
      ) : (
        <>
          <MyProfile name={informationUserString.usernickname} message={'누구쎼용?'} />
          <InformationMiniBox
            role={role}
            informationUserNumber={informationUserNumber}
            informationUserString={informationUserString}
            informationTrainerNumber={informationTrainerNumber}
            informationTrainerString={informationTrainerString}
            onInformationUpdate={onInformationUpdate}
          />
        </>
      )}
    </div>
  );
};

export default TopMainBox;