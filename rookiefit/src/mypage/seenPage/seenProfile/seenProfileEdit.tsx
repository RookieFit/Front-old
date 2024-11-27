import { useNavigate } from 'react-router-dom';
import './seenProfile.css';
import logo from '../assets/Larry.png'

interface Props {
  smallvalueReview: number;
  smallvalueClass: number;
}
const dummyData = {
  name: "나불끈",
  message: "근육이든 사람이든 확실히 조저드립니다~~"
};
const SeenProfile = ({ smallvalueReview, smallvalueClass }: Props) => {
  const navigate = useNavigate();
  const seenProfileEdit = () => {
    navigate('/seenProfileEdit')
  };
  const communityList = () => {
    navigate('/communityList')
  }

  return (
    <div className='seen-profile-left-back'>
      <img className='seen-profile-image' src={logo}></img>
      <div className='seen-profile-nickname'>{dummyData.name}</div>
      <div className='seen-profile-small-box'>
        후기
        <input type='text' className='seen-profile-small-review-text-box' value={smallvalueReview} />개
        <input type='button' value='보러가기' onClick={communityList} className='seen-profile-small-review-button' />
        |
        운영 글래스
        <input type='text' className='seen-profile-small-class-text-box' value={smallvalueClass} />개
        <input type='button' value='보러가기' onClick={communityList} className='seen-profile-small-class-button' />
      </div>
      <input type='text' className='seen-profile-message-textarea' value={dummyData.message} disabled />
      <input type="button" value="채팅하기" onClick={seenProfileEdit} className='seen-profile-button' />
    </div>
  )
};

export default SeenProfile;