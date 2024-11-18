import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import logo from '../../../assets/user.png'

const ProfileEdit = () => {
  const navigate = useNavigate();
  const myPage = () => {
    navigate('/myPage')
  };
  const [isProfileTextareaClicked, setIsProfileTextareaClicked] = useState(false);
  return (
    <div className='profile-left-back'>
      <img className='profile-edit-image' src={logo} ></img>
      <div className='profile-nickname'>닉네임자리</div>
      <div className='profile-message'>
        <input type='text'
          maxLength={19}
          className='profile-message-textarea'
          onFocus={() => setIsProfileTextareaClicked(true)}
          onBlur={() => setIsProfileTextareaClicked(false)}
          placeholder={isProfileTextareaClicked === true ? "" : "input"}>
        </input>
      </div>
      <div className='profile-edit' onClick={myPage}>
        <input type="button" value="완료하기" className='profile-button' />
      </div>
    </div>
  )
};

export default ProfileEdit;