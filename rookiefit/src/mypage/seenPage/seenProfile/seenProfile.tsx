import { useNavigate } from 'react-router-dom';
import './seenProfile.css';
import logo from '../../assets/user.png'

const dummyData = {
  nickname: " 뚱인데요?",
  message: "나 짱짱쎔"
};


const SeenProfile = () => {
  const navigate = useNavigate();
  const myPageEdit = () => {
    navigate('/myPageEdit')
  };
  const main = () => {
    navigate('/main')
  };

  return (
    <div className='seen-profile-left-back'>
      <input type='button' value="로그아웃" onClick={main} className='seen-profile-logout' />
      <img className='seen-profile-image' src={logo}></img>
      <div className='seen-profile-nickname'>{dummyData.nickname}</div>
      <input type='text' className='seen-profile-message-textarea' value={dummyData.message} disabled />
      <input type="button" value="수정하기" onClick={myPageEdit} className='seen-profile-button' />
    </div>
  )
};

export default SeenProfile;