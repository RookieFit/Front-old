import { useProfileContext } from '../userProfileContext';
import { useEffect, useState } from 'react';
import './leftProfilePage.css';

const LeftProfilePage = ({ isToggled, setIsToggled }: { isToggled: boolean, setIsToggled: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { profileData, updateProfileField, saveDataToServer, setProfileImage, profileImageUrl } = useProfileContext();
    const [localProfileImageUrl, setLocalProfileImageUrl] = useState<string>('');  // 초기값을 null로 설정
    const [isLoading, setIsLoading] = useState<boolean>(true);  // 로딩 상태를 true로 초기화

    // 프로필 이미지 URL을 업데이트
    useEffect(() => {
        // 서버에서 이미지를 가져오는 동안 로딩 상태를 true로 유지
        if (profileImageUrl) {
            setLocalProfileImageUrl(profileImageUrl);  // 서버에서 받은 이미지 URL을 설정
        } else {
            setLocalProfileImageUrl('');  // 서버에서 이미지가 없다면 null로 설정
        }
    }, [profileImageUrl]);  // profileImageUrl이 변경될 때마다 실행

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
            setIsLoading(true); // 새로운 이미지 로딩 시작
        }
    };

    const handleUserMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateProfileField('userMessage', e.target.value);
    };

    const handleSubmit = async () => {
        try {
            await saveDataToServer(); // Context에 정의된 함수 호출
            setIsToggled(!isToggled)
            alert('데이터가 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('Data submission error:', error);
            alert('데이터 저장 중 문제가 발생했습니다.');
        }
    };

    return (
        <div className="left-back">
            <div className="profile-wrapper">
                <img
                    className="image-style"
                    src={localProfileImageUrl}
                    alt="profile"
                    onClick={handleImageClick}
                />
                <input
                    type="file"
                    id="image-input"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
                <text className="user-nickname-text">{profileData.userNickname || "닉네임없는 헬린이"}</text>
                <input
                    className="user-message-input"
                    value={profileData.userMessage}
                    onChange={handleUserMessageChange}
                />
                {isToggled ? (
                    <button
                        className="profile-edit-toggle-button"
                        onClick={() => setIsToggled(!isToggled)}
                    >프로필편집</button>
                ) : <button
                    className="profile-edit-toggle-button"
                    onClick={handleSubmit}
                >프로필 저장</button>}
            </div>
        </div>
    );
};

export default LeftProfilePage;
