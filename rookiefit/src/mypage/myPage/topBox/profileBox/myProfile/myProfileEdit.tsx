import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './myProfile.css';
import logo from '../../../../assets/user.png'

interface Props {
    userId: string; // 사용자 ID 추가
    name: string;
    message: string;
}

const MyProfileEdit = ({ userId, name, message }: Props) => {

    const navigate = useNavigate();
    const myPage = () => {
        navigate(`/myPage`)
    };
    const [isProfileTextareaClicked, setIsProfileTextareaClicked] = useState(false);
    return (
        <div className='profile-left-back'>
            <img className='my-profile-edit-image' src={logo}></img>
            <div className='my-profile-nickname'>{name}</div>
            <input type='text'
                maxLength={19}
                spellCheck="false"
                className='my-profile-message-textarea'
                onFocus={() => setIsProfileTextareaClicked(true)}
                onBlur={() => setIsProfileTextareaClicked(false)}
                placeholder={isProfileTextareaClicked === true ? "" : message}>
            </input>
            <input type="button" value="완료하기" onClick={myPage} className='my-profile-button' />
        </div>
    )
};

export default MyProfileEdit;