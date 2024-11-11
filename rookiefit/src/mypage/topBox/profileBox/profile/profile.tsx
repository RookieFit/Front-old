import React from 'react'
import { Link } from 'react-router-dom';
import './profile.css';

const myPage_Edit = [
  {profilePofile_button: "프로필 편집", path: "/myPage_Edit"}
];
const profile = () => {
  return (
    <div className='profile_main'>
      <div className='profile_image'>
        <img src='./layout/asses/images/Person.png'></img>
      </div>
      <div className='profile_nickname'>닉네임자리</div>
      <div className='profile_message'><textarea disabled>"메시지를 입력하세요"</textarea></div>
      <div className='profile_edit'>
          <nav className='profilePofile_button'>
            {myPage_Edit.map((item, index) => (
              <Link key={index} to={item.path} className='profilePofile_button'>
                {item.profilePofile_button}
              </Link>
            ))}
          </nav>
              <Link to='/myPage_Edit' className='profilePofile_button' />
        </div>
    </div>
  )
};

export default profile;