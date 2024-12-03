import { useNavigate } from 'react-router-dom';
import './informationMiniBox.css';
import InformationLine from '../informationLine/informationLine';
import { useState } from 'react';
import SeenFeed from '../../../../seenPage/seenFeed/seenFeed';
import SeenFeedGridBox from '../../../../seenPage/seenFeed/seenFeedcommunityComponents/seenFeedGridBox';

interface Props {
  role: string;
  value: boolean;
}

const InformationMiniBox = ({ role, value }: Props) => {
  const navigate = useNavigate();
  const myPageEdit = () => {
    navigate('/myPageEdit')
  };
  const CommunityDetail = () => {
    navigate('/community/detail/:id')
  }
  const [activeTab, setActiveTab] = useState<'info' | 'post' | 'photo'>('info');

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
            <input type="button" value="수정하기" onClick={myPageEdit} className='my-information-button' />
            {role === 'trainer' ? (
              <>
                <InformationLine title={'닉네임'} value={''} />
                <InformationLine title={'이름'} value={'나불끈'} />
                <InformationLine title={'나이'} value={'??'} />
                <InformationLine title={'몸무게'} value={'??'} />
                <InformationLine title={'키'} value={'??'} />
                <InformationLine title={'근육량'} value={'0'} />
                <InformationLine title={'체지방량'} value={'0'} />
                <InformationLine title={'주소'} value={'헬창클럽'} />
                <InformationLine title={'헬스장명'} value={'루키핏'} />
              </>
            ) : (
              <>
                <InformationLine title={'닉네임'} value={'뚱인데요?'} />
                <InformationLine title={'이름'} value={'불가사리'} />
                <InformationLine title={'나이'} value={'??'} />
                <InformationLine title={'몸무게'} value={'??'} />
                <InformationLine title={'키'} value={'??'} />
                <InformationLine title={'근육량'} value={'0'} />
                <InformationLine title={'체지방량'} value={'0'} />
                <InformationLine title={'주소'} value={'비키니시티'} />
                <InformationLine title={'헬스장명'} value={'없는데용?'} />
              </>
            )}
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
          <input type="button" value="수정하기" onClick={myPageEdit} className='my-information-button' />
          <SeenFeed role={role} showBackground={value} />
        </div>
      )}
    </div>
  );
};

export default InformationMiniBox;