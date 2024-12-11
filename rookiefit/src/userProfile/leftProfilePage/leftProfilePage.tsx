import './leftProfilePage.css';

import { useProfileContext } from '../userProfileContext';
import { useEffect, useState } from 'react';

const LeftProfilePage = ({ isToggled, setIsToggled }: { isToggled: boolean, setIsToggled: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { profileData, updateProfileField, profileImage, setProfileImage, profileImageUrl } = useProfileContext();
    const [localprofileImageUrl, setLocalProfileImageUrl] = useState<string>(profileImageUrl);

    // 프로필 이미지 URL을 업데이트
    useEffect(() => {
        if (profileImageUrl) {
            setLocalProfileImageUrl(profileImageUrl);
        } else {
            setLocalProfileImageUrl('https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLdkVXWKBsCJHpGEqezY1LWXFvjoIe7krawJZCIhVdx-NYF3LVqkP8DlQZnpIm-yj7mqkSU9VaAbkG9ldCYFx5ig');
        }
    }, [profileImageUrl]);

    const handleImageClick = () => {
        document.getElementById("image-input")?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file); // Context에 이미지 파일 저장
            updateProfileField('userProfileImageFile', file.name); // 파일 이름 업데이트

            const previewUrl = URL.createObjectURL(file);
            setLocalProfileImageUrl(previewUrl);
        }
    };

    const handleUserMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateProfileField('userMessage', e.target.value);
    };

    return (
        <div className="left-back">
            <div className="profile-wrapper">
                <img
                    className="image-style"
                    src={localprofileImageUrl}
                    alt="profile"
                    onClick={handleImageClick}
                />
                <input
                    type="file"
                    id="image-input"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
                <text className="user-nickname-text">{profileData.userNickname}</text>
                <input
                    className="user-message-input"
                    value={profileData.userMessage}
                    onChange={handleUserMessageChange}
                />
                {isToggled && (
                    <button
                        className="profile-edit-toggle-button"
                        onClick={() => setIsToggled(!isToggled)}
                    >프로필편집</button>
                )}
            </div>
        </div>
    );
};

export default LeftProfilePage;
