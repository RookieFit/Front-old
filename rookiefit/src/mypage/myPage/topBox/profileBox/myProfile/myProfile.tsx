import { useNavigate } from 'react-router-dom';
import './myProfile.css';
import logo from '../../../../assets/user.png'

const dummyData = {
  nickname: " 뚱인데요?",
  message: "나 짱짱쎔"
};


const MyProfile = () => {
  const navigate = useNavigate();
  const myPageEdit = () => {
    navigate('/myPageEdit')
  };
  const main = () => {
    navigate('/main')
  };

  return (
    <div className='profile-left-back'>
      <input type='button' value="로그아웃" onClick={main} className='my-profile-logout' />
      <img className='my-profile-image' src={logo}></img>
      <div className='my-profile-nickname'>{dummyData.nickname}</div>
      <input type='text' className='my-profile-message-textarea' value={dummyData.message} disabled />
      <input type="button" value="수정하기" onClick={myPageEdit} className='my-profile-button' />
    </div>
  )
};

export default MyProfile;