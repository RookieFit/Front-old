import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import logo from '../../../assets/user.png' 

const Profile = () => {

const navigate = useNavigate();
const myPageEdit = () => {
  navigate('/myPageEdit')
};
  return (
    <div className='profile-main'>
      <div className='profile-image'>
        <img className='profileimage' src= {logo}></img>
      </div>
      <div className='profile-nickname'>닉네임자리</div>
      <div className='profile-message'>
        <textarea className='profile-message-textarea' disabled>"메시지를 입력하세요"
        </textarea>
      </div>
      <div className='profile-edit' onClick={myPageEdit}>
        <input type="button" value="수정하기" className='profile-button'/>
      </div>
    </div>
  )
};

export default Profile;