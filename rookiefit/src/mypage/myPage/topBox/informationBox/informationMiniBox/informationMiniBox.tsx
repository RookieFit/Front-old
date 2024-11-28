import { useNavigate } from 'react-router-dom';
import './informationMiniBox.css';
import InformationLine from '../informationLine/informationLine';
import { useState } from 'react';
import SeenFeed from '../../../../seenPage/seenFeed/seenFeed';
import SeenFeedGridBox from '../../../../seenPage/seenFeed/seenFeedcommunityComponents/seenFeedGridBox';

const InformationMiniBox = () => {

    const navigate = useNavigate();
    const myPageEdit = () => {
        navigate('/myPageEdit')
    };
    const communityList = () => {
        navigate('/communityList')
    };
    const seenFeedEdit = () => {
        navigate('/seenFeedEdit')
    };
    // 초기값을 'info'로 설정하여 처음에 내 정보가 보이도록 합니다.
    const [activeTab] = useState<'info' | 'post' | 'photo' | null>('info');

    const handleToggleTab = (tab: 'info' | 'post' | 'photo' | null) => {
        // 이미 선택된 탭을 클릭하면 다시 닫히도록 설정
    };

    // 배경색을 동적으로 적용하기 위한 스타일 설정
    const getInputBackgroundColor = (tab: 'info' | 'post' | 'photo' | null) => {
        if (activeTab === tab) {
            return { backgroundColor: '#D9D9D9' }; // 선택된 탭의 배경색
        }
        return { backgroundColor: 'transparent' }; // 선택되지 않은 탭은 투명 배경
    };

    return (
        <div className="information-right-back">
            <div className='my-information-three-class'>
                <button
                    onClick={() => handleToggleTab('info')}
                    className='my-information-info'
                    style={getInputBackgroundColor('info')}>
                    내 정보
                </button>
                <button
                    onClick={() => handleToggleTab('post')}
                    className='my-information-post'
                    style={getInputBackgroundColor('post')}>
                    작성글
                </button>
                <button
                    onClick={() => handleToggleTab('photo')}
                    className='my-information-photo'
                    style={getInputBackgroundColor('photo')}>
                    사진첩
                </button>
            </div>
            {/* 조건부 렌더링 */}
            {activeTab === null && (
                <div className='my-information-push'> 위 글자를 눌러주세요!!!</div>
            )}
            {activeTab === 'info' && (
                <div className='my-information-one'>
                    <div className='my-information-box-information'>
                        <input
                            type="button"
                            value="수정하기"
                            onClick={myPageEdit}
                            className='my-information-button'
                        />
                        <InformationLine title={'닉네임'} value={'뚱인데요?'} />
                        <InformationLine title={'이름'} value={'불가사리'} />
                        <InformationLine title={'나이'} value={'??'} />
                        <InformationLine title={'몸무게'} value={'??'} />
                        <InformationLine title={'키'} value={'??'} />
                        <InformationLine title={'근육량'} value={'0'} />
                        <InformationLine title={'체지방량'} value={'0'} />
                        <InformationLine title={'주소'} value={'비키니시티'} />
                        <InformationLine title={'헬스장명'} value={'없는데용?'} />
                    </div>
                </div>
            )}
            {activeTab === 'post' && (
                <div>
                    <div className='my-information-box-information'>
                        <input
                            type="button"
                            value="보러가기"
                            onClick={communityList}
                            className='my-information-button'
                        />
                        <div className='my-information-seen-grid'>
                            <SeenFeedGridBox />
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'photo' && (
                <div>
                    <div className='my-information-box-information'>
                        <input
                            type="button"
                            value="수정하기"
                            onClick={seenFeedEdit}
                            className='my-information-button'
                        />
                        <SeenFeed />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InformationMiniBox;
