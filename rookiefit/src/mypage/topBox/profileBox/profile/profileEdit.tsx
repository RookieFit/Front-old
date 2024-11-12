import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import logo from '../../../assets/user.png' 

const ProfileEdit = () => {
const navigate = useNavigate();
const myPage = () => {
  navigate('/myPage')
};

const [isprofiletextareaclicked,setIsProfileTextAreaClicked] = useState(false);

  return (
    <div className='profile-main'>
      <div className='profile-imageedit'>  
        <img className='profileimage' src={logo} ></img>
      </div>
      <div className='profile-nickname'>닉네임자리</div>
      <div className='profile-message'>
        <input type='text'
               className='profile-message-textarea'
               onFocus={() => setIsProfileTextAreaClicked(true)}
               onBlur={() => setIsProfileTextAreaClicked(false)}
               placeholder={isprofiletextareaclicked === true ? "" : "input"}>
        </input>
      </div>
      <div className='profile-edit' onClick={myPage}>
        <input type="button" value="완료하기" className='profile-button'/>
      </div>
    </div>
  )
};

export default ProfileEdit;