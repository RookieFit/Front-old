import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';
import logo from '../../../assets/user.png'

const Profile = () => {

  const navigate = useNavigate();
  const myPageEdit = () => {
    navigate('/myPageEdit')
  };
  const main = () => {
    navigate('/main')
  };
  return (
    <div className='left-back'>
      <input type='button' value="로그아웃" onClick={main} className='profilelogout' />
      <img className='profileimage' src={logo}></img>

      <div className='profile-nickname'>닉네임자리</div>
      <textarea className='profile-message-textarea' disabled>"메시지를 입력하세요"
      </textarea>
      <div className='profile-edit' onClick={myPageEdit}>
        <input type="button" value="수정하기" className='profile-button' />
      </div>
    </div>
  )
};

export default Profile;