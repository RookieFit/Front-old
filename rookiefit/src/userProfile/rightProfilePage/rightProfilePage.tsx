import './rightProfilePage.css';

import { InputProfileComponent } from '../component/inputProfileComponent';
import { useProfileContext } from '../userProfileContext';

const RightProfilePage = ({ isToggled, setIsToggled }: { isToggled: boolean, setIsToggled: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { profileData, userBodyData, updateProfileField, saveDataToServer } = useProfileContext();

    const handleInputChange = (key: keyof typeof profileData | keyof typeof userBodyData, value: string) => {
        const parsedValue = isNaN(Number(value)) ? value : Number(value);
        updateProfileField(key, parsedValue);
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

    const fields = [
        { key: "userNickname", title: "닉네임" },
        { key: "userName", title: "이름" },
        { key: "userAge", title: "나이" },
        { key: "userWeight", title: "체중" },
        { key: "userHeight", title: "신장" },
        { key: "userMuscleMass", title: "골격근량" },
        { key: "userFatMass", title: "체지방량" },
        { key: "userAddress", title: "주소" },
        { key: "gymName", title: "헬스장이름" },
    ];

    return (
        <div className="right-back">
            <div className="body-data-wrapper">
                {fields.map(({ key, title }) => (
                    <InputProfileComponent
                        key={key}
                        title={title}
                        placeholder="입력해라"
                        value={
                            profileData[key as keyof typeof profileData] ||
                            userBodyData[key as keyof typeof userBodyData] || ''
                        }
                        onChange={(e) => handleInputChange(key as keyof typeof profileData | keyof typeof userBodyData, e.target.value)}
                        type={["userAge", "userWeight", "userHeight", "userMuscleMass", "userFatMass"].includes(key) ? "number" : "text"}
                        disabled={isToggled}
                    />
                ))}
            </div>
            {!isToggled && (
                <button className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            )}
        </div>
    );
};

export default RightProfilePage;
