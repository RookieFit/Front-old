import "./leftProfilePage.css";

interface Props {
    isToggled: boolean;
    setIsToggled: (value: boolean) => void;
    userNickname: string;
    userMessage: string;
    profileImage: File | null;
    setProfileImage: (file: File | null) => void;
    setUserMessage: (value: string) => void;
}

const LeftProfilePage = ({ isToggled, setIsToggled, userNickname, setProfileImage, profileImage, userMessage, setUserMessage }: Props) => {

    const handleImageClick = () => {
        document.getElementById("image-input")?.click(); // 이미지 파일 선택 창을 엽니다.
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfileImage(e.target.files[0]); // 선택된 파일을 부모 컴포넌트로 전달
        }
    };

    const handleUserMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserMessage(e.target.value); // 입력 값을 상태에 반영
    };


    const profileImageUrl = profileImage ? URL.createObjectURL(profileImage) : "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLdkVXWKBsCJHpGEqezY1LWXFvjoIe7krawJZCIhVdx-NYF3LVqkP8DlQZnpIm-yj7mqkSU9VaAbkG9ldCYFx5ig";


    return (
        <div className="left-back">
            <div className="profile-wrapper">
                <img
                    className="image-style"
                    src={profileImageUrl}
                    alt="profile"
                    onClick={handleImageClick} // 이미지 클릭 시 파일 선택 창 열기
                />
                <input
                    type="file"
                    id="image-input"
                    style={{ display: "none" }} // 파일 입력 창은 숨깁니다.
                    onChange={handleImageChange}
                />
                <text className="user-nickname-text">{userNickname}</text>
                <input
                    className="user-message-input"
                    value={userMessage}
                    onChange={handleUserMessageChange}
                    readOnly={isToggled}
                />
                {isToggled && <button
                    className="profile-edit-toggle-button"
                    onClick={() => setIsToggled(!isToggled)}
                >
                    프로필편집
                </button>}
            </div>
        </div>
    );
};

export default LeftProfilePage;
