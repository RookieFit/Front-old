import React from 'react'
import { Link } from 'react-router-dom';

const myPage_Edit = [
  {button: "프로필 편집", path: "/myPage_Edit"}
];


export default function porfilePofile() {
  return (
    <div className='profile_main'>
      <div className='profile_image'>
        <img src='./layout/asses/images/Person.png'></img>
      </div>
      <div className='profile_nickname'>닉네임자리</div>
      <div className='profile_message'><textarea disabled>"메시지를 입력하세요"</textarea></div>
      <div className='profile_edit'>
          <nav className='button'>
            {myPage_Edit.map((item, index) => (
              <Link key={index} to={item.path} className='button'>
                {item.button}
              </Link>
            ))}
          </nav>
              <Link to='/myPage_Edit' className='button' />
        </div>
    </div>
  )
};
