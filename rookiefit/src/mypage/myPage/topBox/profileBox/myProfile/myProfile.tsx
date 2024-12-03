import { useNavigate } from 'react-router-dom';
import './myProfile.css';
import logo from '../../../../assets/user.png'

interface Props {
  userId: string; // 사용자 ID 추가
  name: string;
  message: string;
}

const MyProfile = ({ userId, name, message }: Props) => {
  const navigate = useNavigate();
  const myPageEdit = () => {
    navigate(`/myPageEdit`)
  };
  const main = () => {
    navigate('/main')
  };

  return (
    <div className='profile-left-back'>
      <input type='button' value="로그아웃" onClick={main} className='my-profile-logout' />
      <img className='my-profile-image' src={logo}></img>
      <div className='my-profile-edit-nickname'>{name}</div>
      <input type='text' className='my-profile-message-textarea' value={message} disabled />
      <input type="button" value="수정하기" onClick={myPageEdit} className='my-profile-button' />
    </div>
  )
};

export default MyProfile;