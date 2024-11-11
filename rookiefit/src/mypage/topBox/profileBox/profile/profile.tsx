import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {
  return (
    <div className='profile-main'>
      <div className='profile-image'>
        <img src='./layout/asses/images/Person.png'></img>
      </div>
      <div className='profile-nickname'>닉네임자리</div>
      <div className='profile-message'><textarea className='profile-message-textarea' disabled>"메시지를 입력하세요"</textarea></div>
      <div className='profile-edit'>  <input type="button" value="수정하기" className='myinfo-button'/>
         
           
        </div>
    </div>
  )
};

export default Profile;