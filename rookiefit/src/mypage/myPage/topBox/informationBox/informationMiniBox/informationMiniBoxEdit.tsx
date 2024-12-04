import { useNavigate } from 'react-router-dom';
import './informationMiniBox.css';
import { useState } from 'react';
import InformationLineEdit from '../informationLine/informationLineEdit';
import InformationLine from '../informationLine/informationLine';
import SeenFeed from '../../../../seenPage/seenFeed/seenFeed';

interface Props {
  role: string;
  value: boolean;
  information: {
    nickname: string;
    name: string;
    age: string;
    weight: string;
    height: string;
    muscle: string;
    fat: string;
    address: string;
    gym: string;
  };
  onInformationUpdate: (newInformation: Partial<Props['information']>) => void;
}

const InformationMiniBoxEdit = ({ role, value, information, onInformationUpdate }: Props) => {
  const [isNickName, setNickName] = useState();

  const navigate = useNavigate();
  const myPage = () => {
    navigate('/myPage')
  };
  const [activeTab, setActiveTab] = useState<'info' | 'photo'>('info');

  const handleToggleTab = (tab: 'info' | 'photo') => {
    setActiveTab(tab);
  };

  const getInputBackgroundColor = (tab: 'info' | 'photo') => {
    return activeTab === tab ? { backgroundColor: '#D9D9D9' } : { backgroundColor: 'transparent' };
  };

  const handleInfoChange = (key: string, value: string) => {
    onInformationUpdate({ [key]: value });
  };

  return (
    <div className="information-right-back">
      <div className='my-information-three-class'>
        <button onClick={() => handleToggleTab('info')} className='my-information-info' style={getInputBackgroundColor('info')}>내 정보</button>
        <button disabled className='my-information-post' style={{ backgroundColor: 'transparent' }}>작성글</button>
        <button onClick={() => handleToggleTab('photo')} className='my-information-photo' style={getInputBackgroundColor('photo')}>사진첩</button>
      </div>
      {activeTab === 'info' && (
        <div className='my-information-one'>
          <div className='my-information-box-information'>
            <input type="button" value="수정완료" onClick={myPage} className='my-information-button' />
            {role === 'trainer' ? (
              <>
                <InformationLine title={'닉네임'} value={''} />
                <InformationLine title={'이름'} value={'나불끈'} />
                <InformationLine title={'나이'} value={'??'} />
                <InformationLineEdit title={'몸무게'} value={'??'} />
                <InformationLineEdit title={'키'} value={'??'} />
                <InformationLineEdit title={'근육량'} value={'0'} />
                <InformationLineEdit title={'체지방량'} value={'0'} />
                <InformationLineEdit title={'주소'} value={'헬창클럽'} />
                <InformationLineEdit title={'헬스장명'} value={'루키핏'} />
              </>
            ) : (
              <>
                <InformationLineEdit title={'닉네임'} value={information.nickname} />
                <InformationLine title={'이름'} value={information.name} />
                <InformationLine title={'나이'} value={information.age} />
                <InformationLineEdit title={'몸무게'} value={information.height} />
                <InformationLineEdit title={'키'} value={information.height} />
                <InformationLineEdit title={'근육량'} value={information.muscle} />
                <InformationLineEdit title={'체지방량'} value={information.fat} />
                <InformationLineEdit title={'주소'} value={information.address} />
                <InformationLineEdit title={'헬스장명'} value={information.gym} />
              </>
            )}
          </div>
        </div>
      )}
      {activeTab === 'photo' && (
        <div className='my-information-box-information'>
          <input type="button" value="수정완료" onClick={myPage} className='my-information-button' />
          <SeenFeed role={role} showBackground={value} />
        </div>
      )}
    </div>
  );
};

export default InformationMiniBoxEdit;