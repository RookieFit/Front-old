import React, { useState, useEffect } from 'react';
import './topMainBox.css';
import MyProfile from '../profileBox/myProfile/myProfile';
import InformationMiniBox from '../informationBox/informationMiniBox/informationMiniBox';
import SeenProfile from '../../../seenPage/seenProfile/seenProfile';

const TopMainBox = ({ role }) => {
  const [information, setInformation] = useState({
    usernickname: '뚱인데요??',
    username: '불가사리',
    userage: '??',
    userweight: '100',
    userheight: '100',
    usermuscle: '00',
    userfat: '100',
    useraddress: '스폰지밥 옆집',
    usergym: '없는데용',
    trainernickname: 'x',
    trainername: '김불끈',
    trainerage: '100',
    trainerweight: '100',
    trainerheight: '100',
    trainermuscle: '0',
    trainerfat: '100',
    traineraddress: '??',
    trainergym: '??'
  });

  const onInformationUpdate = (newInformation) => {
    setInformation(prev => ({ ...prev, ...newInformation })); 
  };

  return (
    <div className="top-mainbox-left-right-page">
      {role === 'trainer' ? (
        <>
          <SeenProfile 
            name={information.trainername} 
            message={'몸도 사람도 털어드립 어쩌고 저쩌고'} 
          />
          <InformationMiniBox 
            role={role}
            onInformationUpdate={onInformationUpdate}
            information={information}
          />
        </>
      ) : (
        <>
          <MyProfile 
            name={information.usernickname} 
            message={'누구쎼용?'} 
          />
          <InformationMiniBox 
            role={role}
            onInformationUpdate={onInformationUpdate}
            information={information}
          />
        </>
      )}
    </div>
  );
};

export default TopMainBox;