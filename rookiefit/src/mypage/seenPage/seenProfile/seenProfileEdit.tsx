import { useNavigate } from 'react-router-dom';
import './seenProfile.css';
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
    <div className='seen-profile-left-back'>
      <img className='seen-profile-image' src={logo}></img>
      <div className='seen-profile-nickname'>{name}</div>
      <input type='text' className='seen-profile-message-textarea' value={message} />
      <input type="button" value="채팅하기" onClick={marketChatPage} className='seen-profile-button' />
    </div>
  )
};

export default SeenProfileEdit;