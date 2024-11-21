import { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import './myProfile.css';
import logo from '../../../../assets/user.png'

const MyProfileEdit = () => {

  const dummyData = {
    nickname: " 뚱인데요?",
    message: "나 짱짱쎔"
  };

  const navigate = useNavigate();
  const myPage = () => {
    navigate('/myPage')
  };
  const [isProfileTextareaClicked, setIsProfileTextareaClicked] = useState(false);
  return (
    <div className='profile-left-back'>
      <img className='my-profile-edit-image' src={logo}></img>
      <div className='my-profile-nickname'>{dummyData.nickname}</div>
      <input type='text'
        maxLength={19}
        className='my-profile-message-textarea'
        onFocus={() => setIsProfileTextareaClicked(true)}
        onBlur={() => setIsProfileTextareaClicked(false)}
        placeholder={isProfileTextareaClicked === true ? "" : dummyData.message}>
      </input>
      <input type="button" value="완료하기" onClick={myPage} className='my-profile-button' />
    </div>
  )
};

export default MyProfileEdit;