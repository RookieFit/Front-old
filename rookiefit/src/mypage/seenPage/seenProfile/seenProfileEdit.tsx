import { useNavigate } from 'react-router-dom';
import './../../myPage/topBox/profileBox/myProfile/myProfile.css';
import logo from '../assets/Larry.png'

interface Props {
  userId: string; // 사용자 ID 추가
  name: string;
  message: string;
}

const SeenProfileEdit = ({ userId, name, message }: Props) => {
  const navigate = useNavigate();
  const marketChatPage = () => {
    navigate(`/market/chat/${userId}`);
  };

  return (
    <div className='profile-left-back'>
      <img className='my-profile-edit-image' src={logo}></img>
      <div className='my-profile-nickname'>{name}</div>
      <input type='text' className='my-profile-message-textarea' value={message} />
      <input type="button" value="채팅하기" onClick={marketChatPage} className='my-profile-button'/>
    </div>
  )
};

export default SeenProfileEdit;