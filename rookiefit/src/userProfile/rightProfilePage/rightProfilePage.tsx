import { useState } from "react";
import { InputProfileComponent } from "../component/inputProfileComponent";
import currentDateToString from "../component/currentDateToString";
import { axiosInstance } from "../../apis/api";

interface Props {
    isToggled: boolean;
    userMessage: string;
    setUserNickname: (value: string) => void;
    profileImage: File | null;
    setIsToggled: (value: boolean) => void;
}

const RightProfilePage = ({ isToggled, setUserNickname, profileImage, setIsToggled, userMessage }: Props) => {
    const currentDate = currentDateToString(); // 현재 날짜

    const [profileData, setProfileData] = useState({
        userProfileImageFile: "",
        userNickname: "",
        userName: "",
        userAddress: "",
        userMessage: userMessage,
        gymName: "",
    });

    const [userBodyData, setUserBodyData] = useState({
        userAge: "",
        userWeight: "",
        userHeight: "",
        userMuscleMass: "",
        userFatMass: "",
        inbodydate: currentDate, // 현재 날짜
    });

    const handleInputChange = (key: string, value: string) => {
        if (Object.keys(profileData).includes(key)) {
            setProfileData((prev) => ({ ...prev, [key]: value }));
            if (key === "nickname") setUserNickname(value); // nickname을 부모 컴포넌트에 전달
        } else if (Object.keys(userBodyData).includes(key)) {
            setUserBodyData((prev) => ({ ...prev, [key]: value }));
        }
    };

    const handleSubmit = async () => {
        try {
            const profileFormData = new FormData();

            // profileData와 userBodyData를 FormData에 추가
            Object.entries(profileData).forEach(([key, value]) => {
                profileFormData.append(key, value);
            });

            // 프로필 이미지가 있으면 추가
            if (profileImage) {
                profileFormData.append("userProfileImageFile", profileImage);
            } else {
                alert("profileImage")
            }

            const profileResponse = await axiosInstance.post('/user/input-userprofile', profileFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/formdata'
                    },
                }
            );
            const bodyResponse = await axiosInstance.post('/user/input-userbodydata', userBodyData);

            if (profileResponse) {
                console.log("프로필 데이터 전송 성공!");
            } else {
                console.error("프로필 데이터 전송 실패:", profileFormData);
            }

            if (bodyResponse) {
                console.log("신체 데이터 전송 성공!");
            } else {
                console.error("신체 데이터 전송 실패:", bodyResponse);
            }

            setIsToggled(true); // 편집 종료 상태로 변경

        } catch (error) {
            console.error("데이터 전송 중 에러 발생:", error);
        }
    };

    const fields = [
        { key: "userNickname", title: "닉네임" },
        { key: "userName", title: "이름" },
        { key: "userAge", title: "나이" },
        { key: "userWeight", title: "몸무게" },
        { key: "userHeight", title: "키" },
        { key: "userMuscleMass", title: "근육량" },
        { key: "userFatMass", title: "체지방량" },
        { key: "userAddress", title: "주소" },
        { key: "gymName", title: "헬스장" },
    ];

    return (
        <div className="right-back">
            <div className="body-data-wrapper">
                {fields.map(({ key, title }) => (
                    <InputProfileComponent
                        key={key}
                        title={title}
                        placeholder="입력 해라"
                        value={profileData[key as keyof typeof profileData] || userBodyData[key as keyof typeof userBodyData] || ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        disabled={isToggled}
                    />
                ))}
            </div>
            <div>
                {!isToggled && <button onClick={handleSubmit}>프로필 데이터 전송</button>}
            </div>
        </div>
    );
};

export default RightProfilePage;
