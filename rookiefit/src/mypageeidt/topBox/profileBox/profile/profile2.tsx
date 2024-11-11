import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './profile2.css';

const Profile2 = () => {
const navigate = useNavigate();
const myPage = () => {
  navigate('/myPage')
};

const [isprofiletextareaclicked,setIsProfileTextAreaClicked] = useState(false);

  return (
    <div className='profile-main'>
      <div className='profile-image2'>  
        <img src='./layout/asses/images/Person.png2'></img>
      </div>
      <div className='profile-nickname2'>닉네임자리</div>
      <div className='profile-message2'>
        <input type='text'
               className='profile-message-textarea2'
               onFocus={() => setIsProfileTextAreaClicked(true)}
               onBlur={() => setIsProfileTextAreaClicked(false)}
               placeholder={isprofiletextareaclicked === true ? "" : "input"}>

        </input>
      </div>
      <div className='profile-edit2' onClick={myPage}>
        <input type="button" value="수정하기" className='profile-button2'/>
      </div>
    </div>
  )
};

export default Profile2;