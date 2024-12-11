import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import currentDateToString from './component/currentDateToString';
import { GetUserBodyDataRequest, InputUserBodyDataRequest } from '../apis/api/userBodyDataApi';
import { axiosInstance } from '../apis/api';
import { GetUserProfileRequest } from '../apis/api/profileApi';
import defaultImage from "./component/Larry.png"
import GetUserBodyDataResponseDto from '../apis/response/userBodyData/getUserBodyDataResponse.dto';

interface ProfileData {
    userProfileImageFile: string;
    userNickname: string;
    userName: string;
    userAddress: string;
    userMessage: string;
    gymName: string;
}

interface UserBodyData {
    userAge: number;
    userWeight: number;
    userHeight: number;
    userMuscleMass: number;
    userFatMass: number;
    inbodydate: string;
}

interface ProfileContextProps {
    profileImageUrl: string;
    profileData: ProfileData;
    setProfileData: (data: ProfileData) => void;
    userBodyData: UserBodyData;
    setUserBodyData: (data: UserBodyData) => void;
    profileImage: File | null;
    setProfileImage: (image: File | null) => void;
    updateProfileField: (key: keyof ProfileData | keyof UserBodyData, value: string | number) => void;
    saveDataToServer: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const useProfileContext = (): ProfileContextProps => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfileContext must be used within a ProfileProvider");
    }
    return context;
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const currentDate = currentDateToString();

    const [profileImageUrl, setProfileImageUrl] = useState<string>('');

    const [profileData, setProfileData] = useState<ProfileData>({
        userProfileImageFile: '',
        userNickname: '닉네임 없는 헬린이',
        userName: '',
        userAddress: '',
        userMessage: '',
        gymName: '',
    });

    const [userBodyData, setUserBodyData] = useState<UserBodyData>({
        userAge: 0,
        userWeight: 0,
        userHeight: 0,
        userMuscleMass: 0,
        userFatMass: 0,
        inbodydate: currentDate,
    });

    const [profileImage, setProfileImage] = useState<File | null>(null);

    const updateProfileField = (key: keyof ProfileData | keyof UserBodyData, value: string | number) => {
        if (key in profileData) {
            setProfileData(prev => ({ ...prev, [key]: value }));
        } else if (key in userBodyData) {
            setUserBodyData(prev => ({ ...prev, [key]: value }));
        }
    };

    const saveDataToServer = async () => {
        try {
            const profileFormData = new FormData();

            // profileData를 FormData에 추가
            Object.entries(profileData).forEach(([key, value]) => {
                profileFormData.append(key, value);
            });

            // 프로필 이미지가 있으면 추가
            if (profileImage) {
                profileFormData.append("userProfileImageFile", profileImage);
            } else if (!profileImage && profileImageUrl) {
            } else {
                // 기본 이미지를 File로 처리
                const response = await fetch(defaultImage);
                const blob = await response.blob();
                const defaultFile = new File([blob], "default-profile.jpg", { type: "image/jpeg" });
                profileFormData.append("userProfileImageFile", defaultFile);  // 기본 이미지 파일을 추가
            }

            // 서버에 데이터 전송
            const profileResponse = await axiosInstance.post('/user/input-userprofile', profileFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const bodyResponse = await InputUserBodyDataRequest(userBodyData);

            if (profileResponse && bodyResponse) {
                console.log("Data saved successfully");
            } else {
                console.error("Data save failed");
            }
        } catch (error) {
            console.error("Error saving data to server:", error);
        }
    };

    const fetchDataFromServer = async () => {
        try {
            const profileResponse = await GetUserProfileRequest();
            if (profileResponse) {
                const { userProfileImageUri, ...rest } = profileResponse;
                setProfileImageUrl(userProfileImageUri);
                setProfileData(rest); // profileData 초기화
            }
            const bodyResponse = await GetUserBodyDataRequest();

            const bodyData = bodyResponse as GetUserBodyDataResponseDto[];

            console.log("bodyResponse:  " + bodyData)

            // 최신 데이터를 찾기 위해 inbodyDate를 기준으로 정렬
            const sortedData = bodyData.sort((a, b) => {
                return parseInt(b.inbodyDate) - parseInt(a.inbodyDate);  // 숫자로 비교하여 최신 데이터 찾기
            });
            // 최신 데이터만 상태로 설정

            // 최신 데이터에서 inbodyDate를 inbodydate로 변경하고 상태에 저장
            const { code, message, inbodyDate, ...rest } = sortedData[0];

            // inbodyDate를 inbodydate로 변경하여 상태 업데이트
            setUserBodyData({ ...rest, inbodydate: inbodyDate });

            console.log("Latest body data: ", sortedData[0]);
            console.log("Data fetched successfully");
        } catch (error) {
            console.error("Error fetching data from server:", error);
        }
    };

    useEffect(() => {
        fetchDataFromServer();
    }, []);

    return (
        <ProfileContext.Provider
            value={{
                profileImageUrl,
                profileData,
                setProfileData,
                userBodyData,
                setUserBodyData,
                profileImage,
                setProfileImage,
                updateProfileField,
                saveDataToServer,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
