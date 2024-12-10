import UserProfileChart from "./userProfileChart/graphBox";
import "./userProfile.css";
import RightProfilePage from "./rightProfilePage/rightProfilePage";
import LeftProfilePage from "./leftProfilePage/leftProfilePage";
import { useState } from "react";

const UserProfile = () => {
    const [isToggled, setIsToggled] = useState<boolean>(true);
    const [userNickname, setUserNickname] = useState<string>('닉네임');
    const [profileImage, setProfileImage] = useState<File | null>(null); // 프로필 이미지 상태 추가
    const [userMessage, setUserMessage] = useState<string>('상태메시지');

    return (
        <div className="body">
            <div className="left-right-page">
                <LeftProfilePage
                    isToggled={isToggled}
                    setIsToggled={setIsToggled}
                    userNickname={userNickname}
                    profileImage={profileImage}
                    userMessage={userMessage}
                    setUserMessage={setUserMessage}
                    setProfileImage={setProfileImage} // 이미지를 설정하는 함수 전달
                />
                <RightProfilePage
                    isToggled={isToggled}
                    setUserNickname={setUserNickname}
                    profileImage={profileImage} // 이미지 파일 전달
                    userMessage={userMessage}
                    setIsToggled={setIsToggled}
                />
            </div>
            <UserProfileChart />
        </div>
    );
};

export default UserProfile;
